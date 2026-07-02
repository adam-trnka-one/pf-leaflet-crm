## Plan: Add Usertour option for @productfruits.com users

### Goal
Give internal users (`@productfruits.com` email) a new workspace choice **"Usertour"** in Settings → Workspace, alongside the existing "DEV" option. When active, initialize Usertour.js instead of ProductFruits using token `cmr37t88s033rl254qni6mf0o`.

### Changes

**1. `src/components/settings/workspace/WorkspaceBasicFields.tsx`**
- Add a new entry to `workspaceOptions`:
  ```ts
  { name: "Usertour", code: "cmr37t88s033rl254qni6mf0o", value: "usertour", isDefault: false }
  ```
- Filter it (like `dev`) so it only appears when `isProductFruitsUser` is true.
- No workspace-code / DEV env / custom URL sub-fields — selecting Usertour just sets `selectedWorkspace: "usertour"` with the token baked in.

**2. `src/hooks/useProductFruits.tsx`** (rename intent kept, file stays)
- In `initializeProductFruits`, branch early: if `dataToUse.selectedWorkspace === 'usertour'`, call a new `initializeUsertour(dataToUse)` helper and return its result instead of running the PF flow.
- `initializeUsertour`:
  - Run `cleanupProductFruits()` first so PF is fully torn down.
  - Also remove any prior Usertour script (`script[data-usertour-init]`) and `window.usertour` global to allow re-init on save.
  - Inject the HTML-snippet loader stub from the Usertour docs into `<head>` (tagged `data-usertour-init`).
  - Call `usertour.init('cmr37t88s033rl254qni6mf0o')` and `usertour.identify(username, { name: "firstName lastName", email, signed_up_at: <ISO now> })` using current workspace data.
  - Resolve `true` immediately (the stub loads async and queues calls — matches the docs pattern); no 10s timeout needed since the stub itself handles load errors with a console warning.

**3. `src/hooks/useWorkspaceForm.tsx`**
- `handleDisableProductFruits`: also remove `script[data-usertour-init]`, the loader `<script src="https://js.usertour.io/...">` tag, and delete `window.usertour` / `window.USERTOURJS_QUEUE` so "Disable" clears both providers.

### Out of scope
- No changes to Changelog, translations, or PF URL logic.
- No new settings tab — Usertour is just another value in the existing Workspace dropdown.
- No custom Usertour token input — the token is hardcoded as requested.

### Files modified
- `src/components/settings/workspace/WorkspaceBasicFields.tsx`
- `src/hooks/useProductFruits.tsx`
- `src/hooks/useWorkspaceForm.tsx`
