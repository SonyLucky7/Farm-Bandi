import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Heart, Users, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "About Us | Raithanna Market & Farm Bandi",
  description: "Learn about Raithanna Market - bridging genuine Indian farming communities with diaspora households across the UK and internationally.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
          ]}
          className="mb-4"
        />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#2D6A4F] bg-emerald-100/70 px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4">
            <Sparkles size={14} />
            <span>Rooted in Earth • Driven by Purity</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-5xl font-extrabold text-[#1A1A1A] leading-tight mb-4">
            Connecting Real Indian Farms With UK Kitchens
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            &ldquo;Raithanna&rdquo; translates to <em>&ldquo;Farmer Brother&rdquo;</em> in Telugu. We established Raithanna Market and our flagship brand <strong>Farm Bandi</strong> to honor agrarian heritage, eliminate middlemen, and bring unadulterated staples directly to homes abroad.
          </p>
        </div>

        {/* Brand Story Visual Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-md mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border">
              <Image
                src="/images/hero-banner.jpg"
                alt="Farm Bandi Harvest"
                fill
                className="object-cover"
              />
            </div>

            <div className="md:col-span-6 space-y-4">
              <div className="bg-gray-50 p-2.5 rounded-2xl inline-block border mb-1">
                <Image src="/images/logo.png" alt="Farm Bandi Logo" width={140} height={45} className="h-auto w-auto" />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-gray-900">
                The Farm Bandi Philosophy
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Traditional Indian cuisine relies on potency, freshness, and oil content of spices, lentils, and dry fruits. Commercial mass-market retail often strips essential nutrients via mechanical over-processing.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Farm Bandi partners directly with orchards in Telangana, Andhra Pradesh, Karnataka, and Maharashtra. We ensure sun-dried natural processing, hygienic packaging, and cold-chain air cargo dispatch straight to our UK distribution centers.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#2D6A4F] flex items-center justify-center mb-3">
              <Users size={26} />
            </div>
            <h3 className="font-playfair text-lg font-bold text-gray-900 mb-1">Farmer Empowerment</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We pay fair-trade ethical premiums above wholesale mandi rates, empowering rural families with dignified livelihoods.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <ShieldCheck size={26} />
            </div>
            <h3 className="font-playfair text-lg font-bold text-gray-900 mb-1">Zero Adulteration</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Strict chemical residue testing, unpolished dals, and pure non-irradiated whole spices certified for UK food standards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#E76F51] flex items-center justify-center mb-3">
              <Heart size={26} />
            </div>
            <h3 className="font-playfair text-lg font-bold text-gray-900 mb-1">Taste of Home</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Recreating Sunday family flavors and festival rituals for thousands of diaspora households across Great Britain and Europe.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#2D6A4F] to-[#1e4a36] text-white rounded-3xl p-8 text-center max-w-2xl mx-auto shadow-md">
          <h3 className="font-playfair text-2xl font-bold mb-2">Taste The Authentic Difference</h3>
          <p className="text-xs text-emerald-100 mb-6 max-w-md mx-auto">
            Try our Farm Bandi cashews, stone-ground flours, or fresh produce boxes with free UK delivery on orders above £50.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-[#D4A373] text-[#1A1A1A] font-bold text-xs sm:text-sm rounded-full hover:bg-[#c29161] transition-all inline-flex items-center space-x-2"
          >
            <span>Start Shopping Now</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
