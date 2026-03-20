

## Plan: Randomize first names for New User login

### Change in `src/pages/Login.tsx`

In the `handleNewUser` function, add an array of first names and pick one randomly instead of always using `"User"`.

```typescript
const firstNames = ["Alex", "Sam", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Quinn", "Avery", "Jamie"];
const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
```

Then use `randomFirst` as the `firstName` value in the `newUser` object.

