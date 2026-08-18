# Help button that triggers the Elvin widget

Add a Help icon button to the top-right header area (next to the search box, alongside the language selector, newsfeed and sign-out buttons) that opens the Elvin widget through the Product Fruits Elvin Custom Trigger API.

## Behaviour

- New ghost icon button with a question-mark/help-circle icon, same size and styling as the existing newsfeed and sign-out buttons.
- Placement: immediately after the search input and before the language selector, so it sits in the top-right cluster.
- Clicking it toggles the Elvin widget open/closed via the Product Fruits JavaScript API.
- Tooltip/title text is translated ("Help") in all 7 languages, matching how the newsfeed and sign-out titles work.
- If Product Fruits is not initialized on the page, the click does nothing and logs a warning instead of throwing.
- Visible on desktop and mobile header (the header cluster is already responsive).

## Technical details

- Edit `src/components/Layout.tsx`:
  - Import `HelpCircle` from `lucide-react` (already imported for the Cases nav item, reuse it or use `CircleHelp`/`LifeBuoy`).
  - Add handler:
    ```ts
    const handleHelpClick = () => {
      const pf = (window as any).$productFruits;
      if (!pf) { console.warn('Product Fruits not initialized'); return; }
      pf.push(['do', 'toggle-elvin-widget', {}]);
    };
    ```
    Passing an empty options object toggles the current open/closed state per the Elvin Custom Trigger API.
  - Render the button with `variant="ghost" size="icon"`, `className="h-8 w-8"`, `title={t('header.help')}` and `data-testid="help-button"`.
- Add `header.help` key to `src/i18n/locales/{en,cs,de,es,fr,pt,ar}/navigation.json` ("Help", "Pomoc", "Hilfe", "Ayuda", "Aide", "Ajuda", "مساعدة").

No changes to Product Fruits initialization; the default Elvin launcher stays as-is.
