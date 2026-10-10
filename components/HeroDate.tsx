"use client";

import { useEffect, useState } from "react";
import { bnDate } from "@/lib/bn";

export default function HeroDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(bnDate());
  }, []);

  return (
    <span className="inline-block self-start bg-primary/10 text-primary font-medium text-xs px-3 py-1 rounded-full">
      {date || "লোড হচ্ছে..."}
    </span>
  );
}