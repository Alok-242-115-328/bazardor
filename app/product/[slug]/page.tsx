import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts, getCategories } from "@/lib/api";
import { formatBn, formatChangeBn, formatBnDiff } from "@/lib/bn";
import Navbar from "@/components/Navbar";
import MarketTable from "@/components/MarketTable";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, products, categories] = await Promise.all([
    getProduct(slug),
    getProducts(),
    getCategories(),
  ]);

  if (!product) notFound();

  // Min / Max / Avg হিসাব
  const mins = product.markets.map((m) => m.min);
  const maxs = product.markets.map((m) => m.max);
  const minPrice = mins.length ? Math.min(...mins) : product.price;
  const maxPrice = maxs.length ? Math.max(...maxs) : product.price;
  const avgPrice = product.markets.length
    ? product.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) /
      product.markets.length
    : product.price;

  // দাম পার্থক্য
  const priceDiff = product.yesterday
    ? Math.abs(product.price - product.yesterday)
    : 0;

  const up = product.changeDir === "up";
  const down = product.changeDir === "down";
  const changeArrow = up ? "▲" : down ? "▼" : "—";
  const changeColor = up
    ? "text-secondary"
    : down
    ? "text-primary"
    : "text-base-content/50";

  // Unit short for display
  const unitShort = product.unitLabel.replace("প্রতি ", "");

  return (
    <>
      <Navbar categories={categories} products={products} />

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* ── Breadcrumb ── */}
        <nav className="text-xs text-base-content/60 mb-4 flex items-center gap-1 flex-wrap">
          <Link href="/" className="hover:text-primary">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-primary"
          >
            {product.categoryName}
          </Link>
          <span>›</span>
          <span className="text-base-content font-medium">{product.name}</span>
        </nav>

        {/* ═══ CARD ১ — Product Header ═══ */}
        <div className="bg-white rounded-2xl border border-base-300 p-5 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* বাঁয়ে — emoji + নাম + description */}
            <div className="flex-1 flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-base-200 grid place-items-center text-4xl shrink-0">
                {product.emoji}
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {product.name}
                </h1>
                <p className="text-sm text-base-content/60 mt-0.5">
                  {product.unitLabel} • {product.categoryName}
                </p>
                {priceDiff > 0 && (
                  <p className="text-xs text-base-content/70 mt-1">
                    গতকালের তুলনায় আজ দাম{" "}
                    {up ? (
                      <span className="text-secondary font-medium">
                        বেড়েছে • {formatBnDiff(priceDiff)} টাকা
                      </span>
                    ) : down ? (
                      <span className="text-primary font-medium">
                        কমেছে • {formatBnDiff(priceDiff)} টাকা
                      </span>
                    ) : (
                      <span>একই আছে</span>
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* ডানে — Today price box */}
            <div className="bg-base-200/70 border border-base-300 rounded-xl px-5 py-3 md:min-w-[170px] text-center md:text-left">
              <p className="text-xs text-base-content/60 mb-1">আজকের দাম</p>
              <p className="text-3xl md:text-4xl font-bold tabular-nums leading-none">
                {formatBn(product.price)}
              </p>
              <p className="text-xs text-base-content/60 mt-1">
                টাকা / {unitShort}
              </p>
              <p className={`text-sm font-semibold mt-2 ${changeColor}`}>
                {changeArrow} {formatChangeBn(product.changePercent)}%
              </p>
            </div>
          </div>
        </div>

        {/* ═══ CARD ২ — দামের সারসংক্ষেপ ═══ */}
        <div className="bg-white rounded-2xl border border-base-300 p-5 md:p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* সর্বনিম্ন */}
            <div className="border border-base-300 rounded-xl p-4">
              <p className="text-xs text-base-content/60 mb-2">সর্বনিম্ন দাম</p>
              <p className="text-2xl font-bold text-primary tabular-nums mb-1">
                {formatBn(minPrice)} টাকা
              </p>
              <p className="text-xs text-base-content/60">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* সর্বোচ্চ */}
            <div className="border border-base-300 rounded-xl p-4">
              <p className="text-xs text-base-content/60 mb-2">সর্বোচ্চ দাম</p>
              <p className="text-2xl font-bold text-secondary tabular-nums mb-1">
                {formatBn(maxPrice)} টাকা
              </p>
              <p className="text-xs text-base-content/60">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* গড় */}
            <div className="border border-base-300 rounded-xl p-4">
              <p className="text-xs text-base-content/60 mb-2">গড় দাম</p>
              <p className="text-2xl font-bold tabular-nums mb-1">
                {formatBn(Math.round(avgPrice))} টাকা
              </p>
              <p className="text-xs text-base-content/60">
                {unitShort}-এর হিসাব
              </p>
            </div>
          </div>
        </div>

        {/* ═══ CARD ৩ — বাজারভিত্তিক আজকের দাম ═══ */}
        <div className="bg-white rounded-2xl border border-base-300 p-5 md:p-6 mb-6">
          <h2 className="text-xl font-bold mb-1">বাজারভিত্তিক আজকের দাম</h2>
          <p className="text-sm text-base-content/60 mb-5">
            বিভিন্ন বাজারে {product.name}-এর সর্বনিম্ন, সর্বোচ্চ ও গড় দাম
          </p>

          <MarketTable markets={product.markets} />
        </div>

        {/* ═══ CARD ৪ — একই ক্যাটাগরির পণ্য ═══ */}
        {products.filter(
          (p) => p.category === product.category && p.id !== product.id
        ).length > 0 && (
          <div className="bg-white rounded-2xl border border-base-300 p-5 md:p-6">
            <h2 className="text-lg font-bold mb-4">
              একই ক্যাটাগরির আরও পণ্য
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {products
                .filter(
                  (p) =>
                    p.category === product.category && p.id !== product.id
                )
                .slice(0, 8)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    className="p-3 rounded-xl border border-base-300 hover:border-primary hover:bg-base-200/40 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{p.emoji}</span>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{p.name}</p>
                        <p className="text-xs text-base-content/60 tabular-nums">
                          {formatBn(p.price)} ৳
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}