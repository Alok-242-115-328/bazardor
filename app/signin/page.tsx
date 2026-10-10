"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn.email({ email, password });

    setLoading(false);

    if (error) {
      toast.error(error.message ?? "ভুল ইমেইল বা পাসওয়ার্ড");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(from);
    router.refresh();
  }

  async function handleSocial(provider: "google" | "github") {
    setSocialLoading(provider);
    const { error } = await signIn.social({ provider, callbackURL: from });
    if (error) {
      setSocialLoading(null);
      const label = provider === "google" ? "Google" : "GitHub";
      toast.error(`${label} লগইন ব্যর্থ হয়েছে`);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">সাইন ইন</h1>
        <p className="text-base-content/60 mt-2 text-sm">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl border border-base-300 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label pb-1">
              <span className="label-text font-medium">ইমেইল</span>
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label pb-1">
              <span className="label-text font-medium">পাসওয়ার্ড</span>
            </label>
            <input
              type="password"
              required
              minLength={8}
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "সাইন ইন"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-base-300" />
          <span className="text-xs text-base-content/60">অথবা</span>
          <div className="flex-1 h-px bg-base-300" />
        </div>

        {/* Social buttons — 2 column */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleSocial("google")}
            disabled={socialLoading !== null}
            className="btn btn-outline h-auto py-2 px-3 gap-1.5 normal-case font-normal text-xs leading-tight whitespace-normal"
          >
            {socialLoading === "google" ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className="shrink-0"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                  />
                </svg>
                <span>
                  Google দিয়ে
                  <br />
                  চালিয়ে যান
                </span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleSocial("github")}
            disabled={socialLoading !== null}
            className="btn btn-outline h-auto py-2 px-3 gap-1.5 normal-case font-normal text-xs leading-tight whitespace-normal"
          >
            {socialLoading === "github" ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="shrink-0"
                >
                  <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
                </svg>
                <span>
                  GitHub দিয়ে
                  <br />
                  চালিয়ে যান
                </span>
              </>
            )}
          </button>
        </div>

        <p className="text-center text-sm mt-5">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href={from !== "/" ? `/signup?from=${from}` : "/signup"}
            className="text-primary font-medium hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 text-sm text-base-content/60 hover:text-primary"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}