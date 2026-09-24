"use client";

import { useState } from "react";
import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/utils";
import { useMounted } from "@/hooks/useMounted";

export default function CartIndicator() {
  const mounted = useMounted();
  const [isHovered, setIsHovered] = useState(false);
  const rawItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const rawItemCount = useCartStore((state) => state.getItemCount());
  const rawSubtotal = useCartStore((state) => state.getSubtotal());

  const items = mounted ? rawItems : [];
  const itemCount = mounted ? rawItemCount : 0;
  const subtotal = mounted ? rawSubtotal : 0;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href="/cart"
        className="flex items-center gap-2.5 bg-[#155E40] hover:bg-[#0F4932] text-white px-3.5 py-2 rounded-full transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer group"
        aria-label="View Shopping Basket"
      >
        <div className="relative flex items-center justify-center">
          <ShoppingBag size={18} className="text-emerald-100 group-hover:scale-105 transition-transform" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#E76F51] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {itemCount}
            </span>
          )}
        </div>
        <div className="hidden sm:flex flex-col text-left leading-tight pr-1">
          <span className="text-[10px] text-emerald-200 font-semibold uppercase tracking-wider">Basket</span>
          <span className="text-xs font-bold text-white">{formatPrice(subtotal)}</span>
        </div>
      </Link>

      {/* Mini Cart Dropdown on desktop hover */}
      {isHovered && (
        <div className="absolute right-0 top-full mt-2 w-84 bg-white shadow-2xl border border-gray-200 rounded-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
            <h3 className="font-extrabold text-sm text-gray-900">Shopping Basket</h3>
            <span className="text-xs font-bold bg-[#EBF5F0] text-[#155E40] px-2.5 py-0.5 rounded-full">
              {itemCount} items
            </span>
          </div>

          {items.length > 0 ? (
            <>
              <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
                {items.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 group">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl relative overflow-hidden flex-shrink-0 border border-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate hover:text-[#155E40]">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {item.weight && <span className="mr-1">{item.weight} •</span>}
                        {item.quantity} × {formatPrice(item.price)}
                      </p>
                      <p className="text-xs font-extrabold text-[#155E40]">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeItem(item.id);
                      }}
                      className="text-gray-400 hover:text-red-500 p-1.5 transition-colors rounded-lg hover:bg-red-50"
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                {items.length > 4 && (
                  <p className="text-center text-xs text-gray-500 pt-1">
                    +{items.length - 4} more items in basket
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-3 mt-3 flex flex-col gap-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Subtotal:</span>
                  <span className="font-extrabold text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                {subtotal < 50 && (
                  <p className="text-[11px] text-amber-900 bg-amber-50 border border-amber-200/60 p-2 rounded-xl">
                    Add <strong>{formatPrice(50 - subtotal)}</strong> more for <strong>FREE Delivery</strong>!
                  </p>
                )}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/cart"
                    className="w-full text-center py-2 px-3 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors"
                  >
                    View Basket
                  </Link>
                  <Link
                    href="/checkout"
                    className="w-full text-center py-2 px-3 bg-[#155E40] text-white rounded-xl text-xs font-bold hover:bg-[#0F4932] transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span>Checkout</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <ShoppingBag size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-bold text-gray-800">Your basket is empty</p>
              <p className="text-xs text-gray-500 mt-1 mb-4">Discover our fresh authentic foods</p>
              <Link
                href="/shop"
                className="inline-block py-2 px-5 bg-[#155E40] text-white text-xs font-bold rounded-full hover:bg-[#0F4932] transition-colors shadow-xs"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
