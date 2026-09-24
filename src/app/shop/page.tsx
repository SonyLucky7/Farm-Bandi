"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Filter,
  SlidersHorizontal,
  ChevronDown,
  X,
  Search,
  Sparkles,
} from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { brands } from "@/lib/data/brands";
import { SORT_OPTIONS } from "@/lib/constants";
import { getProductDisplayImage } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialBrand = searchParams.get("brand") || "all";
  const initialOrganic = searchParams.get("organic") === "true";
  const initialSort = searchParams.get("sort") || "relevance";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [isOrganicOnly, setIsOrganicOnly] = useState(initialOrganic);
  const [sortBy, setSortBy] = useState(initialSort);
  const [priceRange, setPriceRange] = useState<number>(50);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== "all" && p.categoryId !== selectedCategory) return false;
        if (selectedBrand !== "all" && p.brandId !== selectedBrand) return false;
        if (isOrganicOnly && !p.isOrganic) return false;
        if (p.price > priceRange) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchTags = p.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchTags) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return b.isNewArrival ? 1 : -1;
        if (sortBy === "discount") {
          const discountA = a.compareAtPrice ? a.compareAtPrice - a.price : 0;
          const discountB = b.compareAtPrice ? b.compareAtPrice - b.price : 0;
          return discountB - discountA;
        }
        return b.reviewCount - a.reviewCount; // Popularity default
      });
  }, [selectedCategory, selectedBrand, isOrganicOnly, sortBy, priceRange, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setIsOrganicOnly(false);
    setPriceRange(50);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedBrand !== "all" ||
    isOrganicOnly ||
    priceRange < 50 ||
    searchQuery !== "";

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "All Groceries", href: "/shop" },
          ]}
          className="mb-4"
        />

        {/* Page Title & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200/80 gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#155E40] uppercase tracking-wider mb-1">
              <Sparkles size={14} className="text-amber-500" />
              <span>Direct Harvest Imports</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              All Groceries &amp; Indian Staples
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Showing {filteredProducts.length} authentic products shipped with certified freshness
            </p>
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-700 shadow-xs cursor-pointer"
            >
              <SlidersHorizontal size={15} />
              <span>Filters {hasActiveFilters && "•"}</span>
            </button>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-9 text-xs sm:text-sm font-semibold text-gray-800 shadow-xs focus:outline-none focus:border-[#155E40] cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    Sort by: {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Main Content Layout (Sidebar + Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:flex lg:flex-col lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-200/90 shadow-xs sticky top-36 gap-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                <Filter size={16} className="text-[#155E40]" />
                <span>Filter Catalog</span>
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#E76F51] hover:underline font-bold cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Search Input Filter */}
            <div>
              <label className="text-xs font-bold text-gray-800 block mb-2">Search Within Results</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Atta, Ghee, Mango..."
                  className="w-full text-xs py-2 pl-8 pr-3 border border-gray-300 rounded-xl focus:border-[#155E40] focus:ring-1 focus:ring-[#155E40]/20 focus:outline-none bg-gray-50/50"
                />
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                Aisles &amp; Categories
              </h3>
              <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                    selectedCategory === "all"
                      ? "bg-[#EBF5F0] text-[#155E40] font-bold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] text-gray-400">{products.length}</span>
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === c.id
                        ? "bg-[#EBF5F0] text-[#155E40] font-bold"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="truncate">{c.name}</span>
                    <span className="text-[10px] text-gray-400">{c.productCount || 8}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                Brand
              </h3>
              <div className="flex flex-col gap-1 max-h-40 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedBrand("all")}
                  className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                    selectedBrand === "all"
                      ? "bg-[#EBF5F0] text-[#155E40] font-bold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span>All Brands</span>
                </button>
                {brands.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBrand(b.id)}
                    className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                      selectedBrand === b.id
                        ? "bg-[#EBF5F0] text-[#155E40] font-bold"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="truncate">{b.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Range Filter */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-gray-800 mb-2">
                <span>Max Price</span>
                <span className="text-[#155E40] font-extrabold">£{priceRange}.00</span>
              </div>
              <input
                type="range"
                min="3"
                max="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#155E40] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>£3</span>
                <span>£50+</span>
              </div>
            </div>

            {/* Organic Switch */}
            <div className="pt-2 border-t border-gray-100">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOrganicOnly}
                  onChange={(e) => setIsOrganicOnly(e.target.checked)}
                  className="rounded-sm accent-[#155E40] w-4 h-4"
                />
                <span>Certified 100% Organic Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-9">
            {/* Active Filter Chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs text-gray-500 font-medium">Active:</span>
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-2xs">
                    <span>Category: {categories.find((c) => c.id === selectedCategory)?.name}</span>
                    <button onClick={() => setSelectedCategory("all")} className="hover:text-red-500"><X size={12} /></button>
                  </span>
                )}
                {selectedBrand !== "all" && (
                  <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-2xs">
                    <span>Brand: {brands.find((b) => b.id === selectedBrand)?.name}</span>
                    <button onClick={() => setSelectedBrand("all")} className="hover:text-red-500"><X size={12} /></button>
                  </span>
                )}
                {isOrganicOnly && (
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold text-[#155E40] shadow-2xs">
                    <span>Organic Only</span>
                    <button onClick={() => setIsOrganicOnly(false)} className="hover:text-red-500"><X size={12} /></button>
                  </span>
                )}
                {priceRange < 50 && (
                  <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-2xs">
                    <span>Under £{priceRange}</span>
                    <button onClick={() => setPriceRange(50)} className="hover:text-red-500"><X size={12} /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-2xs">
                    <span>&quot;{searchQuery}&quot;</span>
                    <button onClick={() => setSearchQuery("")} className="hover:text-red-500"><X size={12} /></button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-[#E76F51] hover:underline ml-1 cursor-pointer"
                >
                  Reset All
                </button>
              </div>
            )}

            {/* Products Listing Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      image: getProductDisplayImage(product),
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8 shadow-xs">
                <Search size={48} className="mx-auto text-gray-300 mb-3" />
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  No Groceries Found
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
                  We couldn&apos;t find any products matching your specific filters. Try expanding your price range or clearing selected categories.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#155E40] text-white font-bold text-xs rounded-full hover:bg-[#0F4932] transition-colors cursor-pointer shadow-xs"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-extrabold text-base text-gray-900">Filter Groceries</h3>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Category */}
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase mb-2">Category</h4>
              <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`text-left text-xs p-2 rounded-xl border ${
                    selectedCategory === "all"
                      ? "border-[#155E40] bg-[#EBF5F0] font-bold text-[#155E40]"
                      : "border-gray-200"
                  }`}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`text-left text-xs p-2 rounded-xl border truncate ${
                      selectedCategory === c.id
                        ? "border-[#155E40] bg-[#EBF5F0] font-bold text-[#155E40]"
                        : "border-gray-200"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Max Price:</span>
                <span className="text-[#155E40] font-extrabold">£{priceRange}.00</span>
              </div>
              <input
                type="range"
                min="3"
                max="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#155E40]"
              />
            </div>

            {/* Organic */}
            <label className="flex items-center gap-2 text-xs font-bold text-gray-800">
              <input
                type="checkbox"
                checked={isOrganicOnly}
                onChange={(e) => setIsOrganicOnly(e.target.checked)}
                className="rounded-sm accent-[#155E40] w-4 h-4"
              />
              <span>Organic Only</span>
            </label>

            {/* Apply & Reset Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={resetFilters}
                className="py-3 border border-gray-300 text-gray-700 font-bold text-xs rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="py-3 bg-[#155E40] text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-8 text-gray-500 font-bold">Loading groceries catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
