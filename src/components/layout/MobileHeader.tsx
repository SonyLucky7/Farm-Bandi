"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Heart, ChevronDown, MapPin, Mic } from "lucide-react";
import SearchDialog from "./SearchDialog";
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
      <header className="md:hidden sticky top-0 z-40 bg-white shadow-sm">
        {/* Row 1: Logo + Delivery Location + Wishlist + Cart */}
        <div className="px-3 pt-2 pb-1.5 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <Link href="/" className="flex-shrink-0" title="Farm Bandi - Home">
            <Image
              src="/images/logo.png"
              alt="Farm Bandi"
              width={100}
              height={28}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>

          {/* Compact Location Pill */}
          <div className="flex-1 min-w-0 max-w-[150px] mx-1 cursor-pointer">
            <div className="flex items-center gap-1 text-[#155E40]">
              <MapPin size={14} className="flex-shrink-0 fill-current text-white" style={{ strokeWidth: 2, fill: '#155E40' }} />
              <span className="text-xs font-bold truncate">Deliver to London</span>
              <ChevronDown size={14} className="flex-shrink-0" />
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Link
              href="/wishlist"
              className="p-1 text-gray-700 hover:text-[#155E40] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E76F51] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="p-1 text-gray-700 hover:text-[#155E40] transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#155E40] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Row 2: Search Bar */}
        <div className="px-3 pb-2.5">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full bg-[#F1F2F6] hover:bg-[#EAECEF] active:bg-gray-200 text-left rounded-lg px-3 py-2 flex items-center justify-between text-xs text-gray-500 transition-colors border border-transparent focus:border-[#155E40] cursor-pointer"
            aria-label="Search products"
          >
            <div className="flex items-center gap-2 truncate">
              <Search size={16} className="text-gray-500 flex-shrink-0" />
              <span className="truncate">Search for atta, dal, rice...</span>
            </div>
            <Mic size={16} className="text-gray-500 flex-shrink-0 ml-2" />
          </button>
        </div>
      </header>

      {/* Global Interactive Search Modal */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
