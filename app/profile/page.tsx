"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { LogOut } from "lucide-react";
import { useSession, signOut, updateUser } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রোফাইল দেখতে সাইন ইন করুন");
      router.push("/signin?from=/profile");
    }
    if (session?.user?.name && !name) setName(session.user.name);
  }, [isPending, session, router, name]);

  async function handleSignOut() {
    await signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  async function handleUpdate(e: React.FormEvent) {
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
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* ── Header ── */}
      <h1 className="text-3xl font-bold mb-1">আমার প্রোফাইল</h1>
      <p className="text-base-content/60 text-sm mb-6">
        আপনার অ্যাকাউন্টের তথ্য দেখুন
      </p>

      {/* ═══ Card ১ — User Info ═══ */}
      <div className="bg-white rounded-2xl border border-base-300 p-6 mb-6">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element



<img
  src={user.image}
  alt={user.name ?? ""}
  referrerPolicy="no-referrer"
  className="w-16 h-16 rounded-full object-cover border border-base-300 shrink-0"
  onError={(e) => {
    (e.target as HTMLImageElement).style.display = "none";
  }}
/>


          ) : (
            <div className="w-16 h-16 rounded-full bg-primary text-white grid place-items-center text-2xl font-bold shrink-0">
              {initial}
            </div>
          )}

          {/* Name + Email */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold truncate">{user.name}</h2>
            <p className="text-base-content/60 text-sm truncate">
              {user.email}
            </p>
          </div>

          {/* Red Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="btn btn-sm gap-2 border border-red-300 text-red-600 bg-white hover:bg-red-50 hover:border-red-400"
          >
            <LogOut className="w-4 h-4" />
            সাইন আউট
          </button>
        </div>
      </div>

      {/* ═══ Card ২ — তথ্য (Update Form) ═══ */}
      <div className="bg-white rounded-2xl border border-base-300 p-6">
        <h3 className="font-semibold text-lg mb-5">তথ্য</h3>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="label pb-1">
              <span className="label-text font-medium">নাম</span>
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