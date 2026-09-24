"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  Share2,
  Star,
  MapPin,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { useMounted } from "@/hooks/useMounted";
import { toast } from "sonner";

interface Variant {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  weight?: string;
  inventory?: number;
}

interface ProductDetailProps {
  product: {
    id: string;
    sku?: string;
    name: string;
    slug: string;
    brandName: string;
    categoryName: string;
    price: number;
    compareAtPrice?: number;
    rating: number;
    reviewCount: number;
    description: string;
    ingredients?: string;
    nutrition?: string;
    image: string;
    variants?: Variant[];
    tags?: string[];
    isOrganic?: boolean;
  };
}

export default function ProductDetailClient({ product }: ProductDetailProps) {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "nutrition" | "shipping" | "reviews">("desc");
  const [isAdded, setIsAdded] = useState(false);

  const mounted = useMounted();
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const rawIsInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const isInWishlist = mounted ? rawIsInWishlist : false;

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentCompareAt = selectedVariant ? selectedVariant.compareAtPrice : product.compareAtPrice;
  const currentWeight = selectedVariant ? selectedVariant.name : "500g";

  const discountPercent =
    currentCompareAt && currentCompareAt > currentPrice
      ? Math.round(((currentCompareAt - currentPrice) / currentCompareAt) * 100)
      : 0;

  const handleAddToCart = () => {
    addItem(
      {
        id: selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id,
        productId: product.id,
        variantId: selectedVariant?.id,
        name: product.name,
        slug: product.slug,
        image: product.image,
        weight: currentWeight,
        price: currentPrice,
        compareAtPrice: currentCompareAt,
      },
      quantity
    );

    setIsAdded(true);
    toast.success(`Added ${quantity} × ${product.name} to basket!`);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner group">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-[#E76F51] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                {discountPercent}% OFF
              </span>
            )}
            {product.isOrganic && (
              <span className="absolute top-4 right-4 bg-[#2D6A4F] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Certified Organic
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                  idx === 0 ? "border-[#2D6A4F] shadow-sm" : "border-gray-200 opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={product.image} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Purchase Info */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            {/* Brand & Stock */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
                {product.brandName}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                In Stock • Dispatched Today
              </span>
            </div>

            {/* Title */}
            <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex text-amber-400 text-sm">
                {"★".repeat(Math.round(product.rating || 5))}
                {"☆".repeat(5 - Math.round(product.rating || 5))}
              </div>
              <span className="text-xs font-bold text-gray-700">
                {product.rating || 4.8}
              </span>
              <span className="text-xs text-gray-400">
                ({product.reviewCount || 24} customer reviews)
              </span>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline space-x-3 mb-6 pb-6 border-b border-gray-100">
              <span className="text-3xl font-extrabold text-[#1A1A1A]">
                {formatPrice(currentPrice)}
              </span>
              {currentCompareAt && currentCompareAt > currentPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(currentCompareAt)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-bold text-[#E76F51] bg-[#E76F51]/10 px-2.5 py-1 rounded-full">
                  You save {formatPrice(currentCompareAt! - currentPrice)}
                </span>
              )}
            </div>

            {/* Description Excerpt */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Variant / Weight Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                  Select Pack Size / Weight:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedVariant?.id === v.id
                          ? "border-[#2D6A4F] bg-[#2D6A4F] text-white shadow-sm"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <span>{v.name}</span>
                      <span className="ml-2 opacity-80 font-normal">
                        ({formatPrice(v.price)})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4">
                {/* Quantity */}
                <div className="flex items-center border border-gray-300 rounded-full p-1 bg-gray-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex-1 py-3 px-6 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2 ${
                    isAdded
                      ? "bg-green-600 text-white"
                      : "bg-[#2D6A4F] hover:bg-[#23533e] text-white"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={18} />
                      <span>Added to Basket</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>Add to Basket</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() =>
                    toggleWishlist({
                      productId: product.id,
                      name: product.name,
                      slug: product.slug,
                      image: product.image,
                      price: currentPrice,
                      compareAtPrice: currentCompareAt,
                      weight: currentWeight,
                      category: product.categoryName,
                    })
                  }
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                    isInWishlist
                      ? "border-red-200 bg-red-50 text-red-500 shadow-sm"
                      : "border-gray-300 hover:border-red-300 text-gray-400 hover:text-red-500"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={20} className={isInWishlist ? "fill-current text-red-500" : ""} />
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-full bg-[#D4A373] hover:bg-[#c29161] text-[#1A1A1A] font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Buy Now • Express Checkout</span>
              </button>
            </div>

            {/* Delivery Info Box */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-2 text-xs text-gray-600">
              <div className="flex items-center space-x-2 text-gray-900 font-semibold">
                <Truck size={16} className="text-[#2D6A4F]" />
                <span>UK Standard Delivery: 2-3 business days (£3.99)</span>
              </div>
              <p className="text-gray-500 pl-6">
                Free shipping available on orders over £50. Express same-day dispatch on orders before 1 PM.
              </p>
              <div className="flex items-center space-x-2 text-gray-900 font-semibold pt-1">
                <RotateCcw size={16} className="text-[#2D6A4F]" />
                <span>30-Day Freshness &amp; Quality Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs (Description, Nutrition, Shipping, Reviews) */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex space-x-4 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab("desc")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "desc"
                ? "border-[#2D6A4F] text-[#2D6A4F]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Product Description
          </button>
          <button
            onClick={() => setActiveTab("nutrition")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "nutrition"
                ? "border-[#2D6A4F] text-[#2D6A4F]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Ingredients &amp; Nutrition
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "shipping"
                ? "border-[#2D6A4F] text-[#2D6A4F]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Shipping &amp; Returns
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "reviews"
                ? "border-[#2D6A4F] text-[#2D6A4F]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Customer Reviews ({product.reviewCount || 24})
          </button>
        </div>

        {/* Tab Contents */}
        <div className="py-6">
          {activeTab === "desc" && (
            <div className="max-w-3xl space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
              <p>{product.description}</p>
              <h4 className="font-bold text-gray-900 text-sm pt-2">Key Quality Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Directly sourced and packaged under strict food safety and hygiene protocols.</li>
                <li>Free from artificial food colorings, synthetic fragrances, and hazardous preservatives.</li>
                <li>Sealed in oxygen-barrier packaging to ensure aroma, taste, and maximum shelf-life.</li>
                <li>Ideal for authentic family cooking, festive ceremonies, and everyday wholesome nutrition.</li>
              </ul>
            </div>
          )}

          {activeTab === "nutrition" && (
            <div className="max-w-2xl">
              <table className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50 text-gray-700 font-bold border-b">
                  <tr>
                    <th className="p-3 text-left">Nutritional Attribute</th>
                    <th className="p-3 text-left">Per 100g Portion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-600">
                  <tr>
                    <td className="p-3 font-medium text-gray-900">Energy (kcal)</td>
                    <td className="p-3">350 - 550 kcal (variety dependent)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-900">Protein</td>
                    <td className="p-3">12g - 22g</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-900">Dietary Fiber</td>
                    <td className="p-3">8g - 14g</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-900">Allergen Advice</td>
                    <td className="p-3">Packed in a facility handling tree nuts, sesame, and mustard.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="max-w-2xl space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
              <p>
                <strong>Delivery Timeframe:</strong> Orders received by 1:00 PM GMT are dispatched on the same business day via insured express courier. Standard delivery takes 2 to 3 working days across mainland UK.
              </p>
              <p>
                <strong>Perishable Items &amp; Fresh Produce:</strong> Produce is packaged with insulated liners and food-grade ice gel packs to preserve natural temperature and freshness.
              </p>
              <p>
                <strong>Return &amp; Refund Policy:</strong> If you are not 100% satisfied with freshness or condition upon arrival, contact us via WhatsApp or email with a photograph within 48 hours for an instant replacement or full store credit.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4 max-w-3xl">
              <div className="p-4 bg-gray-50 rounded-2xl border flex items-center justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-gray-900 mr-2">
                    {product.rating || 4.8}
                  </span>
                  <span className="text-amber-400">★★★★★</span>
                  <p className="text-xs text-gray-500 mt-1">Based on verified UK purchases</p>
                </div>
                <button
                  onClick={() => toast.info("Review form submitted for verified customers")}
                  className="px-4 py-2 bg-[#2D6A4F] text-white rounded-full text-xs font-bold hover:bg-[#23533e]"
                >
                  Write a Review
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-gray-100 bg-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-gray-900">Suresh Patel</span>
                    <span className="text-[10px] text-gray-400">2 weeks ago</span>
                  </div>
                  <div className="text-amber-400 text-xs mb-1">★★★★★</div>
                  <p className="text-xs text-gray-600">
                    Exceptionally fresh and clean. Far superior to generic supermarket imports.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
