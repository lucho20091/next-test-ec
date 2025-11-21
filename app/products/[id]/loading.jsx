import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Skeleton className="h-9 w-40 mb-6" /> {/* Back button skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <Skeleton className="relative aspect-square overflow-hidden rounded-lg" />

        {/* Info skeletons */}
        <div>
          <Skeleton className="h-10 w-3/4 mb-4" /> {/* Product name */}
          <Skeleton className="h-6 w-1/4 mb-6" /> {/* Price */}
          <Skeleton className="h-20 w-full mb-6" /> {/* Description */}
          <Card className="p-6">
            <Skeleton className="h-6 w-1/3 mb-4" /> {/* Stock status */}
            <Skeleton className="h-10 w-full" /> {/* Add to Cart button */}
          </Card>
        </div>
      </div>
    </div>
  );
}