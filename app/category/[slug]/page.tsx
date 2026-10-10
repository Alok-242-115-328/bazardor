import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProductsByCategory,
  getCategories,
  getProducts,
} from "@/lib/api";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const [categories, allProducts, categoryProducts] = await Promise.all([
    getCategories(),
    getProducts(),
    getProductsByCategory(slug),
  ]);

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const sorted = [...categoryProducts];
  if (sort === "asc") sorted.sort((a, b) => a.price - b.price);
  if (sort === "desc") sorted.sort((a, b) => b.price - a.price);

  return (
    <>
      <Navbar categories={categories} products={allProducts} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </h1>
          <SortDropdown />
        </div>

        {sorted.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🫙</p>
            <h2 className="text-xl font-bold mb-2">
              এই ক্যাটাগরিতে এখনো কোনো পণ্য নেই
            </h2>
            <p className="text-base-content/60 mb-6">
              অনুগ্রহ করে অন্য ক্যাটাগরি দেখুন
            </p>
            <Link href="/" className="btn btn-primary">
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sorted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}