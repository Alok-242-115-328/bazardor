import { getProducts, getCategories } from "@/lib/api";
import Navbar from "@/components/Navbar";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Navbar categories={categories} products={products} />
      <main className="min-h-[70vh]">{children}</main>
    </>
  );
}