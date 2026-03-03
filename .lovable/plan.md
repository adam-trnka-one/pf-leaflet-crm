

## Performance Issues Found

### Problem 1: Duplicate `useProductFruits` instances
`Layout` (line 295) calls `useProductFruits()` directly, and `LayoutContent` (line 28) calls `useWorkspaceForm()` which internally also calls `useProductFruits()`. This creates **two separate hook instances**, each with its own `useEffect` watching `location.pathname`. Both can trigger `initializeFromStorage()` -- the refs (`hasInitialized`) are separate per instance, so the guard doesn't work across them. This means PF can get initialized twice on first dashboard load.

**Fix**: Remove `useProductFruits()` from `Layout` component (line 295). The instance inside `useWorkspaceForm` (used by `LayoutContent`) is sufficient.

### Problem 2: Aggressive PF status polling
`Layout.tsx` lines 120-127 run a `setInterval` every 2 seconds checking `window.productFruits?.services`. Each call to `setIsPFActive` triggers a state update and potential re-render of the entire layout tree, even when the value hasn't changed.

**Fix**: Only call `setIsPFActive` when the value actually changes (compare before setting). Also increase interval to 5 seconds since this is just a status badge.

### Problem 3: Version string forces re-renders
Line 183: `Version 1.0.{Date.now().toString().slice(-6)}` generates a new string on every render, though this is cosmetic and low-impact.

### File changes

**`src/components/Layout.tsx`**:
1. Remove `useProductFruits()` call from `Layout` component (line 295) and its import if unused
2. Fix PF status interval: compare value before calling `setIsPFActive`, increase to 5s

