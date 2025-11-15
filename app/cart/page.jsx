"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Minus, Plus } from "lucide-react";
import { getUserByEmail } from "@/lib/actions/user";
import { useState, useEffect } from "react";
import { showToast } from "@/lib/utils/toast";
export default function CartPage() {
  const [user, setUser] = useState(null);
  const { cartItems, removeFromCart, updateQuantity, total, clearCart } =
    useCart();
  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getUserByEmail();
        setUser(currentUser);
      } catch (error) {}
    }

    fetchUser();
  }, []);
  if (cartItems.length === 0)
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="mb-8">Shopping Cart</h1>
        <Card className="p-8 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </Card>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 relative flex-shrink-0 overflow-hidden rounded">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2">{item.name}</h3>
                  <p className="text-blue-600 mb-2">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span
                      className="
        w-8 h-8 flex items-center justify-center
        text-gray-800 font-medium text-sm
      "
                    >
                      {item.quantity}
                    </span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.countInStock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          <Button
            variant="outline"
            onClick={clearCart}
            className="w-full cursor-pointer"
          >
            Clear Cart
          </Button>
        </div>

        {/* Total + Actions */}
        <div>
          <Card className="p-6 sticky top-24">
            <h2 className="mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button asChild className="w-full" size="lg">
              {user ? (
                <Link href="/shipping">Proceed to Checkout</Link>
              ) : (
                <Link href="/checkout?anon">Proceed to Checkout</Link>
              )}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
