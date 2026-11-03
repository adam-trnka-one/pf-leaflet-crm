# Architecture rules

- Keep font preferences in the global FontProvider with browser-local persistence, like theme preferences; appearance must apply to every route and portal without changing workspace identity.
- Define selectable font stacks in global CSS and reference the app font token from Tailwind; intentional code and numeric monospace styles remain independent.