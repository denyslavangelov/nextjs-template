import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between gap-16 px-6 py-20 sm:items-start sm:px-16 sm:py-28">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-muted">
          Next.js template
        </p>

        <div className="flex w-full flex-col items-center gap-8 text-center sm:items-start sm:text-left">
          <h1 className="max-w-lg font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            Start with type that has a point of view.
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-muted">
            This starter pairs{" "}
            <span className="font-medium text-foreground">Bricolage Grotesque</span>{" "}
            for display type with{" "}
            <span className="font-medium text-foreground">Manrope</span> for body
            copy — including Cyrillic when you need it. Edit{" "}
            <code className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-sans text-sm text-foreground">
              page.tsx
            </code>{" "}
            to make it yours.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 font-sans text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="invert"
              src="/vercel.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden
            />
            Deploy now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-border bg-surface px-6 font-sans text-sm font-semibold text-foreground transition-colors hover:border-foreground/20 hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:w-auto"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
