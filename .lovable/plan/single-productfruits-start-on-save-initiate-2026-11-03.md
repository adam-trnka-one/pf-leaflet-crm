# Single ProductFruits start on Save & Initiate

## Problem
After "Save & Initiate PF" succeeds, the app forces a full page reload to `/dashboard`. The reload discards the tool that was just started and the dashboard auto-start runs again, so the workspace starts twice.

## Change
1. **No reload.** Save & Initiate no longer does `window.location.href = '/dashboard'`. After a successful start it moves to the dashboard within the app (`navigate('/dashboard')`), so the running tool stays as it is.
2. **One start path.** All starts (Save, Initiate, Save & Initiate, dashboard auto-start) go through `initializeProductFruits`. That function marks the session as started (`hasInitialized = true`, records the workspace code, clears `autoInitSuppressed`) after a manual start. The dashboard auto-start then sees it is already running and does nothing.
3. **Clean shutdown kept.** `initializeProductFruits` still runs `teardownActiveTool` / `cleanupProductFruits` (destroy, wait, remove scripts/widgets, clear globals) before starting, so switching workspaces without a reload stays clean. Usertour keeps reusing its loaded SDK.
4. **Failure path.** If the start fails, it stays on Settings with the error toast (no navigation), same as now.

## Verification (Playwright)
- Count ProductFruits script injections and `productFruits.init` calls with a window hook.
- Settings → Leaflet CRM → Save & Initiate: exactly 1 start, lands on `/dashboard`, badge "PF: Active", no page reload (window marker survives).
- Navigate Dashboard → Accounts → Dashboard: still 1 start.
- Switch to Custom → back to Leaflet CRM → Save & Initiate: old widget removed, exactly 1 new start.
- Usertour with token → Save & Initiate: 1 start, badge "Usertour: Active".
- Plain Save (Save button alone): 1 start.

## Technical details
- `src/components/settings/workspace/WorkspaceActions.tsx`: replace the reload with `useNavigate()`.
- `src/hooks/useProductFruits.tsx`: set the module-level `hasInitialized` / `initializedWorkspaceCode` / `autoInitSuppressed=false` inside `initializeProductFruits` on success, not only in `initializeFromStorage`.
- Update the ProductFruits memory note: init happens once per session; manual starts don't reload.
