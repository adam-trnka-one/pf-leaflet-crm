

## Plan: Add ProductFruits status indicator and reset-to-default switch in sidebar footer

### What will be added

1. **ProductFruits active/disabled indicator** in the sidebar footer, next to the existing version text. A small colored dot (green when active, gray when disabled) with a label like "PF: Active" or "PF: Inactive". The status is determined by checking whether `window.productFruits` and `window.$productFruits` globals exist.

2. **"Reset to Default" button** that appears only when the workspace is set to a non-default value (i.e., not "jess"). Clicking it calls `handleResetToDefaults` from `useWorkspaceForm` and then re-initializes ProductFruits with default settings.

### Changes

**`src/components/Layout.tsx`** (SidebarFooter section, lines 164-168):
- Import `Badge` from `@/components/ui/badge`
- Import `RotateCcw` icon
- Add a state variable to track PF active status, updated via an interval or checked on render by looking at `window.$productFruits` existence
- Access `workspaceData` from `useWorkspace` (already imported) to check if `selectedWorkspace !== 'jess'`
- In the `SidebarFooter`, add:
  - A row showing version + PF status badge (green "Active" / gray "Inactive")
  - When `selectedWorkspace` is not "jess", show a small "Reset to Default" button that calls `handleResetToDefaults` followed by `handleInitiateProductFruits` to switch back to the default workspace and re-initialize

### Technical details

- PF status check: Use a simple state + `setInterval` (every 2 seconds) that checks `!!(window as any).$productFruits && Array.isArray((window as any).$productFruits) === false` or checks if the ProductFruits scripts exist in the DOM. Alternatively, check `!!(window as any).productFruits?.services` as a reliable indicator that PF is fully loaded.
- The "Reset to Default" action will: call `handleResetToDefaults()` (sets workspace data back to defaults with `selectedWorkspace: 'jess'`), then call `handleInitiateProductFruits()` to re-init PF with the default workspace code.
- Layout of footer: version on left, PF badge on right, reset button below when applicable. Compact design that fits the sidebar width.

### File changes
- `src/components/Layout.tsx` — modify SidebarFooter section

