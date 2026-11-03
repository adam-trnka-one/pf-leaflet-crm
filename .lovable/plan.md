# Reset running tool when switching Selected Workspace

## Behaviour
- When the user picks a different option in Settings → Workspace → Selected Workspace (including switching between DEV PR environments), the currently loaded ProductFruits or Usertour is removed from the page immediately, with no confirmation.
- Form fields (user details, custom properties, token) stay unchanged; the new workspace starts only when the user clicks Save / Initiate.
- Picking the same option again does nothing.
- A short info toast: "Previous workspace stopped. Save to start the new one."

## Technical details
- In `useWorkspaceForm.tsx`, extract the teardown from `handleDisableProductFruits` into a silent `teardownActiveTool()` (call `$productFruits` destroy if available per the existing destroy sequence, remove PF and Usertour scripts, clear `$productFruits`, `usertour`, `USERTOURJS_QUEUE`, reset the init hook state). `handleDisableProductFruits` reuses it plus its own toast.
- Expose `teardownActiveTool` and pass it to `WorkspaceBasicFields`; call it in `handleWorkspaceChange` (and the PR sub-selector change) when the value differs from the current one.
- Persisted workspace in context is not modified until Save, so refresh behaviour is unchanged.
