# Light / System / Dark theme for Leaflet CRM

Add a theme switcher (Light, System, Dark) available across the whole app, and make every screen actually look right in dark mode.

## What the user gets

- A small sun/moon icon button in the top-right header (next to the search box and Help icon) that opens a menu with Light, System, Dark and a check mark on the active choice.
- The same choice also available in Settings → Profile as a labelled three-option control, translated into all 7 languages.
- Choice is remembered between visits; "System" follows the operating system setting live.
- No white flash on page load (the theme is applied before the app paints).
- Mobile bottom navigation, the public marketing pages (home, products, blog, help, login) and all CRM screens follow the theme too.

## Current state (verified)

- `next-themes` is already a dependency but is not used anywhere; there is no theme provider and no `dark` class toggle.
- `src/index.css` already defines a complete `.dark` token set (background, card, popover, primary, muted, border, sidebar, …), and `tailwind.config.ts` already has `darkMode: ["class"]`, so shadcn UI primitives are theme-ready out of the box.
- The problem is hardcoded colour utilities used throughout the app. Files with fixed colours (counts of matching lines): Hero 63, BlogArticle 36, AccountDetail 33, ContactDetail 30, Cases 22, Help 17, Blog 17, Leads 16, Accounts 16, Opportunities 15, Contacts 15, RecentItemsSection 14, WorkspaceBasicFields 13, MetricsCards 12, PermissionsTab 10, plus ~25 further files with 1–9 lines each (dashboard sections, settings tabs, Users, Quotes, Products, Activities, Login, PublicProducts, NotFound, Settings, Layout, BottomNav, App, modals).
- Two CSS-module files also hardcode colours: `src/pages/ProjectDashboard.module.css` (14) and `src/pages/Projects.module.css` (13).
- Charts in `src/components/dashboard/ChartsSection.tsx` use literal hex fills (`#10b981`, `#3b82f6`) and the card is `bg-white`.
- The brand green `#4AB831` is hardcoded in `BottomNav` and via helper classes in `index.css`.

## Approach

1. **Theme infrastructure**
   - New `src/components/ThemeProvider.tsx` wrapping `next-themes` `ThemeProvider` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`), mounted in `src/App.tsx` above `RTLProvider` so it covers public and dashboard routes.
   - Small inline script in `index.html` that reads the stored preference and sets the `dark` class before first paint, and `<meta name="color-scheme" content="light dark">`.
   - New `src/components/ThemeToggle.tsx` — icon button + dropdown menu (Light / System / Dark) using existing shadcn `dropdown-menu`; guarded for hydration with a mounted check.

2. **Design tokens**
   - Extend `src/index.css` with semantic tokens missing today, defined for both `:root` and `.dark`: `--surface` / `--surface-muted` (the current `bg-white` / `bg-slate-50` page and card surfaces), `--brand` (leaflet green) and `--brand-foreground`, plus chart tokens `--chart-1`…`--chart-5` and success/warning/info status pairs used by badges and metric cards.
   - Register those tokens in `tailwind.config.ts` (`surface`, `brand`, `chart`, `success`, `warning`, `info`) so components use `bg-surface`, `text-brand`, etc.
   - Rewrite the `.bg-leaflet-green` / `.text-leaflet-green` helpers and the ProductFruits overrides in `index.css` to use tokens instead of literals (the newsfeed modal currently forces `background: white`).

3. **Migrate hardcoded colours to tokens** — mechanical, file by file, keeping layout untouched:
   - `bg-white` → `bg-card` or `bg-surface`; `bg-slate-50/100` → `bg-muted` or `bg-surface-muted`; `text-slate-900/700` → `text-foreground`; `text-slate-600/500/400` → `text-muted-foreground`; `border-slate-200` → `border-border`.
   - Coloured status badges/pills (green/amber/red/blue tints in Leads, Cases, Opportunities, Quotes, Users, MetricsCards, TaskSummaryCards, RecentItemsSection, settings tabs) move to the new `success` / `warning` / `destructive` / `info` token pairs so they stay readable on dark surfaces.
   - Marketing pages (Hero, Blog, BlogArticle, Help, PublicProducts, Login, NotFound) get the same treatment, including prose styling (`dark:prose-invert`) for article bodies.
   - `ProjectDashboard.module.css` and `Projects.module.css` switch to `hsl(var(--…))` values so the obfuscated Projects styling stays intact (per the project rule that Projects keeps CSS modules).
   - `BottomNav` uses `text-brand` and `bg-card`; `Layout`'s `bg-slate-50` shell and white header become `bg-surface-muted` / `bg-card`.
   - `ChartsSection` (and any other recharts usage) reads colours from the chart tokens, and grid/axis/tooltip colours follow `--border` / `--muted-foreground`.

4. **Translations** — add a `theme` block (label, light, system, dark) to `common.json` for en, cs, de, fr, es, pt, ar, used by the header button tooltip and the Settings → Profile control.

5. **Verification**
   - Sweep with ripgrep to confirm no `bg-white`, `bg-slate-*`, `text-slate-*`, `text-gray-*`, `border-slate-*`, `text-white`/`bg-black` or raw hex colours remain in `src` outside the token definitions.
   - Drive the running app with Playwright in both themes and capture screenshots of: home, login, dashboard, accounts, contacts, leads, opportunities (kanban), activities, cases, users, products, quotes, projects, project detail, settings (all tabs), blog article, plus a dialog, a dropdown and a toast open — checking contrast and that nothing stays white-on-white or dark-on-dark.
   - Confirm the build log is clean.

## Notes

- ProductFruits and Usertour widget content is rendered by their own scripts and cannot be fully re-themed from here; the CSS overrides we control (newsfeed modal, checklist panel) will follow the theme, the widget internals stay as those tools render them.
- `data-testid` attributes stay as they are; no test hooks are removed.
