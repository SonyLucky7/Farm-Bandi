"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
  Truck,
  Tag,
} from "lucide-react";

interface SlideData {
  id: string;
  headline: string;
  headlineHighlight: string;
  highlightColor: string;
  subtitle: string;
  pillText: string;
  pillColor: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  primaryCtaBg: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  bgImage: string;
  gradientClass: string;
}

const SLIDES: SlideData[] = [
  {
    id: "festival",
    headline: "Grand Festival Hampers,",
    headlineHighlight: "Crafted For Pure Celebrations.",
    highlightColor: "#FFD166",
    subtitle:
      "Handcrafted Kaju Katli, traditional Motichoor Ladoos, and luxury dry-fruit gift boxes. Bring the warm festive traditions of home directly to your UK celebrations.",
    pillText: "Special 15% OFF — Use Code FESTIVAL15",
    pillColor: "bg-amber-500/25 text-amber-200 border-amber-400/40",
    primaryCtaText: "Explore Festival Hampers",
    primaryCtaHref: "/festival",
    primaryCtaBg: "bg-[#D4A373] hover:bg-[#c69360] text-gray-950",
    secondaryCtaText: "Traditional Sweets",
    secondaryCtaHref: "/category/sweets-snacks",
    bgImage: "/images/hero-festival.jpg",
    gradientClass:
      "from-[#1F080C] via-[#1F080C]/90 to-[#1F080C]/40 lg:from-[#1F080C] lg:via-[#1F080C]/85 lg:via-50% lg:to-transparent",
  },
  {
    id: "fresh",
    headline: "Authentic Indian Groceries,",
    headlineHighlight: "Harvested Fresh For You.",
    highlightColor: "#E5B880",
    subtitle:
      "Single-origin pulses, cold-pressed oils, stone-ground flours, and seasonal Banganapalli mangoes. Direct from 450+ partner farmers in Andhra Pradesh & Telangana.",
    pillText: "Free UK Delivery on Orders Over £50",
    pillColor: "bg-emerald-500/25 text-emerald-200 border-emerald-400/40",
    primaryCtaText: "Shop Fresh Groceries",
    primaryCtaHref: "/shop",
    primaryCtaBg: "bg-[#D4A373] hover:bg-[#c69360] text-gray-950",
    secondaryCtaText: "Explore Categories",
    secondaryCtaHref: "/categories",
    bgImage: "/images/hero-banner.jpg",
    gradientClass:
      "from-[#071F16] via-[#071F16]/90 to-[#071F16]/40 lg:from-[#071F16] lg:via-[#071F16]/85 lg:via-50% lg:to-transparent",
  },
  {
    id: "deals",
    headline: "Pantry Staples & Spices,",
    headlineHighlight: "Big Family Bundle Savings.",
    highlightColor: "#F4A261",
    subtitle:
      "Aged Royal Basmati Rice, Pure Desi A2 Cow Ghee, protein-packed Toor Dal, and aromatic whole spices curated into super-saver monthly combos.",
    pillText: "Save up to £15 on Essential Combos",
    pillColor: "bg-orange-500/25 text-orange-200 border-orange-400/40",
    primaryCtaText: "Shop Combos & Save",
    primaryCtaHref: "/combos",
    primaryCtaBg: "bg-[#E76F51] hover:bg-[#d55e42] text-white",
    secondaryCtaText: "Today's Flash Deals",
    secondaryCtaHref: "/offers",
    bgImage: "/images/hero-deals.jpg",
    gradientClass:
      "from-[#180A04] via-[#180A04]/90 to-[#180A04]/40 lg:from-[#180A04] lg:via-[#180A04]/85 lg:via-50% lg:to-transparent",
  },
];

const AUTOPLAY_INTERVAL = 6000; // 6 seconds

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Autoplay timer with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch gesture support for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section className="relative bg-[#F8F9FA] pt-0 pb-0 sm:pt-2 sm:pb-4 md:pt-3 md:pb-6">
      <div className="container mx-auto px-0 sm:px-4">
        {/* Main Hero Banner Container */}
        <div
          className="relative rounded-none sm:rounded-3xl overflow-hidden shadow-xl border-0 sm:border sm:border-gray-900/20 bg-gray-950 group select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Synchronized Slides */}
          <div className="relative w-full">
            {SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`transition-opacity duration-700 ease-in-out ${
                    isActive
                      ? "relative opacity-100 z-10 pointer-events-auto"
                      : "absolute inset-0 opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {/* Background Image */}
                  <Image
                    src={slide.bgImage}
                    alt={slide.headline}
                    fill
                    priority={index === 0}
                    className="object-cover object-center lg:object-[80%_center] transition-transform duration-1000 scale-100 group-hover:scale-102"
                    sizes="(max-width: 1024px) 100vw, 1400px"
                  />

                  {/* Dark Gradient per slide */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${slide.gradientClass}`} />

                  {/* Active Slide Content */}
                  <div className="relative z-10 flex flex-col justify-between min-h-[280px] sm:min-h-[430px] lg:min-h-[460px] px-5 sm:px-12 md:px-16 lg:px-20 py-5 sm:py-10 md:py-12">
                    {/* Top Content Block */}
                    <div className="max-w-2xl lg:max-w-3xl">
                      {/* High-Impact Headline */}
                      <h1
                        className="text-xl sm:text-3xl md:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.15] mb-2 sm:mb-3 drop-shadow-xs"
                        style={{ color: "#FFFFFF" }}
                      >
                        {slide.headline} <br className="hidden sm:inline" />
                        <span style={{ color: slide.highlightColor }} className="italic font-serif">
                          {slide.headlineHighlight}
                        </span>
                      </h1>

                      {/* Subtitle Value Proposition */}
                      <p className="text-[11px] sm:text-sm md:text-base text-gray-200/90 mb-3 sm:mb-5 max-w-xl leading-relaxed font-normal">
                        {slide.subtitle}
                      </p>

                      {/* Value Callout Badge */}
                      <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                        <span
                          className={`px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold border backdrop-blur-xs flex items-center gap-1.5 ${slide.pillColor}`}
                        >
                          <Tag size={12} className="sm:w-[13px] sm:h-[13px]" />
                          <span>{slide.pillText}</span>
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-3.5 mb-2 sm:mb-6">
                        <Link
                          href={slide.primaryCtaHref}
                          className={`w-full sm:w-auto group inline-flex justify-center items-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-full font-extrabold text-[13px] sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 ${slide.primaryCtaBg}`}
                        >
                          <span>{slide.primaryCtaText}</span>
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                            <ArrowUpRight size={14} />
                          </div>
                        </Link>

                        <Link
                          href={slide.secondaryCtaHref}
                          className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/25 backdrop-blur-md transition-all duration-200"
                        >
                          <span>{slide.secondaryCtaText}</span>
                        </Link>
                      </div>
                    </div>

                    {/* Bottom Trust Indicators */}
                    <div className="hidden sm:flex pt-4 border-t border-white/15 flex-wrap items-center gap-4 sm:gap-7 text-xs text-gray-200">
                      <div className="flex items-center gap-2">
                        <Truck size={14} className="text-amber-300 flex-shrink-0" />
                        <span className="font-medium">Free Delivery Over £50</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-amber-300 flex-shrink-0" />
                        <span className="font-medium">Same-Day Dispatch (4 PM)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-amber-300 flex-shrink-0" />
                        <span className="font-medium">100% Quality &amp; Freshness</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Flipkart / Amazon Style Minimalist Floating Dots Indicator */}
          <div className="absolute bottom-2 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentSlide
                    ? "w-6 sm:w-7 bg-white shadow-sm h-2 sm:h-1.5"
                    : "w-2 bg-white/40 hover:bg-white/70 h-2 sm:h-1.5"
                }`}
              />
            ))}
          </div>

          {/* Amazon / Flipkart Style Edge-Anchored Arrow Buttons (Appear on Hover) */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-16 w-9 sm:w-10 rounded-r-xl bg-black/30 hover:bg-black/60 text-white backdrop-blur-xs flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:w-11 cursor-pointer focus:opacity-100"
          >
            <ChevronLeft size={22} className="mr-0.5" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-16 w-9 sm:w-10 rounded-l-xl bg-black/30 hover:bg-black/60 text-white backdrop-blur-xs flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:w-11 cursor-pointer focus:opacity-100"
          >
            <ChevronRight size={22} className="ml-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
