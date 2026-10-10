export default function SkeletonCard() {
  return (
    <div className="card bg-white border border-base-300">
      <div className="card-body p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-base-200 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-base-200 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-base-200 rounded animate-pulse w-1/2" />
          </div>
        </div>
        <div className="border-t border-dashed border-base-300 my-3"></div>
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <div className="h-3 w-16 bg-base-200 rounded animate-pulse" />
            <div className="h-5 w-20 bg-base-200 rounded animate-pulse" />
          </div>
          <div className="h-6 w-14 bg-base-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}