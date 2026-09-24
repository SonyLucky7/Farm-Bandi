import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { categories } from "@/lib/data/categories";

export const metadata = {
  title: "All Categories | Raithanna Market",
  description: "Browse all authentic Indian grocery categories - fresh vegetables, whole spices, premium dry fruits, basmati rice, lentils, and festive sweets.",
};

export default function CategoriesPage() {
  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "All Categories", href: "/categories" },
          ]}
          className="mb-4"
        />

        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-2">
            Explore All Categories
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            From farm-fresh produce to pantry staples and festival pooja essentials.
            Find everything your kitchen needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200/80 hover:border-[#2D6A4F]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-50">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-semibold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full mb-1 inline-block">
                    {cat.productCount || 12} Products
                  </span>
                  <h2 className="font-playfair text-xl font-bold text-white drop-shadow-xs">
                    {cat.name}
                  </h2>
                </div>
              </div>

              <div className="p-5 flex items-center justify-between">
                <p className="text-xs text-gray-500 line-clamp-1 pr-3">
                  {cat.description}
                </p>
                <div className="w-8 h-8 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] group-hover:bg-[#2D6A4F] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                  <ArrowRight size={15} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
