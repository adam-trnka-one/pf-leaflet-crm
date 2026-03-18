

## Plan: Move toasts to top-right and remove "New user created" toast

### 1. Toast viewport position — `src/components/ui/toast.tsx` (line 17)

Change the `ToastViewport` className from bottom-right to top-right:
- Replace `sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col` with `top-0 right-0 flex-col`
- Update slide animation in `toastVariants` (line 26): change `sm:slide-in-from-bottom-full` to `sm:slide-in-from-top-full`

### 2. Remove "New user created" toast — `src/pages/Login.tsx`

In `handleNewUser`, remove the `toast({ title: "New user created", ... })` call. Keep the rest of the function intact.

### Files

| File | Change |
|------|--------|
| `src/components/ui/toast.tsx` | Viewport position → top-right, slide animation from top |
| `src/pages/Login.tsx` | Remove toast in `handleNewUser` |

