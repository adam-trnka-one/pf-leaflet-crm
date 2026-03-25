

## Plan: Fix delayed username display in workspace settings form

### Problem

`useWorkspaceForm.tsx` initializes its local state with hardcoded empty/default values:

```typescript
const [localWorkspaceData, setLocalWorkspaceData] = useState({
  workspaceCode: '',
  username: '',
  email: '',
  firstName: 'John',
  ...
});
```

Then a `useEffect` syncs from the context — but that runs *after* the first render, causing a visible delay where fields appear empty.

### Fix

**`src/hooks/useWorkspaceForm.tsx`** — Initialize `localWorkspaceData` directly from `workspaceData` instead of hardcoded defaults:

```typescript
const [localWorkspaceData, setLocalWorkspaceData] = useState({
  workspaceCode: workspaceData.workspaceCode,
  username: workspaceData.username,
  email: workspaceData.email,
  firstName: workspaceData.firstName,
  lastName: workspaceData.lastName,
  role: workspaceData.role,
  customProperties: workspaceData.customProperties,
  selectedWorkspace: workspaceData.selectedWorkspace || 'jess',
  customUrl: workspaceData.customUrl || '',
  languageCode: workspaceData.languageCode || 'en'
});
```

The `useEffect` remains for subsequent context updates (e.g., resets), but the initial render now has the correct data immediately.

### Files modified
- `src/hooks/useWorkspaceForm.tsx` — one change to `useState` initializer

