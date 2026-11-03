# Architecture rules

- Keep font preferences in the global FontProvider with browser-local persistence, like theme preferences; appearance must apply to every route and portal without changing workspace identity.
- Define selectable font stacks in global CSS and reference the app font token from Tailwind; intentional code and numeric monospace styles remain independent.- Report ProductFruits/Usertour state only through the shared tool status store in useProductFruits, and stop tools only via its teardown helper; UI must never poll window globals, so status stays instant and consistent.
