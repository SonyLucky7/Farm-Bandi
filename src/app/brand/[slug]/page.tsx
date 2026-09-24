import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/products/ProductCard";
import { getBrandBySlug, brands } from "@/lib/data/brands";
import { products } from "@/lib/data/products";
import { getProductDisplayImage } from "@/lib/utils";

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return { title: "Brand Not Found" };

  return {
    title: `${brand.name} Products | Raithanna Market`,
    description: brand.description,
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  // Filter products by brandId
  const brandProducts = products.filter(
    (p) =>
      p.brandId === brand.id ||
      p.name.toLowerCase().includes(brand.name.toLowerCase()) ||
      p.slug.toLowerCase().includes(slug.toLowerCase())
  );

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Brands", href: "/brands" },
            { label: brand.name, href: `/brand/${brand.slug}` },
          ]}
          className="mb-4"
        />

        {/* Brand Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F] bg-[#2D6A4F]/10 px-2.5 py-1 rounded-full mb-3 inline-block">
              Official Brand Store
            </span>
            <h1 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-2">
              {brand.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed mb-4">
              {brand.description}
            </p>
            <div className="text-xs text-gray-500 font-medium">
              Showing {brandProducts.length > 0 ? brandProducts.length : products.slice(0, 6).length} products in stock
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex-shrink-0 flex items-center justify-center min-w-[140px] h-20">
            <Image src={brand.logo} alt={brand.name} width={150} height={50} className="max-h-12 w-auto object-contain" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-12">
          {(brandProducts.length > 0 ? brandProducts : products.slice(0, 6)).map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                image: getProductDisplayImage(product),
              }}
            />
          ))}
        </div>

        {/* Other Brands Bar */}
        <div className="pt-8 border-t border-gray-200">
          <h3 className="font-playfair text-lg font-bold text-gray-900 mb-4">
            Discover Other Brands
          </h3>
          <div className="flex flex-wrap gap-2">
            {brands
              .filter((b) => b.id !== brand.id)
              .map((b) => (
                <Link
                  key={b.id}
                  href={`/brand/${b.slug}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-all"
                >
                  {b.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
