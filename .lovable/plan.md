

## Plan: Add Projects page to CRM

Create a new "Projects" page following the same structure as Contacts, but using Tailwind CSS class names for element identification instead of `data-testid` attributes.

### Data Layer

**`src/utils/sampleData.ts`**:
- Add `Project` interface with fields: `id`, `name`, `accountId`, `accountName`, `status` (Active/On Hold/Completed/Cancelled), `priority` (Low/Medium/High/Critical), `startDate`, `endDate`, `owner`, `budget`, `description`, `createdAt`
- Add `generateProjects(accounts, count)` function
- Include projects in `generateAndStoreSampleData` and `getSampleData`

### Page Component

**`src/pages/Projects.tsx`** (new file):
- Grid layout with cards, same visual style as Contacts
- Search bar filtering by name, account, owner
- "New Project" button (opens modal)
- Each card shows: name, account, status badge, priority badge, date range, owner, budget
- All elements identified via semantic Tailwind classes (e.g., `projects-card`, `projects-search`, `projects-grid`) instead of `data-testid`

### Modal

**`src/components/modals/NewProjectModal.tsx`** (new file):
- Dialog form with fields: name, account (select), status, priority, start/end dates, budget, description, owner
- Same pattern as `NewContactModal` but without `data-testid`

### Navigation & Routing

**`src/App.tsx`**: Add route `<Route path="projects" element={<Projects />} />` under dashboard
**`src/components/Layout.tsx`**: Add Projects nav item (using `Briefcase` icon from lucide) between Quotes and Settings
**`src/components/BottomNav.tsx`**: Add Projects to the "More" dropdown menu

### i18n

Add `projects` translation namespace across all 7 locales (en, cs, de, fr, es, pt, ar) with keys: `title`, `subtitle`, `newProject`, `searchPlaceholder`, `noResults`, `columns.*`, `status.*`, `priority.*`

Add `"projects": "Projects"` (and translations) to each locale's `navigation.json`.

### Summary of files

| Action | File |
|--------|------|
| New | `src/pages/Projects.tsx` |
| New | `src/components/modals/NewProjectModal.tsx` |
| New | `src/i18n/locales/{en,cs,de,fr,es,pt,ar}/projects.json` (7 files) |
| Edit | `src/utils/sampleData.ts` |
| Edit | `src/App.tsx` |
| Edit | `src/components/Layout.tsx` |
| Edit | `src/components/BottomNav.tsx` |
| Edit | `src/i18n/index.ts` |
| Edit | `src/i18n/locales/{all}/navigation.json` (7 files) |

