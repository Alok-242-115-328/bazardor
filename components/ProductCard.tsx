"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import type { Product } from "@/lib/api";
import { formatBn, formatChangeBn } from "@/lib/bn";
import { useSession } from "@/lib/auth-client";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { slug, emoji, name, unitLabel, price, changePercent, changeDir } = product;

  const colorCls =
    changeDir === "up"
      ? "text-secondary bg-red-50"
      : changeDir === "down"
      ? "text-primary bg-green-50"
      : "text-gray-500 bg-gray-100";
  const arrow = changeDir === "up" ? "▲" : changeDir === "down" ? "▼" : "—";

  function handleClick() {
    if (!session) {
      toast.error("বিস্তারিত দাম দেখতে সাইন ইন করুন");
      router.push(`/signin?from=/product/${slug}`);
      return;
    }
    router.push(`/product/${slug}`);
  }

  return (
    <button
      onClick={handleClick}
      className="card bg-white border border-base-300 hover:shadow-md hover:border-primary/40 transition-all text-left w-full cursor-pointer"
    >
      <div className="card-body p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-base-200 grid place-items-center text-2xl shrink-0">
            {emoji}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-base truncate">{name}</h3>
            <p className="text-xs text-base-content/60">{unitLabel}</p>
          </div>
        </div>

        <div className="border-t border-dashed border-base-300 my-3"></div>

        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-lg font-bold">{formatBn(price)} টাকা</p>
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-md ${colorCls}`}>
            {arrow} {formatChangeBn(changePercent)}%
          </span>
        </div>
      </div>
    </button>
  );
}