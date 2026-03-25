

## Plan: Add App Version Display

### Overview
Create a centralized app version constant and display it in the sidebar footer so all users see the same version number and can reference it in bug reports.

### Changes

**1. Create `src/config/version.ts`**
- Export a single `APP_VERSION` constant (e.g., `"1.0.0"`)
- Single source of truth — update this file when releasing new versions

**2. Update `src/components/Layout.tsx`**
- Import `APP_VERSION` from the config
- Display a version badge in the sidebar footer area (bottom of the sidebar), styled as a subtle text like `v1.0.0`

**3. Update `src/components/settings/WorkspaceTab.tsx`**
- Show the app version in the workspace settings card so users can easily copy it for bug reports

### Files modified
- `src/config/version.ts` (new)
- `src/components/Layout.tsx`
- `src/components/settings/WorkspaceTab.tsx`

