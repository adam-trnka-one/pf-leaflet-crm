## Plan: Fix PR-specific Script URLs

### Problem
In `src/hooks/useProductFruits.tsx` (line 57-58), all PR environments (PR1-PR5) use the same hardcoded URL `https://my-pr.ohio.pf.dev/static/script.js`. Only PR1 should use `my-pr`, while PR2-PR5 need their own hostnames.

### Fix

**`src/hooks/useProductFruits.tsx`** — Update the `getScriptUrl` function:

```typescript
// Before
if (selectedWorkspace?.startsWith('pr')) {
  return `https://my-pr.ohio.pf.dev/static/script.js`;
}

// After
if (selectedWorkspace?.startsWith('pr')) {
  const prHost = selectedWorkspace === 'pr1' ? 'my-pr' : `my-${selectedWorkspace}`;
  return `https://${prHost}.ohio.pf.dev/static/script.js`;
}
```

This produces:
- PR1 → `https://my-pr.ohio.pf.dev/static/script.js`
- PR2 → `https://my-pr2.ohio.pf.dev/static/script.js`
- PR3 → `https://my-pr3.ohio.pf.dev/static/script.js`
- PR4 → `https://my-pr4.ohio.pf.dev/static/script.js`
- PR5 → `https://my-pr5.ohio.pf.dev/static/script.js`

### Files modified
- `src/hooks/useProductFruits.tsx`
