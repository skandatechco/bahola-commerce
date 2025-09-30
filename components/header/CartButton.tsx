"use client";

import { Package, ShoppingCart } from "lucide-react";
import Link from "next/link";

export function CartButton() {
  // For now, we'll use static values
  // This can be connected to your cart context later
  const itemCount = 0;
  const totalAmount = 0;

  return (
    <div className="flex flex-shrink-0 items-center">
      <Link href="/track-order" className="mr-6 flex items-center text-bahola-blue-500 hover:text-bahola-blue-700">
        <Package size={22} className="mr-1" />
        <span className="hidden md:inline">Track Order</span>
      </Link>

      <Link href="/cart" className="relative mr-6 flex items-center">
        <ShoppingCart size={24} className="text-bahola-blue-500" />
        {itemCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-bahola-blue-500 text-xs text-white">
            {itemCount}
          </span>
        )}
        <span className="ml-2 hidden md:block">₹{totalAmount.toLocaleString()}</span>
      </Link>
    </div>
  );
}

