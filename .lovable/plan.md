

## Plan: Fix ProductFruits destroy/re-init to work without page reload

### Root cause

The current destroy flow has issues:

1. After calling `productFruits.services.destroy()`, the code immediately deletes `window.$productFruits` and `window.productFruits`, then reassigns them. But the destroy is async internally -- the SDK may still be referencing these globals when they get wiped.
2. The SDK script removal only targets specific selectors, but PF may inject additional elements (iframes, stylesheets, event listeners) that persist and conflict with the new instance.
3. The new `$productFruits` array is created with `|| []`, but since we just deleted it, it always becomes `[]` -- this is fine, but the init push happens before the script loads, and if the old script's modules are still cached in memory, conflicts arise.

### Fix in `src/hooks/useProductFruits.tsx`

**Make `initializeProductFruits` async with proper sequencing:**

1. Call `productFruits.services.destroy()` and wait for cleanup (small delay ~200ms)
2. Remove **all** PF-injected DOM elements: scripts, iframes (`[id*="productfruits"]`, `[class*="productfruits"]`), style tags
3. Clean up all PF-related globals more thoroughly (check for `productFruitsIsReady`, `productFruitsUser`, etc.)
4. Only after cleanup is complete, set up fresh globals and inject the new script
5. Wait for the new script's `onload` event before resolving, so callers know PF is ready

**Changes to `initializeProductFruits`:**
- Make it return a `Promise` that resolves when the new script has loaded
- Add a 200ms delay after `destroy()` to let the SDK tear down
- Broaden DOM cleanup: `document.querySelectorAll('[id*="productfruits"], [class*="productfruits"], iframe[src*="productfruits"]')` 
- Use `mainScript.onload` to resolve the promise
- Add `mainScript.onerror` handling

**Changes to callers** (`useWorkspaceForm.tsx`, `Layout.tsx`, `WorkspaceActions.tsx`):
- `await initializeProductFruits()` instead of fire-and-forget, since it now returns a Promise

### File changes
- `src/hooks/useProductFruits.tsx` — make destroy+init async with proper sequencing
- `src/hooks/useWorkspaceForm.tsx` — await the async init
- `src/components/Layout.tsx` — await the async init in reset handler
- `src/components/settings/workspace/WorkspaceActions.tsx` — already awaits, just ensure compatibility

