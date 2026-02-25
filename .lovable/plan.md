

## Plan: Remove page reload after logout

**Rationale:** Since ProductFruits is now properly destroyed via the official SDK, and all scripts/globals are cleaned up manually, the `window.location.reload()` call is unnecessary. The `navigate("/login")` alone is sufficient to take the user to the login page.

**Change:** In `src/components/Layout.tsx`, remove the `window.location.reload()` line from `handleSignOut`, keeping only `navigate("/login")`.

