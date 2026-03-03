

## Root Cause

`useProductFruits()` is called in **two separate places**, creating two independent hook instances:

1. **`LayoutContent`** (line 28 of Layout.tsx) via `useWorkspaceForm()` -> `useProductFruits()`
2. **`WorkspaceTab`** (rendered inside Settings page) via `useWorkspaceForm()` -> `useProductFruits()`

Each instance has its **own** `hasInitialized` ref initialized to `false`. When you navigate to Settings and the Workspace tab renders, the second instance's `useEffect` fires, sees `hasInitialized.current === false` and `location.pathname.startsWith('/dashboard')`, and calls `initializeFromStorage()` -- which destroys and re-creates the entire PF session.

## Fix

Change `hasInitialized` and `initializedWorkspaceCode` from **per-instance refs** to **module-level variables** in `useProductFruits.tsx`. This way all hook instances share the same initialization state, and the second instance (from WorkspaceTab) won't trigger a redundant init.

### File: `src/hooks/useProductFruits.tsx`

Move these two lines **outside** the hook function (module scope):

```typescript
// Module-level shared state (not per-instance)
let hasInitialized = false;
let initializedWorkspaceCode = '';

export const useProductFruits = () => {
  const location = useLocation();
  // Remove the useRef lines for hasInitialized and initializedWorkspaceCode
  ...
```

Then update all references from `.current` to direct access:
- `hasInitialized.current` -> `hasInitialized`
- `initializedWorkspaceCode.current` -> `initializedWorkspaceCode`

This is a single-file change with no impact on the public API of the hook.

