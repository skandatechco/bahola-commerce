"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400&auto=format&fit=crop",
    title: "Authentic Homeopathic Remedies",
    subtitle: "Trusted formulas crafted with care",
    cta: { label: "Shop Remedies", href: "/search" },
  },
  {
    src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1400&auto=format&fit=crop",
    title: "Consult Bahola Doctors",
    subtitle: "In‑person and secure video consultations",
    cta: { label: "Book Consultation", href: "/consultation" },
  },
  {
    src: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1400&auto=format&fit=crop",
    title: "Gentle. Safe. Effective.",
    subtitle: "Natural support for every family",
    cta: { label: "Discover Now", href: "/" },
  },
];

export function ShopHeroCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="container-gutter">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border/60 bg-card">
        <div className="relative aspect-[16/7]">
          {slides.map((s, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
              aria-hidden={i !== idx}
            >
              <Image src={s.src} alt={s.title} fill priority={idx === 0} className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/0" />
              <div className="absolute bottom-6 left-6 max-w-lg text-white">
                <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">{s.title}</h2>
                <p className="mt-2 text-sm opacity-90">{s.subtitle}</p>
                <Link href={s.cta.href} className="btn btn-primary mt-4">
                  {s.cta.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 p-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-2 w-2 rounded-full ${i === idx ? "bg-primary" : "bg-foreground/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

