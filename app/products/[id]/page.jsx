import Image from "next/image";
import { getProductById } from "@/lib/actions/product";
import AddToCartSection from "@/components/AddToCartSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Minus, Plus, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
export default async function Page({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-600">Product not found 😢</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
      </Button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* image */}
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="mb-4">{product.name}</h1>
          <p className="text-blue-600 mb-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <Card className="p-6">
            <div className="mb-4">
              {product.countInStock ? (
                <p className="text-green-600">
                  In Stock ({product.countInStock} available)
                </p>
              ) : (
                <p className="text-red-600">Out of Stock</p>
              )}
            </div>
            {product.countInStock > 0 && <AddToCartSection product={product} />}
          </Card>
        </div>
      </div>
    </div>
  );
}
