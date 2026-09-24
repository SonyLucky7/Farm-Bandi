"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

const CATEGORIES = [
  {
    id: "fruits-vegetables",
    name: "Fruits & Veggies",
    tagline: "Alphonso, Okra, Greens",
    itemCount: "45+ items",
    slug: "fruits-vegetables",
    image: "/images/categories/category-fruits.jpg",
  },
  {
    id: "rice-products",
    name: "Basmati & Millets",
    tagline: "Sona Masoori, Ragi, Poha",
    itemCount: "35+ items",
    slug: "rice-rice-products",
    image: "/images/categories/category-rice.jpg",
  },
  {
    id: "dals-pulses",
    name: "Dals & Pulses",
    tagline: "Toor, Moong, Chana, Urad",
    itemCount: "30+ items",
    slug: "beans-dals-pulses",
    image: "/images/categories/category-dals.jpg",
  },
  {
    id: "spices",
    name: "Spices & Masalas",
    tagline: "Guntur Chilli, Turmeric, Cumin",
    itemCount: "50+ items",
    slug: "spices",
    image: "/images/categories/category-spices.jpg",
  },
  {
    id: "dry-fruits-nuts",
    name: "Dry Fruits & Nuts",
    tagline: "Anjeer, Cashews, Almonds",
    itemCount: "40+ items",
    slug: "dry-fruits-nuts-seeds",
    image: "/images/categories/category-dryfruits.jpg",
  },
  {
    id: "sweets-snacks",
    name: "Sweets & Mithai",
    tagline: "Laddoo, Murukku, Halwa",
    itemCount: "40+ items",
    slug: "sweets-snacks",
    image: "/images/categories/category-sweets.jpg",
  },
];

export default function CategorySlider() {
  return (
    <section className="py-8 sm:py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#155E40] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#155E40]"></span>
              <span>Browse Aisles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
              From staple dals and single-origin basmati to seasonal Banganapalli mangoes and festival sweets.
            </p>
          </div>

          <Link
            href="/categories"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#155E40] hover:text-[#0F4932] group"
          >
            <span>View All Aisles</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid (Clean, Crisp, Apple/Instacart Style) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative flex flex-col bg-[#F9FAFB] hover:bg-white border border-gray-200/80 hover:border-[#155E40]/40 rounded-2xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
            >
              {/* Category Image Thumbnail */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-white border border-gray-100 shadow-xs">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
              </div>

              {/* Title & Micro Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#155E40] transition-colors leading-tight mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 hidden sm:block truncate mb-2">
                    {cat.tagline}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-[#155E40] bg-emerald-50 rounded-full py-0.5 px-2 w-fit mx-auto">
                  <span>{cat.itemCount}</span>
                  <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/categories"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors"
          >
            <span>View All Aisles</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
