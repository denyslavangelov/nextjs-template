# Next.js Rules

- Use App Router (app/ directory).
- Prefer Server Components by default.
- Add "use client" only when necessary.
- Fetch data on the server when possible.
- Avoid unnecessary API routes.
- Use route handlers only when needed.
- Use @/* import alias.
- Keep structure:

  app/ → routes
  components/ → UI
  lib/ → utilities
  hooks/ → reusable logic

- Do not mix server and client logic incorrectly.
- Use built-in Next.js features before adding libraries.
