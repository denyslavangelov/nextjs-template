# Project Rules

Rules live in `.cursor/rules/*.mdc` and activate automatically by scope:

| Rule | When it applies |
|------|-----------------|
| `00-core.mdc` | Always |
| `10-nextjs.mdc` | `src/app/**`, `src/**/*.ts(x)` |
| `20-ui-design.mdc` | `src/**/*.tsx`, `src/**/*.css` |
| `21-form-controls.mdc` | Form/input/select/calendar files + TSX |
| `30-copywriting.mdc` | Visible text, headlines, Bulgarian content |
| `40-types-data.mdc` | `src/**/*.ts(x)` |
| `50-ship-deploy.mdc` | Finalize, ship, deploy, GitHub, Vercel |

These rules override default AI behavior.

## Quick reminders

- **UI:** No generic AI slop. No lazy fonts (Inter-by-default, Arial, unthemed `font-sans`). Choose fonts intentionally with `next/font`. Match design tokens; never ship native form controls.
- **Copy:** Native Bulgarian when content is Bulgarian. No template SaaS language.
- **Ship:** Never claim deploy success without real CLI output.

To force a rule in chat: `@00-core` or `@20-ui-design` (rule name without `.mdc`).
