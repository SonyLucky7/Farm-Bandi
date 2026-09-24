"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Plus, Minus, Check, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { useMounted } from "@/hooks/useMounted";
import { toast } from "sonner";

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    brandName?: string;
    categoryName?: string;
    price: number;
    compareAtPrice?: number;
    rating: number;
    reviewCount: number;
    image: string;
    weight?: string;
    isOrganic?: boolean;
    isBestseller?: boolean;
    isNewArrival?: boolean;
    variants?: { id: string; name: string; price: number; compareAtPrice?: number }[];
  };
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const mounted = useMounted();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );

  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const rawIsInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const isInWishlist = mounted ? rawIsInWishlist : false;

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentCompareAt = selectedVariant ? selectedVariant.compareAtPrice : product.compareAtPrice;
  const currentWeight = selectedVariant ? selectedVariant.name : product.weight;

  const currentItemId = selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id;
  const existingCartItem = cartItems.find((i) => i.id === currentItemId);
  const cartQuantity = mounted && existingCartItem ? existingCartItem.quantity : 0;

  const discountPercent = currentCompareAt && currentCompareAt > currentPrice
    ? Math.round(((currentCompareAt - currentPrice) / currentCompareAt) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(
      {
        id: currentItemId,
        productId: product.id,
        variantId: selectedVariant?.id,
        name: product.name,
        slug: product.slug,
        image: product.image,
        weight: currentWeight,
        price: currentPrice,
        compareAtPrice: currentCompareAt,
      },
      1
    );

    toast.success(`Added ${product.name} to basket!`);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(currentItemId, cartQuantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartQuantity <= 1) {
      removeItem(currentItemId);
      toast.info(`Removed ${product.name} from basket`);
    } else {
      updateQuantity(currentItemId, cartQuantity - 1);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      price: currentPrice,
      compareAtPrice: currentCompareAt,
      weight: currentWeight,
      category: product.categoryName,
    });

    if (isInWishlist) {
      toast.info(`Removed ${product.name} from wishlist`);
    } else {
      toast.success(`Saved ${product.name} to wishlist!`);
    }
  };

  return (
    <div className="group relative bg-white border border-gray-200/80 hover:border-[#155E40]/50 rounded-2xl p-3 sm:p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between h-full">
      {/* Top Media & Badges Block */}
      <div className="relative">
        {/* Badges Stack */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5 pointer-events-none">
          {discountPercent > 0 && (
            <span className="bg-[#E76F51] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.isOrganic && (
            <span className="bg-[#155E40] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              Organic
            </span>
          )}
          {product.isBestseller && !discountPercent && (
            <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isInWishlist
              ? "bg-red-50 text-red-500 shadow-sm"
              : "bg-white/90 hover:bg-white text-gray-400 hover:text-red-500 shadow-xs border border-gray-100"
          }`}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} className={isInWishlist ? "fill-current text-red-500" : ""} />
        </button>

        {/* Product Image */}
        <Link
          href={`/products/${product.slug}`}
          className="block relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50/80 mb-3 border border-gray-100/60"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-106 transition-transform duration-500"
          />
        </Link>
      </div>

      {/* Product Content Block */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand/Category Tag & Weight */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <span className="font-semibold text-[#155E40] uppercase tracking-wider text-[10px]">
              {product.brandName || product.categoryName || "Farm Bandi"}
            </span>
            {currentWeight && (
              <span className="text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded-md">
                {currentWeight}
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-2 hover:text-[#155E40] transition-colors mb-1.5 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex text-amber-400">
              <Star size={12} className="fill-current text-amber-400" />
            </div>
            <span className="text-xs font-bold text-gray-800">
              {(product.rating || 4.8).toFixed(1)}
            </span>
            <span className="text-[11px] text-gray-400">
              ({product.reviewCount || 34})
            </span>
          </div>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 1 && !compact && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariant(v);
                  }}
                  className={`text-[10px] px-2 py-0.5 rounded-md border font-bold transition-all ${
                    selectedVariant?.id === v.id
                      ? "border-[#155E40] bg-[#EBF5F0] text-[#155E40]"
                      : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
                  }`}
                >
                  {v.name.replace(product.name, "").replace(/\b(Premium|Organic|Fresh|Authentic|Whole Wheat Atta|Whole|Wheat|Atta)\b/gi, "").trim() || v.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Interactive Cart Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto gap-2">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-extrabold text-gray-950">
              {formatPrice(currentPrice)}
            </span>
            {currentCompareAt && currentCompareAt > currentPrice && (
              <span className="text-[11px] text-gray-400 line-through">
                {formatPrice(currentCompareAt)}
              </span>
            )}
          </div>

          {/* Action: Add Button OR Interactive Stepper */}
          {cartQuantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#EBF5F0] hover:bg-[#155E40] text-[#155E40] hover:text-white transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
              aria-label={`Add ${product.name} to basket`}
            >
              <ShoppingBag size={14} />
              <span>Add</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 bg-[#155E40] text-white px-2 py-1 rounded-full text-xs font-bold shadow-xs">
              <button
                onClick={handleDecrement}
                className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={12} />
              </button>
              <span className="w-4 text-center font-mono text-xs">{cartQuantity}</span>
              <button
                onClick={handleIncrement}
                className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
