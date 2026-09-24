"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, TrendingUp, Clock, ArrowRight, Sparkles, LayoutGrid, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn, formatPrice, getProductDisplayImage } from "@/lib/utils";
import { searchProducts, getCategories } from "@/lib/data";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const RECENT_SEARCHES = ["Basmati Rice", "Premium Cashews", "Toor Dal", "Garam Masala", "Cow Ghee"];
const POPULAR_SEARCHES = ["Atta", "Rice", "Spices", "Dry Fruits", "Dal", "Organic Honey"];

const TRENDING_GROCERIES = [
  {
    id: "prod_cashews",
    name: "Farm Bandi Premium Cashews",
    slug: "premium-cashews",
    brand: "Farm Bandi",
    weight: "250g",
    price: 7.99,
    compareAtPrice: 9.99,
    badge: "20% OFF",
    image: "/images/categories/category-dryfruits.jpg",
  },
  {
    id: "prod_basmati",
    name: "Royal Heritage Basmati Rice",
    slug: "basmati-rice",
    brand: "Farm Bandi",
    weight: "5kg",
    price: 12.99,
    compareAtPrice: 14.99,
    badge: "Bestseller",
    image: "/images/categories/category-rice.jpg",
  },
  {
    id: "prod_toordal",
    name: "Organic Toor Dal (Pigeon Peas)",
    slug: "toor-dal",
    brand: "24 Mantra",
    weight: "1kg",
    price: 3.49,
    compareAtPrice: 4.29,
    badge: "Organic",
    image: "/images/categories/category-dals.jpg",
  },
  {
    id: "prod_garammasala",
    name: "MDH Super Garam Masala",
    slug: "mdh-garam-masala",
    brand: "MDH",
    weight: "100g",
    price: 1.99,
    compareAtPrice: 2.49,
    badge: "Staple",
    image: "/images/categories/category-spices.jpg",
  },
];

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when search is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Live search filtering
  const matchingProducts = query.trim() ? searchProducts(query.trim()).slice(0, 8) : [];
  const allCategories = getCategories();
  const matchingCategories = query.trim()
    ? allCategories.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleSelectQuery = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-start pt-4 sm:pt-[7vh] p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop Dismiss Target */}
      <div className="fixed inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      {/* Main Search Modal Shell */}
      <div className="w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-hidden animate-in slide-in-from-top-4 duration-300">
        
        {/* Top Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="p-3.5 sm:p-5 border-b border-gray-100 bg-white">
          <div className="relative flex items-center bg-[#F3F4F6] rounded-2xl px-4 py-3 border border-transparent focus-within:border-[#155E40] focus-within:bg-white focus-within:ring-3 focus-within:ring-[#155E40]/15 transition-all">
            <Search size={22} className="text-[#155E40] flex-shrink-0 mr-3" />
            
            <input
              ref={inputRef}
              type="text"
              placeholder="Search 2,500+ Indian groceries, mangoes, basmati, spices..."
              className="w-full bg-transparent text-gray-900 text-sm sm:text-base font-medium placeholder:text-gray-400 outline-none border-none focus:outline-none focus:ring-0 p-0 shadow-none ring-0"
              style={{ outline: "none", border: "none", boxShadow: "none" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}

              <kbd className="hidden sm:inline-flex items-center text-[10px] font-bold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded shadow-2xs">
                ESC
              </kbd>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition-colors ml-1"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </form>

        {/* Search Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAFBF9]">
          {!query ? (
            <div className="space-y-7">
              {/* 1. Recent Searches */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                  <Clock size={14} className="text-[#155E40]" />
                  <span>Recent Searches</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {RECENT_SEARCHES.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelectQuery(item)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 hover:border-[#155E40] hover:text-[#155E40] hover:bg-[#EBF5F0] transition-all shadow-2xs"
                    >
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Popular Categories Quick Jump */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                  <TrendingUp size={14} className="text-[#E76F51]" />
                  <span>Popular Aisles</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelectQuery(item)}
                      className="px-3.5 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 hover:border-[#155E40] hover:text-[#155E40] hover:bg-emerald-50 transition-all shadow-2xs"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Trending Groceries (With Real Photorealistic Photography) */}
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#D4A373]" />
                    <span>Trending Fresh Groceries</span>
                  </h3>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="text-xs font-bold text-[#155E40] hover:underline flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {TRENDING_GROCERIES.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="group bg-white rounded-2xl p-3 border border-gray-200 hover:border-[#155E40]/50 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Real Photographic Thumbnail */}
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-2.5 border border-gray-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="180px"
                            className="object-cover group-hover:scale-106 transition-transform duration-300"
                          />
                          <span className="absolute top-1.5 left-1.5 bg-[#E76F51] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase shadow-2xs">
                            {product.badge}
                          </span>
                        </div>

                        <span className="text-[10px] font-bold text-[#155E40] uppercase tracking-wide">
                          {product.brand}
                        </span>
                        <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#155E40] transition-colors leading-snug line-clamp-2 mt-0.5">
                          {product.name}
                        </h4>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-extrabold text-[#155E40]">
                            {formatPrice(product.price)}
                          </span>
                          {product.compareAtPrice && (
                            <span className="text-[10px] text-gray-400 line-through ml-1.5">
                              {formatPrice(product.compareAtPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-semibold text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                          {product.weight}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Live Instant Search Results */
            <div className="space-y-4">
              {/* Category Matches */}
              {matchingCategories.length > 0 && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                    <LayoutGrid size={14} className="text-[#155E40]" />
                    Matching Aisles:
                  </span>
                  {matchingCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={onClose}
                      className="text-xs font-bold text-[#155E40] bg-white px-3 py-1 rounded-full border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      {cat.name} →
                    </Link>
                  ))}
                </div>
              )}

              {/* Product Matches */}
              {matchingProducts.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Found {matchingProducts.length} items matching &ldquo;{query}&rdquo;
                    </span>
                    <button
                      onClick={handleSearchSubmit}
                      className="text-xs font-bold text-[#155E40] hover:underline flex items-center gap-1"
                    >
                      <span>See all in catalog</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {matchingProducts.map((prod) => {
                      const image = getProductDisplayImage(prod);
                      const defaultVariant = prod.variants?.[0];
                      const price = defaultVariant?.price || prod.price;
                      const weight = defaultVariant?.weight || defaultVariant?.name || "";

                      return (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.slug}`}
                          onClick={onClose}
                          className="group flex items-center gap-3 p-2.5 bg-white rounded-xl border border-gray-200/80 hover:border-[#155E40] hover:shadow-sm transition-all"
                        >
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                            <Image
                              src={image}
                              alt={prod.name}
                              fill
                              sizes="56px"
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#155E40] transition-colors truncate">
                              {prod.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-extrabold text-[#155E40]">
                                {formatPrice(price)}
                              </span>
                              {weight && (
                                <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.2 rounded font-medium">
                                  {weight}
                                </span>
                              )}
                            </div>
                          </div>

                          <ArrowRight
                            size={16}
                            className="text-gray-300 group-hover:text-[#155E40] group-hover:translate-x-0.5 transition-all mr-1"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* No Results Found State */
                <div className="text-center py-10 px-4 bg-white rounded-2xl border border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-amber-50 text-[#E76F51] flex items-center justify-center mx-auto mb-3">
                    <Search size={24} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">
                    No groceries found for &ldquo;{query}&rdquo;
                  </h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
                    Check spelling or try popular terms like &ldquo;Basmati&rdquo;, &ldquo;Atta&rdquo;, &ldquo;Ghee&rdquo;, or &ldquo;Cashews&rdquo;.
                  </p>
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="px-4 py-2 rounded-full bg-[#155E40] text-white text-xs font-bold hover:bg-[#0F4932] transition-colors shadow-xs"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Quick Footer */}
        <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span className="font-medium text-gray-700">Same-Day UK Dispatch on orders placed before 4 PM</span>
          </div>
          <Link
            href="/shop"
            onClick={onClose}
            className="font-bold text-[#155E40] hover:underline hidden sm:inline"
          >
            Explore Complete Catalog →
          </Link>
        </div>

      </div>
    </div>
  );
}
