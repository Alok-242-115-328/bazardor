import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <div className="text-center max-w-md">
        <p className="text-7xl mb-4">🔍</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-base-content/60 mb-6">
          আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।
        </p>
        <Link href="/" className="btn btn-primary">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}