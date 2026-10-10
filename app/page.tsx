import Link from "next/link";
import { getProducts, getCategories } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const risers = [...products]
    .filter((p) => p.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => p.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 6);

  return (
    <>
      <Navbar categories={categories} products={products} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Hero />

        {risers.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-secondary">
                <span className="mr-2">▲</span> আজ দাম বেড়েছে
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {risers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {fallers.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-primary">
                <span className="mr-2">▼</span> আজ দাম কমেছে
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fallers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

 <section id="সব-পণ্য" className="mt-12 scroll-mt-40">
  <div className="mb-4">
    <h2 className="text-xl md:text-2xl font-bold">সব পণ্য</h2>
    <p className="text-sm text-base-content/60 mt-1">
      আজকের সব পণ্যের দাম
    </p>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {products.map((p) => (
      <ProductCard key={p.id} product={p} />
    ))}
  </div>
</section>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🫙</p>
            <h2 className="text-xl font-bold mb-2">এখনো কোনো পণ্য নেই</h2>
            <Link href="/" className="btn btn-primary mt-4">
              হোম পেজে ফিরে যান
            </Link>
          </div>
        )}
      </main>
    </>
  );
}