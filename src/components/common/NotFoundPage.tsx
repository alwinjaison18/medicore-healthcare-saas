import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-6">
      <section className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Error 404
        </p>
        <h1 className="mt-3 font-display text-4xl text-primary">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          The page you requested does not exist in MediCore.
        </p>
        <Link
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          to="/dashboard"
        >
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
