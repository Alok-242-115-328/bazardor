import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "প্রতিদিনের বাজারদর, এক নজরে।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" data-theme="bazardor">
      <body className="font-bangla bg-base-200 text-base-content">
        {children}
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}