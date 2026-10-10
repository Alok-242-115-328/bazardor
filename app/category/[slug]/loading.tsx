import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="h-10 w-48 bg-base-200 rounded animate-pulse mt-4 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}