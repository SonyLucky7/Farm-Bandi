"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, Leaf, Sparkles, Clock, ArrowUpRight } from "lucide-react";

export default function PromoBanners() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-6 sm:py-8 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Card 1: Flash Deals with Countdown */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-rose-500/10 border border-amber-200/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E76F51] text-white shadow-xs">
                  <Flame size={14} className="animate-pulse" />
                  <span>Flash Sale</span>
                </span>

                {/* Digital Countdown Timer */}
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-gray-700 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs">
                  <Clock size={12} className="text-[#E76F51]" />
                  <span>{String(timeLeft.hours).padStart(2, "0")}h</span>
                  <span>:</span>
                  <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>
                  <span>:</span>
                  <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 mb-2 leading-tight">
                Up to 25% OFF <br />
                <span className="text-gray-600 text-sm font-semibold">Everyday Pantry Staples</span>
              </h3>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed max-w-xs">
                Hand-picked discounts on fresh atta, toor dal, basmati rice, and cold-pressed sesame oil.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-amber-200/60 mt-auto">
              <Link
                href="/offers"
                className="group-hover:translate-x-1 inline-flex items-center gap-2 text-xs font-bold text-[#E76F51] transition-transform"
              >
                <span>Shop Flash Offers</span>
                <ArrowRight size={14} />
              </Link>
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-amber-600">
                <Flame size={20} />
              </div>
            </div>
          </div>

          {/* Card 2: 100% Single-Origin Organics */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600/10 via-teal-600/5 to-emerald-700/10 border border-emerald-300/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#155E40] text-white shadow-xs">
                  <Leaf size={14} />
                  <span>Farm Direct</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  Zero Middlemen
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 mb-2 leading-tight">
                100% Pure Organics <br />
                <span className="text-gray-600 text-sm font-semibold">Single-Origin Harvests</span>
              </h3>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed max-w-xs">
                Wood-pressed groundnut & sesame oils, stone-ground flours, and naturally unpolished pulses.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-emerald-200/60 mt-auto">
              <Link
                href="/shop?organic=true"
                className="group-hover:translate-x-1 inline-flex items-center gap-2 text-xs font-bold text-[#155E40] transition-transform"
              >
                <span>Explore Organics</span>
                <ArrowRight size={14} />
              </Link>
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#155E40]">
                <Leaf size={20} />
              </div>
            </div>
          </div>

          {/* Card 3: Value Combos & Family Kits */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600/10 via-yellow-600/5 to-amber-700/10 border border-amber-300/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D4A373] text-gray-950 shadow-xs">
                  <Sparkles size={14} />
                  <span>Value Packs</span>
                </span>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                  Save up to £15
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 mb-2 leading-tight">
                Monthly Ration Kits <br />
                <span className="text-gray-600 text-sm font-semibold">&amp; Festive Sweet Boxes</span>
              </h3>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed max-w-xs">
                Curated family bundles, pooja celebration hampers, and authentic South Indian breakfast essentials.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-amber-200/60 mt-auto">
              <Link
                href="/combos"
                className="group-hover:translate-x-1 inline-flex items-center gap-2 text-xs font-bold text-amber-900 transition-transform"
              >
                <span>Browse Combos</span>
                <ArrowRight size={14} />
              </Link>
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-amber-700">
                <Sparkles size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
