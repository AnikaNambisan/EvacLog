/**
 * Skeleton loading placeholders.
 * Uses the `.skeleton` shimmer animation from globals.css.
 */

interface SkeletonProps {
  className?: string;
}

/** Generic rectangular skeleton */
export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`skeleton ${className}`} />;
}

/** Skeleton for a dashboard stat card (Overview / Calculations) */
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 sm:p-6 lg:p-8">
      <Skeleton className="h-4 w-20 mb-6" />
      <Skeleton className="h-3 w-6 mb-2" />
      <Skeleton className="h-9 w-36 mb-2" />
      <Skeleton className="h-3 w-24" />
      <div className="mt-6 pt-5 border-t border-neutral-100 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-3 w-14" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Skeleton for a list card (Recent Items) */
export function ListCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 sm:p-6 lg:p-8">
      <Skeleton className="h-4 w-24 mb-5" />
      <div className="space-y-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-md shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-4 w-3/4 mb-1.5" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-4 w-16 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Skeleton for a checklist item row */
export function ChecklistItemSkeleton() {
  return (
    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-neutral-200">
      <Skeleton className="w-6 h-6 rounded-md shrink-0" />
      <div className="flex-1">
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-5 w-14 rounded-full shrink-0" />
    </div>
  );
}

/** Full dashboard skeleton with 3-column grid */
export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[280px_1fr_280px] gap-3 sm:gap-4 md:gap-5">
      <CardSkeleton />
      <ListCardSkeleton />
      <CardSkeleton />
    </div>
  );
}
