import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="h-64 bg-white rounded-2xl border border-base-300 animate-pulse my-6" />
      <div className="h-6 w-48 bg-base-200 rounded animate-pulse my-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}