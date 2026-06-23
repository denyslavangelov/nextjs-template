This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Shipping to GitHub and Vercel

When the project is finalized, run:

```bash
npm run ship
```

Optional flags:

```bash
npm run ship -- --repo my-project-name
npm run ship -- --repo my-project-name --public
npm run ship -- --no-github
npm run ship -- --no-vercel
```

The shipping script will:

1. install dependencies if needed;
2. run typecheck if available;
3. run lint if available;
4. run the production build;
5. initialize git if needed;
6. create/push a GitHub repository using GitHub CLI;
7. deploy to Vercel using Vercel CLI;
8. print the final GitHub and Vercel URLs.

Requirements:

```bash
gh auth login
vercel login
```

If the build fails, fix the reported errors and rerun the command. The deployment should only continue after a clean production build.
