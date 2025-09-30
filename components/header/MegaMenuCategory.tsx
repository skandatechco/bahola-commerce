"use client";

import Link from "next/link";

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const categories = [
  {
    id: "mother-tinctures",
    name: "Mother Tinctures",
    subcategories: alphabet.map((letter) => ({ id: letter.toLowerCase(), name: letter, textColor: "text-green-700" })),
  },
  {
    id: "homeopathic-dilutions",
    name: "Homeopathic Dilutions",
        subcategories: alphabet.map((letter) => ({
          id: letter.toLowerCase(),
          name: letter,
          textColor: "text-blue-700",
          href: `/category/homeopathic-dilutions/dil-${letter.toLowerCase()}`
        })),
  },
  {
    id: "lm-potencies",
    name: "LM Potencies",
    subcategories: alphabet.map((letter) => ({ id: letter.toLowerCase(), name: letter })),
  },
  { id: "bio-chemics", name: "Bio Chemics", subcategories: [] },
  { id: "bio-combinations", name: "Bio Combinations", subcategories: [] },
  { id: "triturations", name: "Triturations", subcategories: [] },
  { id: "single-remedies", name: "Single Remedies", subcategories: [] },
];

export default function MegaMenuCategory({ isOpen, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  return (
    <div
      className={`absolute left-0 right-0 top-full z-50 transition-opacity duration-150 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="Shop by Category mega menu"
      aria-hidden={!isOpen}
    >
      <div className="container mx-auto p-6">
        <div className="rounded-xl border border-border bg-card/90 shadow-xl backdrop-blur">
          <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">
            <div>
              {categories.slice(0, 2).map((category, index) => (
                <div key={category.id} className={index > 0 ? "mt-6" : ""}>
                  <Link
                    href={`/category/${category.id}`}
                    className="mb-4 block text-lg font-semibold text-primary hover:opacity-90"
                  >
                    {category.name}
                  </Link>

                  {category.subcategories.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 md:grid-cols-7">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={(subcategory as any).href || `/category/${category.id}/${subcategory.id}`}
                          className={`rounded border border-border bg-background/70 px-2 py-1 text-center text-sm shadow-sm transition-colors hover:bg-muted ${subcategory.textColor || ""}`}
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div>
              {categories.slice(2, 3).map((category, index) => (
                <div key={category.id} className={index > 0 ? "mt-6" : ""}>
                  <Link
                    href={`/category/${category.id}`}
                    className="mb-4 block text-lg font-semibold text-primary hover:opacity-90"
                  >
                    {category.name}
                  </Link>

                  {category.subcategories.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 md:grid-cols-7">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={(subcategory as any).href || `/category/${category.id}/${subcategory.id}`}
                          className={`rounded border border-border bg-background/70 px-2 py-1 text-center text-sm shadow-sm transition-colors hover:bg-muted ${subcategory.textColor || ""}`}
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6 grid grid-cols-1 gap-3">
                {categories.slice(3).map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="text-lg font-semibold text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border/60" />

          <div className="p-4 text-center">
            <Link href="/category" className="font-medium text-primary transition-colors hover:underline">
              View All Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
