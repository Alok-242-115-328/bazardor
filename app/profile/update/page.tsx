"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ArrowLeft, LogOut } from "lucide-react";
import { useSession, updateUser, signOut } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রোফাইল আপডেট করতে সাইন ইন করুন");
      router.push("/signin?from=/profile/update");
    }
    if (session?.user?.name && !name) setName(session.user.name);
  }, [isPending, session, router, name]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }
    if (name.trim() === session?.user?.name) {
      toast.error("নাম আগের মতোই আছে");
      return;
    }

    setSaving(true);
    const { error } = await updateUser({ name: name.trim() });

    if (error) {
      setSaving(false);
      toast.error(error.message ?? "আপডেট ব্যর্থ হয়েছে");
      return;
    }

    await refetch();
    setSaving(false);
    toast.success("প্রোফাইল আপডেট হয়েছে");

    setTimeout(() => {
      router.push("/profile");
      router.refresh();
    }, 150);
  }

  async function handleSignOut() {
    await signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  if (isPending || !session) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  const user = session.user;
  const initial = user.name?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <Link
        href="/profile"
        className="inline-flex items-center gap-1 text-sm text-base-content/60 hover:text-primary mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> প্রোফাইলে ফিরে যান
      </Link>

      <h1 className="text-3xl font-bold mb-1">তথ্য আপডেট করুন</h1>
      <p className="text-base-content/60 text-sm mb-6">
        আপনার নাম পরিবর্তন করুন
      </p>

      {/* ═══ User Card ═══ */}
      <div className="bg-white rounded-2xl border border-base-300 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary text-white grid place-items-center text-xl font-bold shrink-0">
            {initial}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold truncate">{user.name}</h2>
            <p className="text-base-content/60 text-sm truncate">
              {user.email}
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="btn btn-outline btn-sm gap-2 shrink-0"
          >
            <LogOut className="w-4 h-4" />
            সাইন আউট
          </button>
        </div>
      </div>

      {/* ═══ Update Form ═══ */}
      <div className="bg-white rounded-2xl border border-base-300 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">নাম :</span>
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="আপনার নাম"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary w-full"
          >
            {saving ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "আপডেট"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}