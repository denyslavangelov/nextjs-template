# Finalize, Build, GitHub, and Vercel Deployment Workflow

Use this workflow when the user says things like: `finalize`, `ship`, `deploy`, `make it a repo`, `push to GitHub`, `deploy to Vercel`, `show me the domain`, or similar.

This is a delivery workflow, not a design/dev rule. Apply it only after the product/page/app is considered ready or when the user explicitly asks to prepare a deployable version.

## Non-negotiable rules

- Never claim the project is deployed unless the GitHub push and Vercel deployment actually succeeded.
- Never invent or guess the final domain. Only report the exact deployment URL printed by the Vercel CLI.
- Never commit secrets, `.env` files, `.vercel`, `.next`, `node_modules`, or build output.
- Default GitHub repositories to `private` unless the user explicitly asks for `public`.
- Do not bypass TypeScript, ESLint, Next.js build checks, or failing tests just to make deployment pass.
- Do not hide real errors by deleting important code, disabling rules globally, using `any` everywhere, or suppressing warnings unless there is a clear, justified reason.
- If required environment variables are missing, create or update `.env.example`, explain the missing values, and stop before production deployment if the app cannot work without them.

## Required tools on the user's machine

Before starting deployment, check for:

- `git`
- Node.js and the project's package manager
- GitHub CLI: `gh`
- Vercel CLI: `vercel` or temporary `npx --yes vercel@latest`

If GitHub CLI is not authenticated, tell the user to run:

```bash
gh auth login
```

If Vercel CLI is not authenticated, tell the user to run:

```bash
vercel login
```

Do not continue GitHub/Vercel deployment without authenticated CLIs.

## Package manager rule

Respect the project lockfile:

- `pnpm-lock.yaml` → use `pnpm`
- `package-lock.json` → use `npm`
- `yarn.lock` → use `yarn`
- `bun.lockb` / `bun.lock` → use `bun`
- no lockfile → use `npm`

When the user says “run npm build”, interpret it as “run the project build script” while preserving the package manager used by the repository.

## Build-fix loop

Run this loop until the build passes:

1. Install dependencies if needed.
2. Run typecheck if available.
3. Run lint if available.
4. Run the production build.
5. If anything fails:
   - read the actual error carefully;
   - identify the smallest safe fix;
   - apply the fix;
   - rerun the relevant command;
   - repeat until there are no errors.

Recommended command order:

```bash
# install according to lockfile
pnpm install --frozen-lockfile
# or npm ci / npm install, depending on the lockfile

# then run checks
pnpm typecheck   # only if script exists
pnpm lint        # only if script exists
pnpm build
```

Never continue to GitHub or Vercel until the production build passes.

## GitHub repo creation and push

1. Check if the folder is already a git repo:

```bash
git status
```

2. If not a repo:

```bash
git init
git branch -M main
```

3. Stage and commit:

```bash
git add -A
git commit -m "Initial production-ready version"
```

If the repo already has commits, use a concise commit message like:

```bash
git commit -m "Finalize production deployment"
```

4. If no `origin` remote exists, create a GitHub repo from the current folder and push:

```bash
gh repo create <repo-name> --private --source . --remote origin --push
```

Use `--public` only if the user explicitly asked for a public repository.

5. If `origin` already exists, push the current branch:

```bash
git push -u origin main
```

If the current branch is not `main`, either push that branch or rename to `main` only if safe.

## Vercel project creation and production deployment

After GitHub push succeeds, deploy to Vercel from the project root:

```bash
vercel deploy --prod --yes
```

If `vercel` is not installed globally, use:

```bash
npx --yes vercel@latest deploy --prod --yes
```

Capture the deployment output. The final answer must include the actual Vercel production URL printed by the CLI.

## Optional helper script

This template includes:

```bash
npm run ship
```

The script automates the repeatable parts: dependency install, checks, build, git init/commit, GitHub repo creation/push, Vercel deploy, and final URL output.

Use flags when needed:

```bash
npm run ship -- --repo my-project-name
npm run ship -- --repo my-project-name --public
npm run ship -- --no-github
npm run ship -- --no-vercel
```

Important: the script cannot intelligently fix build errors by itself. If `npm run ship` fails during typecheck/lint/build, fix the reported errors manually and rerun the script.

## Final response format after successful deployment

When everything succeeds, respond with:

- GitHub repo URL
- Vercel production URL/domain
- Build status
- Commit message used
- Any environment variables or manual post-deploy steps still needed

Keep it brief, factual, and do not over-explain.
