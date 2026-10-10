"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const OPTIONS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "default";

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value === "default") params.delete("sort");
    else params.set("sort", value);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-base-content/70 shrink-0">সাজান:</span>
      <div className="relative">
        <select
          value={current}
          onChange={onChange}
          className="select select-bordered select-sm pr-8 appearance-none cursor-pointer"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </label>
  );
}