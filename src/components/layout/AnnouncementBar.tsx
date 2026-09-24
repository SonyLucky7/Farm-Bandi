"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, Truck, Tag, Phone } from "lucide-react";
import Link from "next/link";

const PERKS = [
  { icon: Truck, text: "Free Next-Day UK Delivery on orders over £50" },
  { icon: Tag, text: "Use code WELCOME10 for 10% OFF your first order" },
  { icon: Sparkles, text: "Direct from 450+ Indian farmers • 100% Purity guaranteed" },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("announcementDismissed");
    if (isDismissed) setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PERKS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const ActiveIcon = PERKS[index].icon;

  return (
    <div className="bg-[#0F3E2A] text-white text-xs font-medium py-2 px-4 border-b border-emerald-900/60 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Trust Statement */}
        <div className="hidden lg:flex items-center gap-2 text-emerald-200/90 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Farm Bandi UK • Direct Indian Agro Harvest</span>
        </div>

        {/* Center Rotating Perks */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-white">
          <ActiveIcon size={14} className="text-amber-300 flex-shrink-0" />
          <span className="tracking-wide">{PERKS[index].text}</span>
          <Link href="/offers" className="underline hover:text-amber-300 font-semibold ml-1 hidden sm:inline">
            Shop Deals
          </Link>
        </div>

        {/* Right Info & Dismiss */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-3 text-emerald-100 text-xs">
            <span className="flex items-center gap-1 font-medium">
              <Phone size={12} className="text-emerald-300" />
              <span>0800 246 1890</span>
            </span>
            <span className="text-emerald-400/60">|</span>
            <span className="font-semibold text-amber-200">🇬🇧 GBP (£)</span>
          </div>

          <button
            onClick={() => {
              sessionStorage.setItem("announcementDismissed", "true");
              setIsVisible(false);
            }}
            className="text-emerald-300 hover:text-white p-0.5 rounded transition-colors"
            aria-label="Dismiss banner"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
