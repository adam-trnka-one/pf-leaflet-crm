

## Plan: Extract inline Tailwind to CSS module classes with hashed names

Move all inline Tailwind utility classes from `Projects.tsx` and `ProjectDashboard.tsx` into dedicated CSS Module files. CSS Modules automatically generate unique hashed class names (like `_4skeas23F`) at build time -- Vite supports them natively with `.module.css` files.

### Approach

Use **CSS Modules** (`.module.css`) which Vite supports out of the box. Each class name gets a unique hash in the compiled output (e.g., `_projects-page_4skeas` instead of human-readable names in the HTML).

### New Files

**`src/pages/Projects.module.css`**
- Define classes like `.page`, `.header`, `.headerText`, `.title`, `.subtitle`, `.newBtn`, `.searchWrap`, `.searchIcon`, `.searchInput`, `.grid`, `.cardLink`, `.card`, `.cardIcon`, `.cardIconWrap`, `.cardTitle`, `.cardSubtitle`, `.badges`, `.dates`, `.budget`, `.ownerRow`, `.empty`, `.loading`, `.spinner`
- Each class contains the equivalent `@apply` directives for the Tailwind utilities currently inline (e.g., `.page { @apply p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen; }`)

**`src/pages/ProjectDashboard.module.css`**
- Define classes like `.page`, `.backBtn`, `.header`, `.title`, `.badgesWrap`, `.summaryGrid`, `.summaryCard`, `.summaryIconWrap`, `.summaryLabel`, `.summaryValue`, `.progressSection`, `.progressBar`, `.progressDates`, `.descriptionSection`, `.descriptionText`, `.emptyState`
- Same pattern: `@apply` Tailwind utilities

### Modified Files

**`src/pages/Projects.tsx`**
- `import styles from './Projects.module.css'`
- Replace all `className="projects-page p-4 sm:p-6 ..."` with `className={styles.page}`
- Replace all inline Tailwind class strings with the corresponding `styles.xxx` reference
- Status/priority badge colors remain as dynamic strings (merged via template literals with `styles` classes)

**`src/pages/ProjectDashboard.tsx`**
- `import styles from './ProjectDashboard.module.css'`
- Same replacement pattern -- all inline utilities become `styles.xxx` references
- Dynamic status/priority colors still passed as secondary className strings

### What stays inline

- Status/priority color maps (`statusColors`, `priorityColors`) remain as dynamic Tailwind classes since they are data-driven and need to be applied conditionally alongside the module class
- Props passed to shadcn components (e.g., `<Card className="bg-white shadow-sm">`) get moved to module classes too

### Result

In the browser DevTools, class names will appear as hashed identifiers (e.g., `_page_x7k2a_1`, `_header_x7k2a_5`) instead of readable Tailwind utilities, matching the user's requirement for dynamic/obfuscated CSS names.

