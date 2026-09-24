import HeroBanner from "@/components/home/HeroBanner";
import MainNav from "@/components/layout/MainNav";
import CategorySlider from "@/components/home/CategorySlider";
import PromoBanners from "@/components/home/PromoBanners";
import ProductGridSection from "@/components/home/ProductGridSection";
import ComboShowcase from "@/components/home/ComboShowcase";
import BrandShowcase from "@/components/home/BrandShowcase";
import TrustAndReviews from "@/components/home/TrustAndReviews";
import Interactive3DWrapper from "@/components/home/Interactive3DWrapper";
import { getBestsellers, getFeaturedProducts, getProducts } from "@/lib/data";

export default function Home() {
  const bestsellers = getBestsellers(8);
  const featured = getFeaturedProducts(8);
  const organicProducts = getProducts({ isFeatured: true, limit: 8 }).filter((p) => p.isOrganic);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      {/* 1. Flagship Hero Banner with Slideshow */}
      <HeroBanner />

      {/* Category Navigation Ribbon (Placed directly below Hero Section) */}
      <nav aria-label="Category Quick Links" className="bg-white border-y border-gray-200/80 shadow-2xs">
        <div className="container mx-auto px-4 py-1">
          <MainNav />
        </div>
      </nav>

      {/* 2. Visual Categories with Custom Photography Thumbnails */}
      <CategorySlider />

      {/* 3. Promotional Bento Banners (Flash Deals, Organics, Festival Bundles) */}
      <PromoBanners />

      {/* 4. Popular Household Staples & Bestsellers with Category Filter Tabs */}
      <ProductGridSection
        title="Most Popular Staples"
        subtitle="Frequently purchased household favorites, stone-ground flours, and unpolished dals"
        products={bestsellers.length > 0 ? bestsellers : featured}
        viewAllLink="/shop?sort=popularity"
        categories={[
          { id: "cat_dryfruits", name: "Dry Fruits & Nuts" },
          { id: "cat_rice", name: "Rice & Grains" },
          { id: "cat_dals", name: "Lentils & Pulses" },
          { id: "cat_spices", name: "Spices & Masalas" },
        ]}
      />

      {/* 5. Curated Value Bundles & Festival Hampers */}
      <ComboShowcase />

      {/* 6. Farm Bandi Organics & Harvested Cold-Pressed Essentials */}
      <ProductGridSection
        title="Farm Bandi Single-Origin Organics"
        subtitle="Pesticide-free, traditionally cold-pressed oils and heirloom grains direct from Indian farmers"
        products={organicProducts.length > 0 ? organicProducts : featured}
        viewAllLink="/shop?organic=true"
      />

      {/* 7. Partner Brands & Quality Accreditations */}
      <BrandShowcase />

      {/* 8. Interactive 3D Farm-to-Kitchen Experience */}
      <Interactive3DWrapper />

      {/* 9. Trust Guarantees, Verified UK Reviews & Newsletter */}
      <TrustAndReviews />
    </div>
  );
}
