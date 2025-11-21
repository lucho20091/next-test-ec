import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-start mb-8">
        <Skeleton className="h-6 w-24" /> {/* My Orders link */}
        <Skeleton className="h-6 w-32" /> {/* Dummy Account Orders link */}
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <Skeleton className="h-4 w-32 mb-1" /> {/* Order # */}
                <Skeleton className="h-4 w-40" /> {/* Placed on date */}
              </div>
              <Skeleton className="h-6 w-24 rounded-full" /> {/* Status Badge */}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <Skeleton className="h-4 w-2/3" /> {/* Item name x quantity */}
                <Skeleton className="h-4 w-1/4" /> {/* Item total price */}
              </div>
              <div className="flex justify-between text-sm">
                <Skeleton className="h-4 w-2/3" /> {/* Item name x quantity */}
                <Skeleton className="h-4 w-1/4" /> {/* Item total price */}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <Skeleton className="h-4 w-16 mb-1" /> {/* Total label */}
                <Skeleton className="h-6 w-20" /> {/* Total price */}
              </div>
              <Skeleton className="h-9 w-28" /> {/* View Details button */}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}