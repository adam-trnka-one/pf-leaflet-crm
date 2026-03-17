

## Plan: Fix ProductFruits initialization race condition after login

### Problem

The `useProductFruits` hook uses a **module-level** `hasInitialized` flag that never resets after sign-out. When a user logs out and logs back in, the flag is still `true`, so the auto-initialization useEffect skips PF setup entirely. Additionally, there's a timing issue where the hook's useEffect may fire before the workspace data from login has been persisted to localStorage.

### Root Cause

1. **`hasInitialized` persists across login/logout cycles** -- `handleSignOut` in Layout cleans up PF DOM/globals but never resets the module-level `hasInitialized` flag
2. **Race condition on login** -- Login calls `navigate("/dashboard")` which mounts Layout, triggering `useProductFruits`. But the useEffect runs synchronously with the same render, and workspace data may not be fully committed to localStorage yet
3. **useEffect dependency** -- Only watches `location.pathname`, so navigating from `/login` to `/dashboard` fires once, but if it fails silently (e.g., missing data), there's no retry

### Solution

**`src/hooks/useProductFruits.tsx`**:
- Export a `resetInitializationState()` function that sets `hasInitialized = false` and `initializedWorkspaceCode = ''`
- Add a small retry mechanism: if `initializeFromStorage` finds no data on first attempt, retry after 500ms (covers the localStorage write delay from login)

**`src/components/Layout.tsx`**:
- Import and call `resetInitializationState()` inside `handleSignOut`, before navigating to `/login`

**`src/pages/Login.tsx`**:
- Import and call `resetInitializationState()` on mount (useEffect) to ensure clean state when arriving at login page

### Files Changed

| File | Change |
|------|--------|
| `src/hooks/useProductFruits.tsx` | Export `resetInitializationState()`, add retry logic in auto-init |
| `src/components/Layout.tsx` | Call `resetInitializationState()` in `handleSignOut` |
| `src/pages/Login.tsx` | Call `resetInitializationState()` on mount |

