import type { Metadata } from "next";
import { Anek_Bangla, Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import "./globals.css";

// Body-র জন্য (Hero, Product cards)
const anek = Anek_Bangla({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-bengali",
  display: "swap",
});

// শুধু Navbar-এর জন্য
const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "প্রতিদিনের বাজারদর, এক নজরে।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="bazardor">
      <body
        className={`${anek.variable} ${hind.variable} font-bangla bg-base-200 text-base-content`}
      >
        {children}
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}