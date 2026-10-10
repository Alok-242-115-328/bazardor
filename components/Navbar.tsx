"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogIn, User as UserIcon, LogOut, ChevronDown } from "lucide-react";
import { toast } from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";
import { bnDate } from "@/lib/bn";
import type { Category, Product } from "@/lib/api";
import PriceTicker from "./PriceTicker";

export default function Navbar({
  categories = [],
  products = [],
}: {
  categories?: Category[];
  products?: Product[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [date, setDate] = useState("");
  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => setDate(bnDate()), []);

  async function handleSignOut() {
    await signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-base-300 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">



        <Link href="/" className="flex items-center gap-3">
  {/* সবুজ background সহ লোগো */}
  <div className="w-11 h-11 rounded-2xl bg-primary grid place-items-center shrink-0 shadow-sm">

    <Image
      src="/logo-icon.png"
      alt="বাজার দর"
      width={28}
      height={28}
      className="rounded-md brightness-0 invert"
    />
  </div>

  <div className="leading-tight">
  <div className="text-xl font-bold text-base-content">বাজার দর</div>
    <div className="text-xs text-base-content/60">{date}</div>
  </div>
</Link>



        {isPending ? (
          <div className="w-24 h-9 bg-base-200 rounded-lg animate-pulse" />
        ) : user ? (
          <div className="dropdown dropdown-end">


<button className="btn btn-ghost btn-sm gap-2">
  {user.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={user.image}
      alt={user.name ?? ""}
      referrerPolicy="no-referrer"
      className="w-8 h-8 rounded-full object-cover border border-base-300"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  ) : (
    <div className="w-8 h-8 rounded-full bg-primary text-white grid place-items-center text-sm">
      {user.name?.[0]?.toUpperCase() ?? "U"}
    </div>
  )}
  <span className="hidden sm:inline font-medium">
    {user.name}
  </span>
  <ChevronDown className="w-4 h-4" />
</button>


            <ul className="dropdown-content menu bg-white rounded-box shadow-lg mt-2 w-56 p-2 border border-base-300 z-50">
              <li className="menu-title text-xs">
                <span className="text-base-content">{user.name}</span>
                <span className="text-xs text-base-content/60">
                  {user.email}
                </span>
              </li>
              <li>
                <Link href="/profile">
                  <UserIcon className="w-4 h-4" /> আমার প্রোফাইল
                </Link>
              </li>

             <li>
  <button
    onClick={handleSignOut}
    className="text-red-600 hover:text-red-700"
  >
    <LogOut className="w-4 h-4" /> সাইন আউট
  </button>
</li>


            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/signin" className="btn btn-ghost btn-sm gap-1">
              <LogIn className="w-4 h-4" /> সাইন ইন
            </Link>
            <Link href="/signup" className="btn btn-primary btn-sm">
              সাইন আপ
            </Link>
          </div>
        )}
      </div>

      <div className="border-t border-base-300">
        <div className="max-w-6xl mx-auto px-4 flex gap-2 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                  active
                    ? "bg-secondary text-white border-secondary"
                    : "bg-white border-base-300 hover:border-primary text-base-content/80"
                }`}
              >
                <span className="mr-1">{c.icon}</span>
                {c.name}
              </Link>
            );
          })}
        </div>
      </div>

      <PriceTicker products={products} />
    </header>
  );
}