

## Plan: Properly deactivate ProductFruits before logout

**Problem:** Currently the sign-out function navigates away and reloads before properly destroying the ProductFruits instance. It only removes script tags and the `$productFruits` array, but doesn't call the official destroy API.

**Change:** Update `handleSignOut` in `src/components/Layout.tsx` to:

1. Call `window.productFruits.services.destroy()` first (the official SDK cleanup method)
2. Remove ProductFruits script tags and global objects
3. Then navigate to `/login` and reload

**Single file change:** `src/components/Layout.tsx` — reorder and enhance the `handleSignOut` function to call the destroy API before cleanup and navigation.

