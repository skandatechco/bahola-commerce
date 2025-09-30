import Link from "next/link";

export function SearchActionBar() {
  return (
    <section className="container-gutter">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold">Find the right remedy for you</h3>
              <p className="text-sm text-foreground/70">Search by condition, product name, or browse our categories</p>
            </div>
            <div className="flex gap-3">
              <Link href="/search" className="btn btn-primary">Browse Products</Link>
              <Link href="/remedy-finder" className="btn btn-ghost">Remedy Finder</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

