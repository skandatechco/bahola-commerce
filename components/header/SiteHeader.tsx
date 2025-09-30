"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CartButton } from "./CartButton";
import MegaMenuBachFlower from "./MegaMenuBachFlower";
import MegaMenuCategory from "./MegaMenuCategory";
import MegaMenuDoctor from "./MegaMenuDoctor";
import TopBar from "./TopBar";

export function SiteHeader() {
  const [isBachOpen, setBachOpen] = useState(false);
  const [isCatOpen, setCatOpen] = useState(false);
  const [isDocOpen, setDocOpen] = useState(false);

  return (
    <header onMouseLeave={() => { setBachOpen(false); setCatOpen(false); setDocOpen(false); }}>
      <TopBar />

      <div className="container-gutter">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image 
              src="https://cdn.builder.io/api/v1/image/assets%2F982c525ed71b4aecb07284a69278ef3d%2F013e817fd5544fbcb6db259e7a29a3e0?format=webp&width=320" 
              alt="Bahola" 
              width={140} 
              height={32} 
            />
          </Link>
          <form action="/search" className="flex w-full max-w-xl items-center gap-2">
            <input 
              name="q" 
              placeholder="Search products..." 
              className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm" 
            />
            <button className="btn btn-primary">Search</button>
          </form>
          <div className="flex items-center gap-4 text-sm">
            <a href="/login" className="hidden sm:inline-flex rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-background">Sign In</a>
            <a href="/login" className="sm:hidden text-foreground/80 hover:text-foreground text-sm">Sign In</a>
            <CartButton />
          </div>
        </div>
      </div>

      <div className="relative w-full border-t border-border/60">
        <div className="container-gutter">
          <nav className="mx-auto hidden max-w-7xl items-center gap-6 py-3 text-sm md:flex">
            <a href="/problem" className="hover:text-foreground font-semibold">Shop by Problem</a>
            <div
              className="relative"
              onMouseEnter={() => setCatOpen(true)}
              onFocus={() => setCatOpen(true)}
            >
              <a
                href="/category"
                className="hover:text-foreground font-medium md:font-extrabold inline-flex items-center"
                aria-haspopup="true"
                aria-expanded={isCatOpen}
              >
                Shop by Category
                <ChevronDown size={14} className={`ml-1 inline-block transition-transform ${isCatOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </a>
            </div>
            <a href="/diseases" className="hover:text-foreground font-medium md:font-extrabold">Diseases &amp; Conditions</a>
            <div
              className="relative"
              onMouseEnter={() => setDocOpen(true)}
              onFocus={() => setDocOpen(true)}
            >
              <a
                href="/doctors"
                className="hover:text-foreground font-medium md:font-extrabold inline-flex items-center"
                aria-haspopup="true"
                aria-expanded={isDocOpen}
              >
                For Doctors
                <ChevronDown size={14} className={`ml-1 inline-block transition-transform ${isDocOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </a>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setBachOpen(true)}
              onFocus={() => setBachOpen(true)}
            >
              <a
                href="/bach-flower"
                className="hover:text-foreground font-medium md:font-extrabold inline-flex items-center"
                aria-haspopup="true"
                aria-expanded={isBachOpen}
              >
                Bach Flower
                <ChevronDown size={14} className={`ml-1 inline-block transition-transform ${isBachOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </a>
            </div>

            <a href="/love-homeopathy" className="hover:text-foreground font-medium md:font-extrabold">I ❤️ HOMEOPATHY</a>
            <a href="/why-homeopathy" className="hover:text-foreground font-medium md:font-extrabold">Why Homeopathy</a>
          </nav>
          <MegaMenuCategory isOpen={isCatOpen} onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)} />
          <MegaMenuBachFlower isOpen={isBachOpen} onMouseEnter={() => setBachOpen(true)} onMouseLeave={() => setBachOpen(false)} />
          <MegaMenuDoctor isOpen={isDocOpen} onMouseEnter={() => setDocOpen(true)} onMouseLeave={() => setDocOpen(false)} />
        </div>
      </div>
    </header>
  );
}

