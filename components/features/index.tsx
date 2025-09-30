import Link from "next/link";

export function ConsultSection() {
  return (
    <section className="container-gutter">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Consult a Homeopath</h3>
          <p className="mt-2 text-sm text-foreground/70">Book online or in‑person consultations at our clinics.</p>
          <div className="mt-4 flex gap-3">
            <Link href="/consultation" className="btn btn-primary">Book Online</Link>
            <Link href="/consultation" className="btn btn-ghost">Book In‑Person</Link>
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Explore Conditions</h3>
          <p className="mt-2 text-sm text-foreground/70">Discover remedies tailored to common health concerns.</p>
          <div className="mt-4 flex gap-3">
            <Link href="/health/cold" className="btn btn-primary">Cold &amp; Flu</Link>
            <Link href="/health/headache" className="btn btn-ghost">Headache</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DiscoverSection() {
  const cats = [
    { href: "/search/mother-tinctures", label: "Mother Tinctures" },
    { href: "/search/biochemics", label: "Biochemics" },
    { href: "/search/specialties", label: "Specialties" },
  ];
  return (
    <section className="container-gutter">
      <div className="mx-auto max-w-7xl">
        <h3 className="text-lg font-semibold">Discover best‑selling categories</h3>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {cats.map((c) => (
            <a key={c.href} href={c.href} className="rounded-xl border border-border bg-card p-4 text-sm shadow-sm hover:shadow">
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

