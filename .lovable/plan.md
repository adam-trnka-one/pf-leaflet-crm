

## Plan: Speed up username loading and PF initialization

### Problem

Two bottlenecks delay ProductFruits content:

1. **WorkspaceContext loads from localStorage in `useEffect`** (async, post-render) instead of synchronously during `useState` initialization. This means components initially see default data ("john.doe") before the real user data arrives.

2. **`initializeProductFruits` always runs `cleanupProductFruits()`** which has a 300ms `setTimeout` delay — even on the very first initialization when there is nothing to clean up.

### Changes

**1. `src/contexts/WorkspaceContext.tsx` — Load localStorage synchronously in `useState` initializer**

Replace the `useState(defaultWorkspaceData)` + `useEffect` pattern with a lazy initializer function that reads localStorage immediately:

```typescript
const [workspaceData, setWorkspaceData] = useState<WorkspaceData>(() => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return { ...defaultWorkspaceData, ...JSON.parse(savedData) };
    }
  } catch (error) {
    console.error('Error loading workspace data:', error);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultWorkspaceData));
  return defaultWorkspaceData;
});
```

Remove the `useEffect` that currently does the same thing post-mount.

**2. `src/hooks/useProductFruits.tsx` — Skip cleanup on first initialization**

In `initializeProductFruits`, skip the 300ms cleanup delay when PF has never been initialized:

```typescript
// Only clean up if there's an existing PF instance
if (hasInitialized || (window as any).productFruits?.services) {
  await cleanupProductFruits();
} else {
  // Fresh init — just set up globals immediately
  (window as any).$productFruits = [];
  (window as any).productFruits = { scrV: '2' };
}
```

### Impact

- Eliminates the render cycle delay where default data is shown before real data
- Saves 300ms on every fresh login by skipping unnecessary cleanup
- Username is available on the very first render, so PF init can proceed immediately

### Files modified
- `src/contexts/WorkspaceContext.tsx`
- `src/hooks/useProductFruits.tsx`

