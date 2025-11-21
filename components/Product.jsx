"use client";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function Product({ product }) {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-square overflow-hidden relative">
        {!imageLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        <Image
          src={product.image}
          alt={product.name}
          width={220}
          height={220}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <CardContent className="p-4 flex-1">
        <h3 className="mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <p className="text-blue-600">${product.price.toFixed(2)}</p>
        {!product.countInStock && (
          <p className="text-red-600 mt-1">Out of Stock</p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          onClick={() => addToCart(product)}
          disabled={!product.countInStock}
          className="flex-1 cursor-pointer"
        >
          Add to Cart
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/products/${product.id}`}>View Product</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}