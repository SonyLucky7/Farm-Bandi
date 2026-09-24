"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { brands } from "@/lib/data/brands";
import { products } from "@/lib/data/products";
import ProductCard from "@/components/products/ProductCard";
import { getProductDisplayImage } from "@/lib/utils";

export default function BrandShowcase() {
  // Default to Aashirvaad as the initial active brand showcase
  const [activeBrandId, setActiveBrandId] = useState<string>("brand_aashirvaad");

  const activeBrand = brands.find((b) => b.id === activeBrandId) || brands[1] || brands[0];

  // Filter products belonging to the active/hovered brand
  const activeBrandProducts = products.filter(
    (p) =>
      p.brandId === activeBrand.id ||
      p.name.toLowerCase().includes(activeBrand.name.toLowerCase()) ||
      p.slug.toLowerCase().includes(activeBrand.slug.toLowerCase())
  );

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Farm Bandi Featured Brand Spotlight */}
        <div className="bg-[#0C2A1E] text-white rounded-3xl p-6 sm:p-10 md:p-12 mb-14 shadow-xl relative overflow-hidden border border-emerald-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 relative">
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="bg-white p-3 rounded-2xl shadow-sm mb-4 inline-block">
                <Image
                  src="/images/logo.png"
                  alt="Farm Bandi"
                  width={150}
                  height={45}
                  className="h-9 w-auto object-contain"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-2 uppercase tracking-wider">
                <Sparkles size={14} className="text-amber-400" />
                <span>Our Flagship Farm Direct Brand</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">
                Farm Bandi Organics
              </h3>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6 font-normal">
                Directly connected with farmer collectives across Southern India. Providing premium single-origin dry fruits, cold-pressed seed oils, unrefined natural jaggery, and stone-ground flours with certified export purity.
              </p>

              <Link
                href="/brand/farm-bandi"
                className="px-6 py-3 bg-[#D4A373] hover:bg-[#c69360] text-gray-950 font-bold text-xs sm:text-sm rounded-full transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <span>Shop Farm Bandi Collection</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
                <div className="text-3xl font-extrabold text-[#D4A373] mb-1">100%</div>
                <div className="font-bold text-sm text-white mb-1">Single Origin</div>
                <div className="text-xs text-emerald-200/80 leading-relaxed">
                  Harvested directly from certified partner orchards in AP &amp; Telangana.
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
                <div className="text-3xl font-extrabold text-[#D4A373] mb-1">0%</div>
                <div className="font-bold text-sm text-white mb-1">Chemical Preservatives</div>
                <div className="text-xs text-emerald-200/80 leading-relaxed">
                  Sun-dried, unadulterated, and traditionally cold-extracted.
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
                <div className="text-3xl font-extrabold text-[#D4A373] mb-1">Grade A</div>
                <div className="font-bold text-sm text-white mb-1">UK Import Standard</div>
                <div className="text-xs text-emerald-200/80 leading-relaxed">
                  Batch tested for moisture, pesticide residue, and absolute freshness.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header: Certified Partners */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#155E40] mb-1">
              <ShieldCheck size={14} />
              <span>Certified Partners</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight">
              Top Authentic Brands We Stock
            </h3>
            <p className="text-xs text-gray-500">
              Hover over any brand to view its authentic logo and in-stock pantry items.
            </p>
          </div>
          <Link
            href="/brands"
            className="text-xs font-bold text-[#155E40] hover:text-[#0F4932] flex items-center gap-1 group"
          >
            <span>All Partner Brands</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Brands Grid / Hover Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-6">
          {brands
            .filter((b) => b.id !== "brand_farmbandi")
            .map((brand) => {
              const isSelected = activeBrand.id === brand.id;
              const count = products.filter(
                (p) =>
                  p.brandId === brand.id ||
                  p.name.toLowerCase().includes(brand.name.toLowerCase()) ||
                  p.slug.toLowerCase().includes(brand.slug.toLowerCase())
              ).length;

              return (
                <div
                  key={brand.id}
                  onMouseEnter={() => setActiveBrandId(brand.id)}
                  onClick={() => setActiveBrandId(brand.id)}
                  className={`group relative p-3 sm:p-4 rounded-2xl cursor-pointer transition-all duration-200 text-center flex flex-col items-center justify-between min-h-[120px] ${
                    isSelected
                      ? "bg-white border-2 border-[#155E40] shadow-md ring-2 ring-[#155E40]/20 -translate-y-0.5"
                      : "bg-gray-50/80 hover:bg-white border border-gray-200/90 hover:border-[#155E40]/60 hover:shadow-sm"
                  }`}
                >
                  {/* Brand Logo Container */}
                  <div className="w-full h-11 flex items-center justify-center p-1 mb-2 bg-white rounded-xl border border-gray-100/90 shadow-2xs">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={120}
                      height={40}
                      className="max-h-8 w-auto object-contain transition-transform group-hover:scale-105"
                    />
                  </div>

                  {/* Brand Name & Count */}
                  <div className="w-full">
                    <span
                      className={`block font-bold text-xs sm:text-sm line-clamp-1 transition-colors ${
                        isSelected ? "text-[#155E40]" : "text-gray-900 group-hover:text-[#155E40]"
                      }`}
                    >
                      {brand.name}
                    </span>
                    <span className="inline-block text-[10px] text-gray-500 font-medium mt-0.5">
                      {count} {count === 1 ? "Product" : "Products"}
                    </span>
                  </div>

                  {/* Active Indicator Arrow */}
                  {isSelected && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-r border-b-2 border-[#155E40] rotate-45 z-10 hidden md:block" />
                  )}
                </div>
              );
            })}
        </div>

        {/* Dynamic Brand Products & Logo Showcase Layout */}
        <div className="bg-gradient-to-b from-[#F7FAF8] to-white border border-[#155E40]/25 rounded-3xl p-5 sm:p-7 shadow-xs">
          {/* Active Brand Header Spotlight */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-gray-200/80 gap-4">
            <div className="flex items-center gap-4">
              {/* Prominent Brand Logo */}
              <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-gray-200/90 shadow-sm flex items-center justify-center w-28 sm:w-36 h-14 shrink-0">
                <Image
                  src={activeBrand.logo}
                  alt={activeBrand.name}
                  width={140}
                  height={50}
                  className="max-h-10 w-auto object-contain"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-lg sm:text-xl font-extrabold text-gray-950">
                    {activeBrand.name} Range
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300/70 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-emerald-700" />
                    <span>Certified UK Stock</span>
                  </span>
                </div>
                <p className="text-xs text-gray-600 max-w-xl line-clamp-1 sm:line-clamp-2 mt-1">
                  {activeBrand.description}
                </p>
              </div>
            </div>

            {/* Direct CTA to Brand Page */}
            <Link
              href={`/brand/${activeBrand.slug}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#155E40] hover:bg-[#0F4932] text-white text-xs font-bold rounded-xl transition-all shadow-xs hover:shadow-md shrink-0 self-start sm:self-auto"
            >
              <span>Explore All {activeBrand.name} ({activeBrandProducts.length})</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Active Brand Products Grid */}
          {activeBrandProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {activeBrandProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    brandName: activeBrand.name,
                    image: getProductDisplayImage(product),
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-gray-100">
              <p className="text-sm text-gray-500 font-medium">
                No products found for {activeBrand.name}.
              </p>
              <Link
                href={`/brand/${activeBrand.slug}`}
                className="mt-3 inline-flex items-center text-xs font-bold text-[#155E40] hover:underline"
              >
                View full brand aisle &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
