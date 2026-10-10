const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function hit<T>(path: string): Promise<T> {
  let lastErr: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
      if (!res.ok) throw new Error(`HTTP ${res.status} @ ${base}`);
      return (await res.json()) as T;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};



export type Product = {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  unit: string;          // raw: "kg" | "litre" | "dozen" | "piece"
  unitLabel: string;     // display: "প্রতি কেজি" ...
  price: number;         // from today
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  changePercent: number;
  changeDir: "up" | "down" | "flat";
  category: string;
  categoryName: string;
  categoryIcon: string;
  markets: Market[];
};

const UNIT_LABELS: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  gram: "প্রতি গ্রাম",
};

export function normalizeProduct(p: any): Product {
  const rawUnit = String(p.unit ?? "kg").toLowerCase();
  const pct = Number(p.change?.pct ?? p.changePercent ?? 0);
  const dirRaw = p.change?.dir;
  const changeDir: "up" | "down" | "flat" =
    dirRaw === "up" || dirRaw === "down" || dirRaw === "flat"
      ? dirRaw
      : pct > 0
      ? "up"
      : pct < 0
      ? "down"
      : "flat";

  return {
    id: String(p.id ?? ""),
    slug: String(p.slug ?? p.id ?? ""),
    name: p.nameBn ?? p.name ?? "—",
    emoji: p.image ?? p.emoji ?? p.icon ?? "🛒",
    unit: rawUnit,
    unitLabel: UNIT_LABELS[rawUnit] ?? "প্রতি কেজি",
    price: Number(p.today ?? p.price ?? 0),
    yesterday: p.yesterday != null ? Number(p.yesterday) : undefined,
    lastWeek: p.lastWeek != null ? Number(p.lastWeek) : undefined,
    lastMonth: p.lastMonth != null ? Number(p.lastMonth) : undefined,
    changePercent: pct,
    changeDir,
    category: String(p.category ?? ""),
    categoryName: p.categoryNameBn ?? p.categoryName ?? "",
    categoryIcon: p.categoryIcon ?? "🛒",
    markets: Array.isArray(p.markets) ? p.markets : [],
  };
}

function pluckArray(data: any, keys: string[]): any[] {
  if (Array.isArray(data)) return data;
  for (const k of keys) if (Array.isArray(data?.[k])) return data[k];
  return [];
}

export async function getProducts(): Promise<Product[]> {
  const data = await hit<any>("/products");
  return pluckArray(data, ["products", "data", "items"]).map(normalizeProduct);
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const data = await hit<any>(`/products?category=${encodeURIComponent(slug)}`);
  return pluckArray(data, ["products", "data", "items"]).map(normalizeProduct);
}



export async function getProduct(slugOrId: string): Promise<Product | null> {
  try {
    // সব product লিস্ট এনে slug বা id দিয়ে খুঁজি
    // (কারণ API কখনো slug সাপোর্ট করে, কখনো করে না)
    const all = await getProducts();
    const found = all.find(
      (p) => p.slug === slugOrId || p.id === slugOrId
    );
    if (found) return found;

    // Fallback: সরাসরি endpoint-এ চেষ্টা
    const data = await hit<any>(`/products/${slugOrId}`);
    const raw = data.product ?? data.data ?? data;
    return normalizeProduct(raw);
  } catch {
    return null;
  }
}






export type Category = {
  id: string;
  slug: string;
  name: string;
  icon: string;
};

export async function getCategories(): Promise<Category[]> {
  const data = await hit<any>("/categories");
  const arr = pluckArray(data, ["categories", "data", "items"]);
  return arr.map((c: any) => ({
    id: String(c.id ?? c.slug),
    slug: String(c.slug ?? c.id),
    name: c.nameBn ?? c.name ?? c.title ?? "—",
    icon: c.icon ?? c.emoji ?? "🛒",
  }));
}