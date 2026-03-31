

## Plan: Handle DEV script load failure gracefully

### Problem
When the PF DEV script fails to load (`ERR_NAME_NOT_RESOLVED` — e.g., VPN not connected), the app still redirects to `/dashboard` after 500ms regardless of success/failure. The user sees a broken state with no clear feedback.

### Changes

**`src/components/settings/workspace/WorkspaceActions.tsx`** — Only redirect on success:
- Check `success` return value from `handleInitiateProductFruits()`
- If `false`, stay on settings page (don't redirect) — the toast from `useWorkspaceForm` already shows the error

```typescript
const success = await handleInitiateProductFruits();
if (success) {
  setTimeout(() => {
    window.location.href = '/dashboard';
  }, 500);
}
```

**`src/hooks/useProductFruits.tsx`** — Add a 10-second timeout for script loading:
- If the script hasn't loaded or errored within 10s, resolve with `false`
- Improves the error message to include the URL that failed

### Files modified
- `src/components/settings/workspace/WorkspaceActions.tsx`
- `src/hooks/useProductFruits.tsx`

