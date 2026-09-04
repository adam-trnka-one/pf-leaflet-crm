# Make the browser aware of the chosen theme

The theme choice already saves and survives a refresh. What is still missing is telling the *browser itself* which theme is active, so native browser UI (address bar tint on mobile, form controls, scrollbars, native dialogs) matches the app.

## What changes for you

- The browser bar on phones takes the app colour in dark mode instead of staying white.
- Native pieces the app does not paint — scrollbars, date pickers, dropdown lists, text selection — follow the chosen mode.
- Changing the mode in one open tab updates the other open tabs immediately.
- No white flash before the page appears, including on the very first visit with a dark system setting.

## Technical notes

1. `index.html`
   - Add `<meta name="theme-color">` twice, one with `media="(prefers-color-scheme: light)"` and one dark, using the app background values.
   - Extend the existing pre-paint inline script to also set the matching `theme-color` content immediately, so the first paint is right.
2. `src/components/ThemeProvider.tsx`
   - Keep `attribute="class"`, `defaultTheme="system"`, `enableSystem`; leave `enableColorScheme` at its default so `next-themes` keeps `documentElement.style.colorScheme` in sync on every change.
3. New small hook (e.g. `src/hooks/useThemeColorMeta.tsx`), mounted once in `App`
   - Watches `resolvedTheme` and writes the active `theme-color` meta so runtime switches update the browser chrome, not only the initial load.
4. Cross-tab behaviour
   - Verify `next-themes` storage-event sync works with the `leaflet-theme` key; no custom code unless the check shows a gap.
5. Verification
   - Load the app in light, dark and system, confirm `<html>` class, `style.color-scheme` and the active `theme-color` all agree; switch the OS setting while on "System" and confirm it follows without reload.
