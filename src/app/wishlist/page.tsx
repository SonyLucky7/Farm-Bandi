"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useWishlistStore } from "@/stores/wishlist";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/utils";
import { useMounted } from "@/hooks/useMounted";
import { toast } from "sonner";

export default function WishlistPage() {
  const mounted = useMounted();
  const rawItems = useWishlistStore((state) => state.items);
  const items = mounted ? rawItems : [];
  const removeItem = useWishlistStore((state) => state.removeItem);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const addItem = useCartStore((state) => state.addItem);

  const handleMoveToCart = (item: (typeof items)[0]) => {
    addItem(
      {
        id: item.productId,
        productId: item.productId,
        name: item.name,
        slug: item.slug,
        image: item.image,
        price: item.price,
        compareAtPrice: item.compareAtPrice,
        weight: item.weight,
      },
      1
    );
    removeItem(item.productId);
    toast.success(`Moved ${item.name} to shopping basket!`);
  };

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "My Wishlist", href: "/wishlist" },
          ]}
          className="mb-4"
        />

        <div className="flex items-center justify-between mb-8 pb-4 border-b">
          <div>
            <h1 className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              My Saved Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {items.length} items saved for future grocery orders
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs text-red-500 font-bold hover:underline"
            >
              Clear All Wishlist
            </button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 mb-3 border">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 text-gray-400 hover:text-red-500 flex items-center justify-center shadow-xs"
                      title="Remove"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <span className="text-[11px] font-bold text-[#2D6A4F] uppercase tracking-wider block mb-1">
                    {item.category || "Grocery Staple"}
                  </span>
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="font-bold text-sm text-gray-900 hover:text-[#2D6A4F] line-clamp-2 mb-2">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-base font-extrabold text-gray-900">
                      {formatPrice(item.price)}
                    </span>
                    {item.compareAtPrice && item.compareAtPrice > item.price && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(item.compareAtPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleMoveToCart(item)}
                  className="w-full py-2.5 px-4 bg-[#2D6A4F] hover:bg-[#23533e] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <ShoppingBag size={14} />
                  <span>Move to Basket</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-gray-200 max-w-md mx-auto my-12">
            <Heart size={44} className="mx-auto text-gray-300 mb-3" />
            <h2 className="font-playfair text-xl font-bold text-gray-900 mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Save your favorite grocery items and seasonal pulses so you can reorder them easily anytime.
            </p>
            <Link
              href="/shop"
              className="px-6 py-2.5 bg-[#2D6A4F] text-white rounded-full font-bold text-xs hover:bg-[#23533e]"
            >
              Discover Groceries
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
