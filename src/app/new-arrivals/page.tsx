import Link from "next/link";
import { Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/products/ProductCard";
import { getNewArrivals, products } from "@/lib/data";
import { getProductDisplayImage } from "@/lib/utils";

export const metadata = {
  title: "New Arrivals | Raithanna Market",
  description: "Check out the newest authentic Indian grocery arrivals, newly imported spices, and seasonal harvests.",
};

export default function NewArrivalsPage() {
  const newArrivals = getNewArrivals(12);

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "New Arrivals", href: "/new-arrivals" },
          ]}
          className="mb-4"
        />

        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Sparkles size={14} />
            <span>Fresh Shipments Just Landed</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-2">
            New Arrivals &amp; Seasonal Batches
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Freshly processed whole spices, new harvest basmati grains, cold-pressed seed oils, and seasonal treats.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {(newArrivals.length > 0 ? newArrivals : products.slice(0, 8)).map((product) => (
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
  );
}
