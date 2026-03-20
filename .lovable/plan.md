

## Plan: Clean up unused code in Login.tsx

### Changes to `src/pages/Login.tsx`

1. **Remove `handleLastUsedUser` function** (lines 57-67) — no longer used since the button was removed.

2. **Remove unused imports/destructured values** now that `handleLastUsedUser` is gone:
   - Remove `useToast` import (line 6) — `toast` is only used inside `handleLastUsedUser`
   - Remove `const { toast } = useToast();` (line 14)
   - Remove `workspaceData` from the `useWorkspace()` destructure (line 13) — only used in `handleLastUsedUser`

Final line 13 becomes: `const { updateWorkspaceData } = useWorkspace();`

