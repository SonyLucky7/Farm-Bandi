"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Heart, ChevronDown } from "lucide-react";
import SearchDialog from "./SearchDialog";
import LocationSelector from "./LocationSelector";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { useMounted } from "@/hooks/useMounted";

export default function MobileHeader() {
  const mounted = useMounted();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const rawCartItemCount = useCartStore((state) => state.getItemCount());
  const rawWishlistCount = useWishlistStore((state) => state.getCount());
  const cartItemCount = mounted ? rawCartItemCount : 0;
  const wishlistCount = mounted ? rawWishlistCount : 0;

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200/90 shadow-2xs">
        {/* Row 1: Logo + Delivery Location Pill + Wishlist + Cart */}
        <div className="px-3 pt-2 pb-1.5 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <Link href="/" className="flex-shrink-0" title="Farm Bandi - Home">
            <Image
              src="/images/logo.png"
              alt="Farm Bandi"
              width={130}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          {/* Flipkart Style Delivery Location Pill */}
          <div className="flex-1 min-w-0 max-w-[170px] truncate">
            <LocationSelector />
          </div>

          {/* Right Action Icons: Wishlist & Cart */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Link
              href="/wishlist"
              className="p-1.5 text-gray-700 hover:text-[#155E40] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#E76F51] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="p-1.5 text-gray-700 hover:text-[#155E40] transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#155E40] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Row 2: Flipkart Style Tap-to-Search Bar */}
        <div className="px-3 pb-2.5">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full bg-[#F3F4F6] hover:bg-[#EAECEF] active:bg-gray-200 text-left rounded-xl px-3 py-2 flex items-center justify-between text-xs text-gray-500 transition-colors shadow-2xs border border-transparent focus:border-[#155E40] cursor-pointer"
            aria-label="Search products"
          >
            <div className="flex items-center gap-2 truncate">
              <Search size={16} className="text-[#155E40] flex-shrink-0" />
              <span className="truncate">Search 2,500+ Indian groceries, mangoes, basmati...</span>
            </div>
            <span className="text-[10px] font-bold text-[#155E40] bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md flex-shrink-0 ml-1">
              Search
            </span>
          </button>
        </div>
      </header>

      {/* Global Interactive Search Modal */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
