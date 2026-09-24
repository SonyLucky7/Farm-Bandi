"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag, Flame, Sparkles, Copy, Check, Clock, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/products/ProductCard";
import { coupons } from "@/lib/data/coupons";
import { getDeals } from "@/lib/data";
import { getProductDisplayImage } from "@/lib/utils";
import { toast } from "sonner";

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const dealsProducts = getDeals(12);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Deals & Offers", href: "/offers" },
          ]}
          className="mb-4"
        />

        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#E76F51] bg-rose-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Flame size={14} />
            <span>Save With Today&apos;s Promotions</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-2">
            Special Deals &amp; Active Coupon Codes
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Apply these coupon codes during checkout for instant percentage discounts and free delivery perks.
          </p>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {coupons.map((coupon) => {
            const isCopied = copiedCode === coupon.code;
            return (
              <div
                key={coupon.id}
                className="bg-white rounded-2xl p-5 border-2 border-dashed border-[#2D6A4F]/30 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#2D6A4F]/10 text-[#2D6A4F] px-2 py-0.5 rounded-md">
                      {coupon.type}
                    </span>
                    <Tag size={16} className="text-[#2D6A4F]" />
                  </div>
                  <h3 className="font-mono text-xl font-extrabold text-[#1A1A1A] mb-1">
                    {coupon.code}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">{coupon.description}</p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">
                    Min order: £{coupon.minOrderValue || 0}
                  </span>
                  <button
                    onClick={() => handleCopyCode(coupon.code)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                      isCopied
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check size={12} />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Discounted Products Grid */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-gray-900">
                Discounted Grocery Deals
              </h2>
              <p className="text-xs text-gray-500">Handpicked items currently on promotional discount</p>
            </div>
            <Link href="/shop?sort=discount" className="text-xs font-bold text-[#2D6A4F] hover:underline flex items-center space-x-1">
              <span>View All Deals</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {dealsProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  image: getProductDisplayImage(product),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
