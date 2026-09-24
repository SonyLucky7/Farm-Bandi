"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Heart, HelpCircle, PhoneCall, Sparkles } from "lucide-react";
import MainNav from "./MainNav";
import LocationSelector from "./LocationSelector";
import CartIndicator from "./CartIndicator";
import SearchDialog from "./SearchDialog";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/stores/wishlist";
import { useMounted } from "@/hooks/useMounted";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const mounted = useMounted();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const rawWishlistCount = useWishlistStore((state) => state.getCount());
  const wishlistCount = mounted ? rawWishlistCount : 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      setIsSearchOpen(true);
    }
  };

  return (
    <>
      <header className="hidden md:block sticky top-0 z-40 bg-white shadow-xs">
        {/* Main Header Deck (Brand, Search Bar, Account & Cart) */}
        <div className={cn(
          "border-b border-gray-100 transition-all duration-200 bg-white",
          isScrolled ? "py-2.5 shadow-sm" : "py-3.5"
        )}>
          <div className="container mx-auto px-4 flex items-center justify-between gap-4 lg:gap-8">
            {/* Logo & Delivery Location */}
            <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
              <Link href="/" className="flex items-center group py-0.5" title="Farm Bandi - Home">
                <Image
                  src="/images/logo.png"
                  alt="Farm Bandi - Raithanna Market"
                  width={200}
                  height={60}
                  className={cn(
                    "w-auto transition-all duration-200 object-contain drop-shadow-2xs",
                    isScrolled ? "h-11 lg:h-12" : "h-13 lg:h-14"
                  )}
                  priority
                />
              </Link>

              {/* Delivery Location Pill */}
              <div className="hidden lg:block border-l border-gray-200 pl-4">
                <LocationSelector />
              </div>
            </div>

            {/* Central Search Bar (Amazon / Instacart standard) */}
            <div className="flex-1 max-w-2xl">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    placeholder="Search 2,500+ Indian groceries, mangoes, basmati, spices..."
                    className="w-full bg-[#F3F4F6] hover:bg-[#EBF0EC] focus:bg-white text-gray-900 text-sm rounded-full pl-11 pr-24 py-2.5 border border-transparent focus:border-[#155E40] focus:ring-2 focus:ring-[#155E40]/20 transition-all outline-none focus:outline-none placeholder:text-gray-400"
                    style={{ outline: "none" }}
                  />
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#155E40] hover:bg-[#0F4932] text-white text-xs font-semibold rounded-full transition-all shadow-xs"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Utility Actions */}
            <div className="flex items-center gap-3 lg:gap-5 flex-shrink-0">
              {/* Help & Support */}
              <Link
                href="/support"
                className="hidden xl:flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-[#155E40] transition-colors py-1"
                title="Customer Support & FAQ"
              >
                <HelpCircle size={17} className="text-gray-400" />
                <span>Help</span>
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-[#155E40] transition-colors py-1"
                aria-label="User Account"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#EBF5F0] hover:text-[#155E40] transition-colors">
                  <User size={16} />
                </div>
                <div className="hidden lg:flex flex-col text-left leading-tight">
                  <span className="text-[10px] text-gray-400 font-normal">Welcome</span>
                  <span className="font-semibold text-gray-800">Account</span>
                </div>
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-[#155E40] transition-colors py-1 relative"
                aria-label="Wishlist"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-colors relative">
                  <Heart size={16} />
                  {mounted && wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E76F51] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="hidden lg:inline font-semibold">Wishlist</span>
              </Link>

              <div className="h-6 w-px bg-gray-200 hidden sm:block" />

              {/* Cart Indicator */}
              <CartIndicator />
            </div>
          </div>
        </div>

        {/* 3. Category Navigation Ribbon Deck (Shown on inner pages; on homepage it renders below hero) */}
        {!isHome && (
          <div className="border-b border-gray-200/80 bg-white">
            <div className="container mx-auto px-4">
              <MainNav />
            </div>
          </div>
        )}
      </header>

      {/* Interactive Global Search Modal */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
