import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonLoading() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[150px] w-[350px] rounded-xl bg-secondary" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-secondary" />
        <Skeleton className="h-4 w-[200px] bg-secondary" />
      </div>
    </div>
  );
}
