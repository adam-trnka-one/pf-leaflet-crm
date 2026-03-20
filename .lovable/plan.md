

## Plan: Add timestamp to random ID for guaranteed uniqueness

### Change in `src/pages/Login.tsx`

In the `handleNewUser` function, replace the current `randomId` generation with a combination of timestamp and random number:

```typescript
const randomId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
```

This guarantees uniqueness since `Date.now()` is always different across calls (millisecond precision), and the appended random digits handle the near-impossible case of simultaneous clicks.

The email format becomes: `alex.smith1710924561234567@demo.com`

### Files modified
- `src/pages/Login.tsx` — one line change in `handleNewUser`

