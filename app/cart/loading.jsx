import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Skeleton className="h-10 w-1/3 mb-8" /> {/* Shopping Cart title */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <Card key={index} className="p-4">
              <div className="flex gap-4">
                <Skeleton className="w-24 h-24 flex-shrink-0 rounded" /> {/* Product Image */}
                <div className="flex-1">
                  <Skeleton className="h-6 w-3/4 mb-2" /> {/* Product Name */}
                  <Skeleton className="h-4 w-1/4 mb-2" /> {/* Product Price */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" /> {/* Minus button */}
                    <Skeleton className="h-8 w-8 rounded-md" /> {/* Quantity display */}
                    <Skeleton className="h-8 w-8 rounded-md" /> {/* Plus button */}
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <Skeleton className="h-4 w-20" /> {/* Item total price */}
                  <Skeleton className="h-8 w-8 rounded-md" /> {/* Remove button */}
                </div>
              </div>
            </Card>
          ))}
          <Skeleton className="h-10 w-full" /> {/* Clear Cart button */}
        </div>

        <div>
          <Card className="p-6 sticky top-24">
            <Skeleton className="h-8 w-1/2 mb-4" /> {/* Order Summary title */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/3" /> {/* Total label */}
                <Skeleton className="h-4 w-1/4" /> {/* Total price */}
              </div>
            </div>
            <Skeleton className="h-12 w-full" /> {/* Proceed to Checkout button */}
          </Card>
        </div>
      </div>
    </div>
  );
}