import Link from "next/link";

export function AboutSection() {
  return (
    <section className="container-gutter">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          <h3 className="text-2xl font-bold">About Bahola Labs</h3>
          <p className="mt-4 text-foreground/70">
            Since 1982, Bahola Labs has been providing authentic homeopathic remedies and natural health solutions. 
            Our commitment to quality and patient care has made us a trusted name in homeopathy across India.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="/about" className="btn btn-primary">Learn More</Link>
            <Link href="/contact" className="btn btn-ghost">Contact Us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

