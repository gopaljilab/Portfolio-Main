import { Link } from "wouter";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
        <p className="mb-2 font-mono text-sm text-primary">404</p>
        <h1 className="font-serif text-4xl">Page unavailable</h1>
        <p className="mb-6 mt-3 text-muted-foreground">The address may have changed.</p>
        <Link href="/" className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}
