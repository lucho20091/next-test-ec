import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Skeleton className="h-10 w-1/2 mx-auto mb-4" /> {/* Title */}
      <Skeleton className="h-6 w-3/4 mx-auto mb-12" /> {/* Subtitle */}

      <Card className="p-8 mb-12">
        <Skeleton className="h-8 w-1/4 mb-4" /> {/* Our Story title */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </Card>

      <Skeleton className="h-8 w-1/3 mx-auto mb-8" /> {/* Why Choose Us title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start gap-4">
              <Skeleton className="w-12 h-12 rounded-lg" /> {/* Icon */}
              <div className="flex-1">
                <Skeleton className="h-6 w-3/4 mb-2" /> {/* Feature title */}
                <Skeleton className="h-4 w-full" /> {/* Feature description */}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-8">
        <Skeleton className="h-8 w-1/4 mx-auto mb-4" /> {/* Our Mission title */}
        <Skeleton className="h-4 w-full mx-auto" /> {/* Mission description */}
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </Card>

      <div className="mt-12 text-center">
        <Skeleton className="h-8 w-1/4 mx-auto mb-4" /> {/* Get In Touch title */}
        <Skeleton className="h-4 w-1/2 mx-auto mb-6" /> {/* Get In Touch description */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Card className="p-4 flex-1 max-w-xs">
            <Skeleton className="h-4 w-1/3 mb-1" /> {/* Email label */}
            <Skeleton className="h-4 w-2/3" /> {/* Email value */}
          </Card>
          <Card className="p-4 flex-1 max-w-xs">
            <Skeleton className="h-4 w-1/3 mb-1" /> {/* Phone label */}
            <Skeleton className="h-4 w-2/3" /> {/* Phone value */}
          </Card>
        </div>
      </div>
    </div>
  );
}