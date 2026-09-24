"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Flame, Package, User } from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Categories", href: "/categories", icon: Grid },
  { label: "Offers", href: "/offers", icon: Flame, badge: "Hot" },
  { label: "Orders", href: "/account/orders", icon: Package },
  { label: "Account", href: "/account", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 h-[56px] pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      <div className="grid grid-cols-5 h-full">
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href) && item.href !== "/");

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors relative py-1",
                isActive
                  ? "text-[#155E40] font-bold"
                  : "text-gray-500 hover:text-[#155E40]"
              )}
            >
              <div className="relative flex flex-col items-center">
                <Icon
                  size={18}
                  className={cn(
                    "transition-transform",
                    isActive ? "text-[#155E40] scale-105" : "text-gray-500"
                  )}
                  fill={isActive ? "currentColor" : "none"}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-3.5 bg-[#E76F51] text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full uppercase leading-none border border-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] mt-1 leading-none tracking-tight">{item.label}</span>
              {/* Active Indicator Dot */}
              {isActive && (
                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#155E40]"></span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
