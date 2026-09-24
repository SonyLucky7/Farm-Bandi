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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200/90 h-[58px] pb-safe shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
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
              <div className="relative">
                <Icon
                  size={20}
                  className={cn(
                    "transition-transform",
                    isActive ? "text-[#155E40] scale-105" : "text-gray-500"
                  )}
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-4 bg-[#E76F51] text-white text-[8px] font-extrabold px-1 py-0.2 rounded-full uppercase leading-none">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 leading-none tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
