"use client";

import { BadgePlus, Check, ChevronRight, Pill, Stethoscope } from "lucide-react";
import Link from "next/link";

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function MegaMenuDoctor({ isOpen, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  return (
    <div
      className={`absolute left-0 right-0 top-full z-50 transition-opacity duration-150 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="For Doctors mega menu"
      aria-hidden={!isOpen}
    >
      <div className="container mx-auto p-6">
        <div className="rounded-xl border border-border bg-card/90 shadow-xl backdrop-blur">
          <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">
            {/* Left: Professional Account */}
            <div>
              <h3 className="mb-4 text-xl font-bold text-foreground">Professional Account</h3>
              <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <BadgePlus size={24} aria-hidden="true" />
                  <h4 className="font-semibold">Sign up for a Professional account</h4>
                </div>
                <ul className="mb-4 space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-primary" /> Exclusive professional discounts</li>
                  <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-primary" /> Special pricing for certificate courses</li>
                  <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-primary" /> Priority access to mentorship programs</li>
                  <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-primary" /> Exclusive webinars and conference discounts</li>
                </ul>
                <Link href="/register?type=doctor" className="btn btn-primary w-full text-center">Sign Up Now</Link>
              </div>
            </div>

            {/* Right: Professional Resources */}
            <div>
              <h3 className="mb-4 text-xl font-bold text-foreground">Professional Resources</h3>
              <div className="space-y-3">
                <Link href="/professional/materia-medica" className="flex items-center justify-between rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted">
                  <div className="flex items-center gap-3"><Pill size={22} className="text-primary" /><span className="font-medium">Materia Medica</span></div>
                  <ChevronRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/professional/courses" className="flex items-center justify-between rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted">
                  <div className="flex items-center gap-3"><Stethoscope size={22} className="text-primary" /><span className="font-medium">Certificate Courses</span></div>
                  <ChevronRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/professional/mentorship" className="flex items-center justify-between rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted">
                  <div className="flex items-center gap-3"><Stethoscope size={22} className="text-primary" /><span className="font-medium">Mentorship Programs</span></div>
                  <ChevronRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/professional/webinars" className="flex items-center justify-between rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted">
                  <div className="flex items-center gap-3"><BadgePlus size={22} className="text-primary" /><span className="font-medium">Webinars & Conferences</span></div>
                  <ChevronRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

