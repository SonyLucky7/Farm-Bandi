import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/products/ProductCard";
import { getCategoryBySlug, categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { getProductDisplayImage } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} | Raithanna Market`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // Filter products matching this category
  const categoryProducts = products.filter(
    (p) =>
      p.categoryId === category.id ||
      p.categoryId.toLowerCase().includes(slug.replace(/-/g, "")) ||
      (p.tags && p.tags.some((t) => t.toLowerCase() === slug.toLowerCase()))
  );

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            { label: category.name, href: `/category/${category.slug}` },
          ]}
          className="mb-4"
        />

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-[#173829] to-[#2D6A4F] text-white p-6 sm:p-10 mb-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 z-10">
              <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2 block">
                Category Collection
              </span>
              <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
                {category.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-200 max-w-xl leading-relaxed">
                {category.description} — Grade-A export quality, naturally harvested and preserved without harsh chemicals.
              </p>
            </div>
            <div className="md:col-span-4 relative h-40 sm:h-48 rounded-2xl overflow-hidden shadow-inner border border-white/20">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Category Products Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Showing {categoryProducts.length > 0 ? categoryProducts.length : products.slice(0, 8).length} products
          </p>
          <Link
            href="/shop"
            className="text-xs font-bold text-[#2D6A4F] hover:underline"
          >
            Explore All Categories &rarr;
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-12">
          {(categoryProducts.length > 0 ? categoryProducts : products.slice(0, 8)).map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                image: getProductDisplayImage(product),
              }}
            />
          ))}
        </div>

        {/* Other Categories Carousel */}
        <div className="pt-10 border-t border-gray-200">
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Other Popular Categories
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {categories
              .filter((c) => c.id !== category.id)
              .slice(0, 6)
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/category/${c.slug}`}
                  className="p-3 bg-white rounded-xl border border-gray-200 text-center hover:border-[#2D6A4F] hover:shadow-xs transition-all"
                >
                  <div className="relative w-12 h-12 mx-auto rounded-full overflow-hidden mb-2 bg-gray-50">
                    <Image src={c.image} alt={c.name} fill className="object-cover" />
                  </div>
                  <p className="text-xs font-bold text-gray-800 line-clamp-1">{c.name}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
