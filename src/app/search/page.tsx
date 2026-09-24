"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ShoppingBag, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/products/ProductCard";
import { searchProducts } from "@/lib/data";
import { products } from "@/lib/data/products";
import { getProductDisplayImage } from "@/lib/utils";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = query ? searchProducts(query) : [];
  const recommended = products.slice(0, 4);

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Search Results", href: `/search?q=${encodeURIComponent(query)}` },
          ]}
          className="mb-4"
        />

        <div className="mb-8">
          <h1 className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
            {query ? `Search Results for "${query}"` : "Search Our Catalog"}
          </h1>
          {query && (
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Found {results.length} matching grocery items
            </p>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-12">
            {results.map((product) => (
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
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-gray-200 max-w-xl mx-auto my-6">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="font-playfair text-xl font-bold text-gray-900 mb-2">
              No matching items found for &ldquo;{query}&rdquo;
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Check for spelling errors, try broader keywords like &quot;Atta&quot;, &quot;Rice&quot;, &quot;Cashew&quot;, or browse our categories.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/shop"
                className="px-6 py-2.5 bg-[#155E40] text-white font-bold text-xs rounded-full hover:bg-[#0F4932] transition-colors shadow-xs"
              >
                Browse All Groceries
              </Link>
              <Link
                href="/categories"
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold text-xs rounded-full hover:bg-gray-50 transition-colors"
              >
                View Categories
              </Link>
            </div>
          </div>
        )}

        {/* Recommended alternatives */}
        <div className="pt-10 border-t border-gray-200 mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Popular Pantry Staples You Might Like
            </h3>
            <Link href="/shop" className="text-xs font-bold text-[#155E40] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {recommended.map((product) => (
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-8">Searching groceries...</div>}>
      <SearchContent />
    </Suspense>
  );
}
