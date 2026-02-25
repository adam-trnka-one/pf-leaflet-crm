

## Plan: Redirect logout to /login

**What changes:**
One line change in `src/components/Layout.tsx` — update the `handleSignOut` function to navigate to `"/login"` instead of `"/"`.

**Technical detail:**
In `src/components/Layout.tsx`, line ~101, change `navigate("/")` to `navigate("/login")`.

