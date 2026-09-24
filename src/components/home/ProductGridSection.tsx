"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { getProductDisplayImage } from "@/lib/utils";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  brandName?: string;
  categoryName?: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  image?: string;
  images?: { url: string; alt: string; isDefault: boolean }[];
  categoryId?: string;
  weight?: string;
  isOrganic?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  variants?: { id: string; name: string; price: number; compareAtPrice?: number }[];
}

interface ProductGridSectionProps {
  title: string;
  subtitle?: string;
  products: ProductItem[];
  viewAllLink?: string;
  categories?: { id: string; name: string }[];
}

export default function ProductGridSection({
  title,
  subtitle,
  products,
  viewAllLink = "/shop",
  categories,
}: ProductGridSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (p) =>
            p.categoryId === activeCategory ||
            (p.categoryName && p.categoryName.toLowerCase().includes(activeCategory.toLowerCase()))
        );

  return (
    <section className="py-8 sm:py-14 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#155E40] mb-1">
              <Sparkles size={14} className="text-amber-500" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">{subtitle}</p>
            )}
          </div>

          {/* Filter Pills with explicit gap-2 */}
          {categories && categories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full">
              <button
                onClick={() => setActiveCategory("all")}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-[#155E40] text-white shadow-xs"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                All Staples
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === c.id
                      ? "bg-[#155E40] text-white shadow-xs"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}

          {/* View All Desktop */}
          <Link
            href={viewAllLink}
            className="hidden md:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#155E40] hover:text-[#0F4932] group"
          >
            <span>View All</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                image: getProductDisplayImage(product),
              }}
            />
          ))}
        </div>

        {/* View All Mobile */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href={viewAllLink}
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl border border-[#155E40] text-[#155E40] font-bold text-sm hover:bg-emerald-50 transition-colors"
          >
            <span>Explore All {title}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
