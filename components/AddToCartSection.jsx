"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
export default function AddToCartSection({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart({ ...product, quantity });
  };

  const increaseQty = () => {
    if (quantity < product.countInStock) setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2">Quantity</label>

      <div className="flex items-center justify-between mb-4">
        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={decreaseQty}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={increaseQty}
            disabled={quantity >= product.stockCount}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Add to Cart */}
      <Button onClick={handleAdd} className="w-full" size="lg">
        Add to Cart
      </Button>
    </div>
  );
}
