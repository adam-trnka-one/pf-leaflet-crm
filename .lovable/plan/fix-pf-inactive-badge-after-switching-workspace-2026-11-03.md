# Fix "PF: Inactive" badge after switching workspace

## What I found
- In a browser test (Leaflet CRM → Custom → Leaflet CRM, then "Save & Initiate PF"), ProductFruits did start again: the script loaded and `productFruits.services` came back. The basic path works.
- The badge in the sidebar does not follow that reliably:
  - It checks only every 5 seconds, so it stays "Inactive" for a while after switching or saving.
  - It only knows about ProductFruits, so with **Usertour** selected it always says "PF: Inactive", even when Usertour is running.
  - It does not show "loading" or "failed". If a DEV/PR script (e.g. `my-pr2.ohio.pf.dev`) can't be reached or the workspace code is empty, it just stays "Inactive" with no explanation.
- The teardown added in the last change runs differently from the app's own clean-up. It deletes the ProductFruits globals right after calling destroy, without waiting, and it leaves the old PF widgets on the page. That can leave the SDK half shut down. I haven't confirmed this for your exact selection. Step 1 below checks it.

## Changes
1. **Shared clean-up.** Switching workspace will use the same clean-up as re-initialization: destroy, wait 300 ms, remove the PF/Usertour scripts and widgets, clear the globals, and reset the "already initialized" flag. The next Save then starts from a clean state.
2. **Live tool status.** The ProductFruits hook keeps one shared status: `idle | loading | active | failed`, plus which tool (`ProductFruits` / `Usertour`). It updates the status right when a script starts loading, loads, fails or is torn down.
3. **Badge reads that status.** The sidebar badge will show:
   - "PF: Active" or "Usertour: Active" (green)
   - "Loading…" (spinner)
   - "Failed" (red)
   - "Inactive" (grey)
   It changes instantly, no 5-second delay. It also hides the old 5-second check.
4. **Clear failure message.** If the script fails or times out, you get a toast with the script address that failed, e.g. "Could not reach my-pr2.ohio.pf.dev".

## Verification
- In the browser, test each switch, check that the badge goes Inactive → Loading → Active after Save, and look at the console:
  - Leaflet CRM ↔ Custom
  - DEV PR1 → PR2
  - Leaflet CRM → Usertour (with a token)
- Check that a script address that can't be reached shows "Failed" and the toast.

## Technical details
- `useProductFruits.tsx`: export `cleanupProductFruits`. Add a module-level status store (a tiny subscribe/emit pattern or `useSyncExternalStore`) that is set inside `initializeProductFruits`, `initializeUsertour` and the cleanup.
- `useWorkspaceForm.tsx`: `teardownActiveTool` calls the exported cleanup, Usertour removal and `resetInitializationState()`.
- `Layout.tsx`: replace the `isPFActive` polling with the status store.
