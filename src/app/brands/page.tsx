import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { brands } from "@/lib/data/brands";

export const metadata = {
  title: "Featured Brands | Raithanna Market",
  description: "Browse trusted Indian food brands - Farm Bandi, Aashirvaad, Tata, MTR, Haldiram's, Dabur, Patanjali, MDH and Everest.",
};

export default function BrandsPage() {
  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Brands", href: "/brands" },
          ]}
          className="mb-4"
        />

        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-2">
            Trusted Heritage Brands
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            We partner directly with leading producers and regional farming cooperatives to bring authentic Indian flavors to your kitchen.
          </p>
        </div>

        {/* Farm Bandi Spotlight */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#2D6A4F]/30 shadow-md mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <div className="bg-gray-50 p-3 rounded-2xl inline-block mb-3 border">
              <Image src="/images/logo.png" alt="Farm Bandi" width={160} height={50} className="h-auto w-auto" />
            </div>
            <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
              Farm Bandi Organics
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 max-w-xl">
              Our signature single-origin line specializing in whole premium cashew nuts, sun-dried anjeer (figs), chia seeds, golden raisins, and stone-pressed oils.
            </p>
            <Link
              href="/brand/farm-bandi"
              className="px-6 py-2.5 bg-[#2D6A4F] text-white font-bold text-xs rounded-full hover:bg-[#23533e] transition-colors inline-flex items-center space-x-2"
            >
              <span>Explore Farm Bandi Products</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="w-full md:w-64 h-44 relative rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src="/images/categories/category-dryfruits.jpg"
              alt="Farm Bandi Dry Fruits"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* All Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brand/${brand.slug}`}
              className="group bg-white rounded-2xl p-6 border border-gray-200/80 hover:border-[#2D6A4F]/40 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-12 w-full flex items-center justify-start mb-4 bg-gray-50/70 p-2 rounded-xl border border-gray-100">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={130}
                    height={40}
                    className="max-h-9 w-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-playfair text-xl font-bold text-gray-900 group-hover:text-[#2D6A4F] transition-colors">
                    {brand.name}
                  </h3>
                  {brand.isFeatured && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {brand.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#2D6A4F]">
                <span>View Products</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
