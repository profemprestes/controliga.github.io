import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="space-y-8 p-4">
       <Skeleton className="h-8 w-1/3" />

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Skeleton className="h-40 rounded-lg" />
         <Skeleton className="h-40 rounded-lg" />
       </div>

       <Skeleton className="h-64 rounded-lg" />
       <Skeleton className="h-56 rounded-lg" />
    </div>
  )
}
