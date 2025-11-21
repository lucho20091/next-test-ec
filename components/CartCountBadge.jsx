"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";

export default function CartCountBadge() {
  const { cartItems } = useCart();
  const pathname = usePathname();

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const isActive = pathname.startsWith("/cart");

  return (
    <Link
      href="/cart"
      className={`
        relative inline-flex items-center gap-1 hover:underline
        ${isActive ? "underline font-semibold" : ""}
      `}
    >
      <ShoppingCart className="h-4 w-4" />
      <span>Cart</span>

      {totalItems > 0 && (
        <span
          className="
            absolute -top-2 -right-3
            bg-blue-600 text-white
            text-xs font-semibold
            rounded-full
            w-5 h-5
            flex items-center justify-center
            shadow-md
          "
        >
          {totalItems}
        </span>
      )}
    </Link>
  );
}
