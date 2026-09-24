import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  ArrowLeft,
  Search,
  ShoppingBag,
  Sparkles,
  PhoneCall,
  Home,
  Tag,
  Flame,
  LayoutGrid,
} from "lucide-react";
import { getBestsellers, getCategories } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";

export default function NotFound() {
  const bestsellers = getBestsellers(4);
  const categories = getCategories().slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Creative 404 Hero Container */}
        <div className="max-w-4xl mx-auto text-center bg-white rounded-3xl p-8 sm:p-12 md:p-16 border border-emerald-900/10 shadow-xl relative overflow-hidden mb-16">
          {/* Subtle Background Pattern Elements */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-50/60 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-amber-50/60 blur-3xl pointer-events-none" />

          {/* Farm Bandi Logo Badge */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Image
                src="/images/logo.png"
                alt="Farm Bandi"
                width={160}
                height={50}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-extrabold uppercase tracking-wider mb-6">
            <Compass size={14} className="text-amber-600 animate-spin-slow" />
            <span>Harvest Not Found • Aisle 404</span>
          </div>

          {/* Playful 404 Graphic Headline */}
          <div className="relative mb-6">
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter text-[#155E40] flex items-center justify-center gap-2 select-none">
              <span>4</span>
              {/* Center decorative wheel / harvest emblem */}
              <span className="inline-block relative">
                <span className="text-[#D4A373]">0</span>
                <span className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl text-emerald-800">
                  🌾
                </span>
              </span>
              <span>4</span>
            </h1>
          </div>

          {/* Headline & Narrative */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            Oops! This cart took a wrong turn into the spice fields.
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed mb-8">
            Even our swiftest delivery bullock cart couldn&apos;t locate this page. It might have been savored, renamed, or relocated to a different pantry aisle.
          </p>

          {/* Interactive Search Box */}
          <div className="max-w-lg mx-auto mb-8">
            <form action="/search" method="GET" className="relative flex items-center shadow-md rounded-full overflow-hidden border border-gray-200 focus-within:border-[#155E40] focus-within:ring-2 focus-within:ring-[#155E40]/20 transition-all">
              <Search size={18} className="absolute left-4 text-gray-400" />
              <input
                type="text"
                name="q"
                placeholder="Search for Basmati, Mangoes, Ghee, Spices..."
                className="w-full pl-11 pr-28 py-3.5 text-sm bg-gray-50 focus:bg-white text-gray-900 outline-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-5 py-2 bg-[#155E40] hover:bg-[#0F4932] text-white text-xs font-bold rounded-full transition-colors cursor-pointer shadow-xs"
              >
                Search
              </button>
            </form>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#155E40] hover:bg-[#0F4932] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Home size={16} />
              <span>Back to Fresh Market (Home)</span>
            </Link>

            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold border border-gray-200 transition-colors"
            >
              <LayoutGrid size={16} className="text-[#155E40]" />
              <span>Browse All Aisles</span>
            </Link>

            <Link
              href="/festival"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs sm:text-sm font-semibold border border-amber-200 transition-colors"
            >
              <Sparkles size={16} className="text-amber-600" />
              <span>Festival Hampers</span>
            </Link>
          </div>

          {/* Popular Aisle Shortcut Chips */}
          <div className="pt-8 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3.5">
              Popular Aisles to Explore:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="px-3.5 py-1.5 rounded-full bg-gray-50 hover:bg-[#EBF5F0] hover:text-[#155E40] text-gray-700 text-xs font-medium border border-gray-200 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/combos"
                className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#155E40] text-xs font-bold border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1"
              >
                <Tag size={12} />
                <span>Monthly Combos (Save £15)</span>
              </Link>
              <Link
                href="/offers"
                className="px-3.5 py-1.5 rounded-full bg-orange-50 text-orange-800 text-xs font-bold border border-orange-200 hover:bg-orange-100 transition-colors flex items-center gap-1"
              >
                <Flame size={12} className="text-orange-600" />
                <span>Hot Offers</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Customer Favorites / Recommendations Carousel Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#155E40] uppercase tracking-wider mb-1">
                <Sparkles size={14} className="text-[#E76F51]" />
                <span>Customer Favorites</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                While You&apos;re Here, Stock Your Pantry
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-bold text-[#155E40] hover:underline inline-flex items-center gap-1"
            >
              <span>View All 2,500+ Items</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {bestsellers.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  compareAtPrice: product.compareAtPrice,
                  rating: product.rating,
                  reviewCount: product.reviewCount,
                  image: product.images[0]?.url || "/images/products/placeholder.jpg",
                  weight: product.variants[0]?.weight || "500g",
                  isOrganic: product.isOrganic,
                  isBestseller: product.isBestseller,
                  isNewArrival: product.isNewArrival,
                  variants: product.variants.map((v) => ({
                    id: v.id,
                    name: v.name,
                    price: v.price,
                    compareAtPrice: v.compareAtPrice,
                  })),
                }}
              />
            ))}
          </div>
        </div>

        {/* Friendly Assistance Banner */}
        <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#155E40] flex items-center justify-center flex-shrink-0">
              <PhoneCall size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Need help tracking down a specific regional ingredient?</p>
              <p className="text-xs text-gray-500">Our London customer support desk is open 7 days a week (8 AM – 8 PM).</p>
            </div>
          </div>
          <a
            href="tel:08002461890"
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors whitespace-nowrap"
          >
            Call 0800 246 1890
          </a>
        </div>
      </div>
    </div>
  );
}
