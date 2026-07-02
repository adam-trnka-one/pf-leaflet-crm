## Plan: Persist tool selection + Usertour load status/feedback

### Part 1 — Persistence (already mostly there; verify)
The selected tool is `selectedWorkspace` in `WorkspaceContext`, which already saves to `localStorage` (`leaflet-workspace-data`) on every update. Choosing "Usertour" and clicking Save persists it, and `useProductFruits` reads it back on refresh via `initializeFromStorage`.

No code change needed for persistence itself — it already works. Just confirm by adding `selectedWorkspace` to the reset-to-defaults preservation so a user's tool choice isn't silently wiped when they hit "Reset". (Currently `handleResetToDefaults` forces `selectedWorkspace: 'jess'`.) 

Change: keep current behavior for Reset (it's a real reset), but add a short toast note. Actually — leave Reset alone; that's its point. **No change to persistence code.**

### Part 2 — Usertour load status + graceful failure

**`src/hooks/useProductFruits.tsx` — `initializeUsertour`**
- After appending the stub + calling `usertour.init(token)` and `usertour.identify(...)`, actually wait for the real Usertour script to finish loading before resolving.
- Detect load by polling `window.usertour._stubbed === undefined` (the real SDK replaces the stub) at 100 ms intervals, capped at **10 s**.
- On success: resolve `true`, log the loaded URL.
- On timeout or `onerror` from the injected `<script src="https://js.usertour.io/...">` tag (observe via a `MutationObserver` on `<head>` for the tag added by the stub, then attach `onerror`): resolve `false` with a console error including the URL.
- Return `false` cleanly so callers can toast a failure.

**`src/hooks/useWorkspaceForm.tsx` — toast messaging**
- In `handleInitiateProductFruits`, when `selectedWorkspace === 'usertour'`, use Usertour-specific toast copy:
  - Success: "Usertour initialized — script loaded and user identified."
  - Failure: "Usertour failed to load — check your network/VPN and try again."
- In `handleSaveWorkspaceData`, same branching for the follow-up toast.

**`src/components/settings/workspace/WorkspaceActions.tsx` — inline status**
- Add a small status line under the primary action button that reflects `isInitiating` state with tool-aware copy:
  - While initiating with Usertour selected: "Loading Usertour script…" with a spinner.
  - While initiating with PF: "Loading ProductFruits script…".
  - Cleared once the promise settles (toast then reports success/failure).
- Change the button label to "Loading Usertour…" / "Loading ProductFruits…" based on `workspaceData.selectedWorkspace` while `isInitiating` is true.
- On failure (success === false), do NOT redirect to `/dashboard` (already the case) and keep the user on Settings so they can read the error toast.

### Files modified
- `src/hooks/useProductFruits.tsx`
- `src/hooks/useWorkspaceForm.tsx`
- `src/components/settings/workspace/WorkspaceActions.tsx`

### Out of scope
- No new persistence layer (localStorage already handles it).
- No changes to PF init behavior beyond message copy.
- No new settings fields — token stays hardcoded.
