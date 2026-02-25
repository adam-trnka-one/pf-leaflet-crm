

## Plan: Add proper destroy before re-initialization in Save & Initiate flow

**Problem:** When the user clicks "Save & Initiate", the `initializeProductFruits` function in `useProductFruits.tsx` only removes script tags and injects new ones. It does **not** call `window.productFruits.services.destroy()` before re-initializing, unlike the logout flow which now properly destroys first. This can leave stale ProductFruits state in memory.

**What changes:**

Update `initializeProductFruits` in `src/hooks/useProductFruits.tsx` to call `window.productFruits.services.destroy()` as the first step before removing scripts and re-initializing. This mirrors the destroy logic already used in the logout handler.

**Technical detail:**

In `src/hooks/useProductFruits.tsx`, inside `initializeProductFruits()` (around line 69, before removing existing scripts), add:

```typescript
// Destroy existing ProductFruits instance via official SDK before re-init
if ((window as any).productFruits?.services?.destroy) {
  (window as any).productFruits.services.destroy();
}
// Also clear global objects
if ((window as any).$productFruits) {
  delete (window as any).$productFruits;
}
if ((window as any).productFruits) {
  delete (window as any).productFruits;
}
```

This ensures a clean slate before the new scripts and init call are added. One file changed: `src/hooks/useProductFruits.tsx`.

