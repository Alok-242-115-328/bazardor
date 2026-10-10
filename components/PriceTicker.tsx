import { formatBn, formatChangeBn, unitShort } from "@/lib/bn";
import type { Product } from "@/lib/api";

function Item({ p }: { p: Product }) {
  const color =
    p.changeDir === "up"
      ? "text-secondary"
      : p.changeDir === "down"
      ? "text-primary"
      : "text-gray-500";
  const arrow =
    p.changeDir === "up" ? "▲" : p.changeDir === "down" ? "▼" : "—";

  return (
    <span className="inline-flex items-center gap-2 px-5 py-2 text-sm whitespace-nowrap">
      <span className="text-base">{p.emoji}</span>
      <span className="font-medium">{p.name}</span>
      <span className="text-base-content/60">
        {formatBn(p.price)} টাকা/{unitShort(p.unit)}
      </span>
      <span className={`font-semibold ${color}`}>
        {arrow} {formatChangeBn(p.changePercent)}%
      </span>
    </span>
  );
}

export default function PriceTicker({ products }: { products: Product[] }) {
  if (!products.length) return null;
  const doubled = [...products, ...products];
  return (
    <div className="bg-base-200 border-t border-base-300 overflow-hidden">
      <div className="marquee-mask">
        <div className="ticker-track inline-flex animate-ticker will-change-transform">
          {doubled.map((p, i) => (
            <Item key={i} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}