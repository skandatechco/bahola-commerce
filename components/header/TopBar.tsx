"use client";

import { Gift, Heart, Mail, Phone, Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type SwellCustomer = {
  first_name?: string;
  last_name?: string;
  email?: string;
};

export default function TopBar() {
  const [customer, setCustomer] = useState<SwellCustomer | null>(null);

  useEffect(() => {
    // For now, we'll skip Swell integration in the topbar
    // This can be added later when needed
  }, []);

  const handleLogout = async () => {
    // For now, we'll skip logout functionality
    setCustomer(null);
  };

  return (
    <div className="w-full border-b border-border/60 bg-bahola-blue-50 py-2 text-xs text-foreground/70">
      <div className="container-gutter">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-6">
            <a href="tel:+919791035385" className="flex items-center gap-1 top-menu-item">
              <Phone size={14} />
              <span>+919791035385</span>
            </a>
            <div className="hidden items-center gap-1 md:flex top-menu-item">
              <Truck size={14} />
              <span>Free shipping on Rs 500+</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/my-list" className="top-menu-item flex items-center gap-1">
              <Heart size={14} />
              <span>My List</span>
            </Link>
            <Link href="/promo-pocket" className="top-menu-item flex items-center gap-1">
              <Gift size={14} />
              <span>Promo Pocket</span>
            </Link>
            <Link href="/register" className="top-menu-item flex items-center gap-1">
              <Mail size={14} />
              <span>Email Signup</span>
            </Link>

            {customer && (
              <div className="flex items-center gap-4">
                <Link href="/account" className="top-menu-item">
                  Welcome, {customer.first_name || "Customer"}
                </Link>
                <button className="top-menu-item" onClick={handleLogout}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

