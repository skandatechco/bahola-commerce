"use client";

import { ChevronRight, Flower2 as Flower, Heart } from "lucide-react";
import Link from "next/link";

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function MegaMenuBachFlower({ isOpen, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  return (
    <div
      className={`absolute left-0 right-0 top-full z-50 transition-opacity duration-150 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="Bach Flower mega menu"
      aria-hidden={!isOpen}
    >
      <div className="container mx-auto p-6">
        <div className="rounded-xl border border-border bg-card/90 shadow-xl backdrop-blur">
          <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold text-foreground">Bach Flower Remedies</h3>
              <p className="mb-6 text-foreground/70">
                Bach flower remedies are a system of 38 flower remedies developed by Dr. Edward Bach, each prepared from the flowers of wild plants, trees, and bushes.
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Link
                  href="/bach-flower/concerns"
                  className="flex flex-col items-center rounded-lg border border-border bg-card p-6 shadow-sm transition-colors hover:bg-muted"
                >
                  <div className="mb-3 text-primary">
                    <Heart size={32} aria-hidden="true" />
                  </div>
                  <h4 className="mb-2 font-semibold text-foreground">Shop By Concern</h4>
                  <p className="text-center text-sm text-foreground/70">
                    Find remedies for specific emotional states and concerns
                  </p>
                </Link>

                <Link
                  href="/category/bach-flower"
                  className="flex flex-col items-center rounded-lg border border-border bg-card p-6 shadow-sm transition-colors hover:bg-muted"
                >
                  <div className="mb-3 text-primary">
                    <Flower size={32} aria-hidden="true" />
                  </div>
                  <h4 className="mb-2 font-semibold text-foreground">Shop by Name</h4>
                  <p className="text-center text-sm text-foreground/70">
                    Browse our complete catalog of Bach flower remedies
                  </p>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold text-foreground">Popular Bach Flower Remedies</h3>

              <div className="space-y-3">
                <Link
                  href="/product/rescue-remedy"
                  className="block rounded-r border-l-4 border-primary/80 bg-card/80 p-3 pl-4 shadow-sm transition-colors hover:bg-muted"
                >
                  <h4 className="font-semibold text-foreground">Rescue Remedy</h4>
                  <p className="text-sm text-foreground/70">For times of stress, emergencies, and crisis situations</p>
                </Link>

                <Link
                  href="/product/mimulus"
                  className="block rounded-r border-l-4 border-border bg-card/80 p-3 pl-4 shadow-sm transition-colors hover:border-primary/80 hover:bg-muted"
                >
                  <h4 className="font-semibold text-foreground">Mimulus</h4>
                  <p className="text-sm text-foreground/70">For known fears and everyday anxieties</p>
                </Link>

                <Link
                  href="/product/larch"
                  className="block rounded-r border-l-4 border-border bg-card/80 p-3 pl-4 shadow-sm transition-colors hover:border-primary/80 hover:bg-muted"
                >
                  <h4 className="font-semibold text-foreground">Larch</h4>
                  <p className="text-sm text-foreground/70">For lack of confidence and self-esteem</p>
                </Link>

                <Link
                  href="/product/olive"
                  className="block rounded-r border-l-4 border-border bg-card/80 p-3 pl-4 shadow-sm transition-colors hover:border-primary/80 hover:bg-muted"
                >
                  <h4 className="font-semibold text-foreground">Olive</h4>
                  <p className="text-sm text-foreground/70">For physical and mental exhaustion</p>
                </Link>

                <Link
                  href="/product/white-chestnut"
                  className="block rounded-r border-l-4 border-border bg-card/80 p-3 pl-4 shadow-sm transition-colors hover:border-primary/80 hover:bg-muted"
                >
                  <h4 className="font-semibold text-foreground">White Chestnut</h4>
                  <p className="text-sm text-foreground/70">For unwanted thoughts and mental arguments</p>
                </Link>

                <div className="mt-4">
                  <Link href="/bach-flower/concerns" className="inline-flex items-center font-semibold text-primary hover:underline">
                    View all Bach Flower remedies
                    <ChevronRight size={16} className="ml-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

