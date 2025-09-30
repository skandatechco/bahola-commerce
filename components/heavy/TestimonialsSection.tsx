export function TestimonialsSection() {
  return (
    <section className="container-gutter">
      <div className="mx-auto max-w-7xl">
        <h3 className="text-lg font-semibold">What our customers say</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-foreground/70">"Excellent homeopathic remedies. Highly recommended!"</p>
            <div className="mt-2 text-xs font-medium">- Sarah M.</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-foreground/70">"Great service and authentic products."</p>
            <div className="mt-2 text-xs font-medium">- Raj K.</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-foreground/70">"Trusted source for homeopathic medicines."</p>
            <div className="mt-2 text-xs font-medium">- Priya S.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

