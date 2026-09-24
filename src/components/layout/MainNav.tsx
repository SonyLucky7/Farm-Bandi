"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutGrid, Flame, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "Fruits & Veg", href: "/category/fruits-vegetables" },
  { label: "Basmati & Rice", href: "/category/rice-rice-products" },
  { label: "Dals & Pulses", href: "/category/beans-dals-pulses" },
  { label: "Spices & Masalas", href: "/category/spices" },
  { label: "Dry Fruits & Nuts", href: "/category/dry-fruits-nuts-seeds" },
  { label: "Sweets & Snacks", href: "/category/sweets-snacks" },
  { label: "Combos & Packs", href: "/combos", badge: "Save £15", badgeColor: "bg-emerald-100 text-[#155E40]" },
  { label: "Deals & Offers", href: "/offers", icon: Flame, badge: "Hot", badgeColor: "bg-amber-100 text-amber-900" },
  { label: "Festival Hampers", href: "/festival" },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <div className="w-full py-1.5">
      {/* Category Links Ribbon - Horizontal flex with no scrollbar */}
      <div className="flex items-center justify-between gap-1 xl:gap-2 overflow-x-auto no-scrollbar py-0.5 w-full">
        {/* All Categories Button */}
        <Link
          href="/categories"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#155E40] text-white font-bold text-xs hover:bg-[#0F4932] transition-colors flex-shrink-0 shadow-2xs mr-1"
        >
          <LayoutGrid size={14} className="text-emerald-200" />
          <span>All Categories</span>
        </Link>

        {/* 10 Direct Category Links */}
        <div className="flex items-center gap-0.5 xl:gap-1 flex-1 justify-between overflow-x-auto no-scrollbar">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-1 px-1.5 xl:px-2 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0",
                  isActive
                    ? "text-[#155E40] bg-[#EBF5F0] font-bold"
                    : "text-gray-700 hover:text-[#155E40] hover:bg-gray-100/80"
                )}
              >
                {Icon && <Icon size={13} className="text-[#E76F51] flex-shrink-0" />}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={cn("text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase flex-shrink-0", item.badgeColor)}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
