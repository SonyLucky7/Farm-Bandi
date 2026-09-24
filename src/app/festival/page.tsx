import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/products/ProductCard";
import { collections } from "@/lib/data/collections";
import { products } from "@/lib/data/products";
import { getProductDisplayImage } from "@/lib/utils";

export const metadata = {
  title: "Festival & Event Collections | Raithanna Market",
  description: "Celebrate Indian festivals with authentic pooja items, traditional sweets, festive dry fruit gift hampers, and cooking essentials.",
};

export default function FestivalPage() {
  const festiveProducts = products.filter(
    (p) => p.categoryId === "cat_sweets" || p.categoryId === "cat_dryfruits"
  );

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Festival Collections", href: "/festival" },
          ]}
          className="mb-4"
        />

        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Sparkles size={14} />
            <span>Celebrate Tradition Everywhere</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-2">
            Festival &amp; Cultural Event Collections
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Pooja essentials, pure A2 cow ghee, fresh coconuts, festive sweets, and premium dry fruit gift boxes curated for special cultural milestones.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {collections.map((coll) => (
            <div
              key={coll.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm flex flex-col justify-between"
            >
              <div className="relative aspect-16/9 w-full bg-gray-50">
                <Image
                  src={coll.heroImage || "/images/categories/category-sweets.jpg"}
                  alt={coll.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold bg-[#D4A373] text-[#1A1A1A] px-2.5 py-0.5 rounded-full mb-1.5 inline-block">
                    Festival Celebration
                  </span>
                  <h2 className="font-playfair text-2xl font-bold">{coll.name}</h2>
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {coll.story || coll.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-xs font-bold text-gray-500">
                    {coll.productIds.length} Curated Items Included
                  </span>
                  <Link
                    href={`/shop?category=cat_sweets`}
                    className="text-xs font-bold text-[#2D6A4F] hover:underline flex items-center space-x-1"
                  >
                    <span>Explore Festive Items</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Festive Sweets & Dry Fruits Highlights */}
        <div className="pt-8 border-t border-gray-200">
          <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
            Recommended Festival Essentials
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {festiveProducts.slice(0, 4).map((product) => (
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
