import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductDetailClient from "./ProductDetailClient";
import ProductCard from "@/components/products/ProductCard";
import { getProductBySlug, products } from "@/lib/data";
import { getCategoryBySlug, categories } from "@/lib/data/categories";
import { getBrandBySlug } from "@/lib/data/brands";
import { getProductDisplayImage } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Raithanna Market`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const brand = getBrandBySlug(product.brandId.replace("brand_", ""));
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.categoryId === product.categoryId || p.brandId === product.brandId))
    .slice(0, 4);

  const displayImage = getProductDisplayImage(product);

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: category?.name || "Shop", href: category ? `/category/${category.slug}` : "/shop" },
            { label: product.name, href: `/products/${product.slug}` },
          ]}
          className="mb-6"
        />

        {/* Product Detail Interactive View (Left: Gallery, Right: Details) */}
        <ProductDetailClient
          product={{
            ...product,
            image: displayImage,
            brandName: brand?.name || "Farm Bandi",
            categoryName: category?.name || "Groceries",
          }}
        />

        {/* Related Products Carousel */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">
              Handpicked Complements
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              Frequently Bought Together &amp; Related Items
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {(relatedProducts.length > 0 ? relatedProducts : products.slice(0, 4)).map((p) => (
              <ProductCard
                key={p.id}
                product={{
                  ...p,
                  image: getProductDisplayImage(p),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
