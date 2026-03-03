

## Plan: Add Projects Page + Project Dashboard

Extends the existing plan with a simple project dashboard view. All new components use semantic Tailwind CSS classes -- no `data-testid` attributes.

### 1. Data Layer -- `src/utils/sampleData.ts`

- Add `Project` interface: `id`, `name`, `accountId`, `accountName`, `status` (Active/On Hold/Completed/Cancelled), `priority` (Low/Medium/High/Critical), `startDate`, `endDate`, `owner`, `budget`, `description`, `createdAt`
- Add `generateProjects(accounts, count = 30)` function
- Include `projects` in `generateAndStoreSampleData()` and `getSampleData()`

### 2. Projects List Page -- `src/pages/Projects.tsx` (new)

Same card-grid structure as Contacts but without `data-testid`:
- Search bar filtering by name, account, owner
- "New Project" button opening modal
- Cards showing: name, account, status/priority badges, date range, owner, budget
- Empty state when no results

### 3. Project Dashboard -- `src/pages/ProjectDashboard.tsx` (new)

Route: `/dashboard/projects/:id`

A simple detail/dashboard page for a single project, with sections:
- **Header**: project name, status badge, priority badge, edit button
- **Summary cards row**: budget, days remaining, owner, account
- **Progress section**: visual progress bar based on start/end dates
- **Description card**: project description text

All identified via Tailwind classes (e.g., `project-dashboard-header`, `project-summary-cards`, `project-progress-section`).

### 4. New Project Modal -- `src/components/modals/NewProjectModal.tsx` (new)

Dialog form: name, account (select from existing), status, priority, start/end dates, budget, description. No `data-testid`.

### 5. Navigation & Routing

**`src/App.tsx`**: Add two routes under dashboard:
```
<Route path="projects" element={<Projects />} />
<Route path="projects/:id" element={<ProjectDashboard />} />
```

**`src/components/Layout.tsx`**: Add `{ name: t('items.projects'), href: "/dashboard/projects", icon: Briefcase }` between quotes and settings in the `navigation` array. Import `Briefcase` from lucide.

**`src/components/BottomNav.tsx`**: Add projects to `moreNavItems` array. Import `Briefcase`.

### 6. i18n

**New files** -- `src/i18n/locales/{en,cs,de,fr,es,pt,ar}/projects.json` with keys: `title`, `subtitle`, `newProject`, `searchPlaceholder`, `noResults`, `columns.*`, `status.*`, `priority.*`, `dashboard.*` (budget, daysRemaining, progress, description)

**Edit navigation.json** for all 7 locales: add `"projects"` key.

**Edit `src/i18n/index.ts`**: import all 7 `projects.json` files, add to resources and `ns` array.

### File Summary

| Action | File |
|--------|------|
| New | `src/pages/Projects.tsx` |
| New | `src/pages/ProjectDashboard.tsx` |
| New | `src/components/modals/NewProjectModal.tsx` |
| New | `src/i18n/locales/{en,cs,de,fr,es,pt,ar}/projects.json` (7 files) |
| Edit | `src/utils/sampleData.ts` |
| Edit | `src/App.tsx` |
| Edit | `src/components/Layout.tsx` |
| Edit | `src/components/BottomNav.tsx` |
| Edit | `src/i18n/index.ts` |
| Edit | `src/i18n/locales/{all 7}/navigation.json` |

