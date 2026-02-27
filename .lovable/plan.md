

## Plan: Use full page reload instead of React navigate after PF re-init

The async destroy/init cycle isn't reliably cleaning up PF's internal state. The fix is to use `window.location.href = '/dashboard'` (full reload) with a small delay after initiation, instead of React Router's `navigate()`.

### Changes

**`src/components/settings/workspace/WorkspaceActions.tsx`** (line 78):
- Replace `navigate('/dashboard')` with a 500ms delayed `window.location.href = '/dashboard'`

**`src/components/Layout.tsx`** (lines 199-202, sidebar reset button):
- Replace `await handleInitiateProductFruits(); navigate('/dashboard')` with `await handleInitiateProductFruits()` followed by a 500ms delayed `window.location.href = '/dashboard'`

**`src/components/Layout.tsx`** (language change handler, ~line 56):
- Same pattern if it also re-inits PF — add delay + full reload

