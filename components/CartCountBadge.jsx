"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartCountBadge() {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="relative px-3 border-none"
    >
      <Link href="/cart" className="flex items-center gap-2">
        <ShoppingCart className="h-4 w-4" />
        <span>Cart</span>

        {totalItems > 0 && (
          <span
            className="
              absolute -top-2 -right-2
              bg-blue-600 text-white
              text-xs font-semibold
              rounded-full
              w-5 h-5
              flex items-center justify-center
              shadow-md
              ring-2 ring-background
            "
          >
            {totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
}
