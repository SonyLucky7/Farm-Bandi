"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Heart,
  ShoppingBag,
  ArrowRight,
  Truck,
  CheckCircle2,
  Tag,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { validateCoupon } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useMounted } from "@/hooks/useMounted";
import { toast } from "sonner";

export default function CartPage() {
  const router = useRouter();
  const mounted = useMounted();
  const rawItems = useCartStore((state) => state.items);
  const items = mounted ? rawItems : [];
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);
  const deliveryType = useCartStore((state) => state.deliveryType);
  const setDeliveryType = useCartStore((state) => state.setDeliveryType);

  const rawSubtotal = useCartStore((state) => state.getSubtotal());
  const rawDiscount = useCartStore((state) => state.getDiscount());
  const rawDeliveryFee = useCartStore((state) => state.getDeliveryFee());
  const rawTotal = useCartStore((state) => state.getTotal());

  const subtotal = mounted ? rawSubtotal : 0;
  const discount = mounted ? rawDiscount : 0;
  const deliveryFee = mounted ? rawDeliveryFee : 0;
  const total = mounted ? rawTotal : 0;

  const toggleWishlist = useWishlistStore((state) => state.toggleItem);

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");

    if (!couponInput.trim()) return;

    const validation = validateCoupon(couponInput.trim(), subtotal);
    if (validation.isValid) {
      applyCoupon({
        code: couponInput.trim().toUpperCase(),
        discountAmount: validation.discountAmount,
        type: validation.type || "PERCENTAGE",
        description: validation.message,
      });
      toast.success(validation.message);
      setCouponInput("");
    } else {
      setCouponError(validation.message);
      toast.error(validation.message);
    }
  };

  const handleSaveForLater = (item: (typeof items)[0]) => {
    toggleWishlist({
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      image: item.image,
      price: item.price,
      compareAtPrice: item.compareAtPrice,
      weight: item.weight,
    });
    removeItem(item.id);
    toast.success(`Moved ${item.name} to wishlist`);
  };

  const freeDeliveryThreshold = 50.0;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  if (items.length === 0) {
    return (
      <div className="bg-[#FAFAF5] min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <ShoppingBag size={40} />
            </div>
            <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Your Basket is Empty
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mb-8 max-w-md mx-auto">
              You haven&apos;t added any items to your grocery basket yet. Explore our authentic staples, fresh spices, and farm-fresh collections!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/shop"
                className="px-6 py-3 bg-[#2D6A4F] text-white font-bold text-sm rounded-full hover:bg-[#23533e] transition-colors"
              >
                Browse All Groceries
              </Link>
              <Link
                href="/offers"
                className="px-6 py-3 border border-gray-300 text-gray-700 font-bold text-sm rounded-full hover:bg-gray-50 transition-colors"
              >
                Today&apos;s Offers
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shopping Basket", href: "/cart" },
          ]}
          className="mb-4"
        />

        <h1 className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] mb-6">
          Your Shopping Basket ({items.reduce((acc, i) => acc + i.quantity, 0)} Items)
        </h1>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs mb-8">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="flex items-center text-[#2D6A4F]">
              <Truck size={16} className="mr-1.5" />
              {remainingForFreeDelivery === 0 ? (
                <span className="text-emerald-700 font-bold">
                  Congratulations! You unlocked FREE Standard Delivery!
                </span>
              ) : (
                <span>
                  Add <strong>{formatPrice(remainingForFreeDelivery)}</strong> more to get{" "}
                  <strong>FREE Delivery</strong>
                </span>
              )}
            </span>
            <span className="text-gray-500">{freeDeliveryPercent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[#2D6A4F] h-full rounded-full transition-all duration-500"
              style={{ width: `${freeDeliveryPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Layout: Left Products Table, Right Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Products List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Image & Title */}
                    <div className="flex items-center space-x-4 min-w-0">
                      <Link
                        href={`/products/${item.slug}`}
                        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div>
                        <Link href={`/products/${item.slug}`}>
                          <h3 className="font-semibold text-sm sm:text-base text-[#1A1A1A] hover:text-[#2D6A4F] line-clamp-1 mb-1">
                            {item.name}
                          </h3>
                        </Link>
                        {item.weight && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md inline-block mb-1.5">
                            {item.weight}
                          </span>
                        )}
                        <div className="flex items-baseline space-x-2">
                          <span className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                            {formatPrice(item.price)}
                          </span>
                          {item.compareAtPrice && item.compareAtPrice > item.price && (
                            <span className="text-xs text-gray-400 line-through">
                              {formatPrice(item.compareAtPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-6 pt-2 sm:pt-0 border-t sm:border-0 border-gray-100">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-gray-300 rounded-full p-1 bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="text-right min-w-[70px]">
                        <span className="text-sm sm:text-base font-extrabold text-[#2D6A4F]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>

                      {/* Action Icons */}
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleSaveForLater(item)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                          title="Save for Later"
                        >
                          <Heart size={16} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Option Selector */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs">
              <h3 className="font-bold text-sm text-gray-900 mb-3 flex items-center space-x-2">
                <Truck size={16} className="text-[#2D6A4F]" />
                <span>Select Shipping Method</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setDeliveryType("standard")}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    deliveryType === "standard"
                      ? "border-[#2D6A4F] bg-[#2D6A4F]/5 shadow-xs"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-bold text-xs text-gray-900">Standard Delivery</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">2-4 working days</div>
                  <div className="text-xs font-extrabold text-[#2D6A4F] mt-1">
                    {subtotal >= 50 ? "FREE" : "£3.99"}
                  </div>
                </button>

                <button
                  onClick={() => setDeliveryType("express")}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    deliveryType === "express"
                      ? "border-[#2D6A4F] bg-[#2D6A4F]/5 shadow-xs"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-bold text-xs text-gray-900">Express Courier</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">1-2 business days</div>
                  <div className="text-xs font-extrabold text-gray-900 mt-1">£6.99</div>
                </button>

                <button
                  onClick={() => setDeliveryType("same-day")}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    deliveryType === "same-day"
                      ? "border-[#2D6A4F] bg-[#2D6A4F]/5 shadow-xs"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-bold text-xs text-gray-900">Same Day Delivery</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">Order before 1 PM</div>
                  <div className="text-xs font-extrabold text-gray-900 mt-1">£9.99</div>
                </button>
              </div>
            </div>

            {/* Back to Shopping Link */}
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#2D6A4F] hover:underline"
              >
                <span>&larr; Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-5">
              <h2 className="font-playfair text-xl font-bold text-[#1A1A1A] pb-3 border-b border-gray-100">
                Order Summary
              </h2>

              {/* Coupon Code Input */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-2">
                  Discount Coupon Code
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                    <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                      <Tag size={15} />
                      <span>{appliedCoupon.code}</span>
                      <span className="text-[11px] font-normal text-emerald-600">
                        (-{formatPrice(appliedCoupon.discountAmount)})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-500 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="e.g. WELCOME10"
                      className="flex-1 px-3 py-2 text-xs uppercase font-mono border border-gray-300 rounded-xl focus:border-[#2D6A4F] focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#2D6A4F] hover:bg-[#23533e] text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-500 mt-1.5">{couponError}</p>
                )}
                <div className="text-[10px] text-gray-400 mt-2">
                  Try codes: <strong className="text-gray-600">WELCOME10</strong> (10% off) or{" "}
                  <strong className="text-gray-600">FREEDEL</strong> (Free Delivery)
                </div>
              </div>

              {/* Price Calculations */}
              <div className="space-y-2.5 pt-3 border-t border-gray-100 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Basket Subtotal</span>
                  <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-bold text-gray-900">
                    {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>VAT &amp; Taxes</span>
                  <span className="text-gray-500">Zero-rated (£0.00)</span>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline text-base font-extrabold text-[#1A1A1A]">
                  <span>Total Amount</span>
                  <span className="text-xl text-[#2D6A4F]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => router.push("/checkout")}
                className="w-full py-4 px-6 bg-[#2D6A4F] hover:bg-[#23533e] text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              {/* Trust Badges in Summary */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-center space-x-4 text-[11px] text-gray-500">
                <span className="flex items-center">
                  <ShieldCheck size={14} className="mr-1 text-emerald-700" />
                  SSL Encrypted Checkout
                </span>
                <span className="flex items-center">
                  <CheckCircle2 size={14} className="mr-1 text-emerald-700" />
                  100% Quality Guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
