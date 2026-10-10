import Image from "next/image";
import Link from "next/link";
import HeroDate from "./HeroDate";

export default function Hero() {
  return (
    <section className="bg-white rounded-2xl border border-base-300 px-5 md:px-6 py-3 my-3 grid md:grid-cols-2 gap-3 items-start">
      <div className="pt-0">
        <HeroDate />

        <h1 className="text-2xl md:text-4xl font-bold mt-1.5 leading-tight">
          আজকের বাজারের দাম <span className="text-primary">এক নজরে</span>
        </h1>

        <p className="mt-1.5 text-xs md:text-sm text-base-content/70">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, সহজ, সুবিধাজনক।
        </p>

        <Link
          href="#সব-পণ্য"
          className="btn btn-primary btn-sm mt-2.5"
        >
          সব পণ্য দেখুন
        </Link>
      </div>

      <div className="relative aspect-square max-w-[200px] md:max-w-[260px] mx-auto md:ml-auto w-full">
        <Image
          src="/bazar-hero.png"
          alt="বাজারের সবজি"
          fill
          sizes="(max-width: 768px) 100vw, 260px"
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
}