"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Star,
  Quote,
  Mail,
  MapPin,
} from "lucide-react";
import { reviews } from "@/lib/data/reviews";
import { toast } from "sonner";

export default function TrustAndReviews() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsSubscribed(true);
    toast.success("Welcome! You've received 10% off code: WELCOME10");
  };

  return (
    <div className="bg-[#F8F9FA]">
      {/* 1. Subscription Basket Banner */}
      <section className="py-8 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden bg-[#0C2A1E] text-white p-6 sm:p-10 md:p-14 shadow-xl border border-emerald-900/60">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4">
                  <Calendar size={14} className="text-amber-400" />
                  <span>Never Run Out of Pantry Staples</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
                  Weekly &amp; Monthly Grocery Baskets
                </h3>

                <p className="text-xs sm:text-sm md:text-base text-emerald-100/90 max-w-xl mb-6 leading-relaxed font-normal">
                  Schedule recurring deliveries for Sona Masoori rice, fresh curry leaves, atta, dals and cold-pressed oils. Pause, skip, or cancel anytime with zero commitments — plus an extra 10% discount on every auto-delivery.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/account/subscriptions"
                    className="px-6 py-3.5 bg-[#D4A373] hover:bg-[#c69360] text-gray-950 font-bold text-xs sm:text-sm rounded-full transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <span>Create Recurring Basket</span>
                    <ArrowRight size={16} />
                  </Link>
                  <span className="text-xs text-emerald-200 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 size={15} className="text-emerald-400" />
                    Modify products or frequency anytime
                  </span>
                </div>
              </div>

              <div className="md:col-span-4 relative h-48 sm:h-64 w-full rounded-2xl overflow-hidden shadow-xl border border-white/20">
                <Image
                  src="/images/categories/category-fruits.jpg"
                  alt="Subscription Fresh Basket"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Key Customer Guarantees */}
      <section className="py-10 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/60 border border-gray-100 hover:border-emerald-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#155E40] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-gray-900">Next-Day UK Delivery</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Free nationwide shipping on orders over £50. Dispatched same-day before 4 PM.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/60 border border-gray-100 hover:border-amber-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 shadow-2xs">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-gray-900">100% Fresh &amp; Authentic</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Single-origin harvests direct from certified farmers &amp; official brands.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/60 border border-gray-100 hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#E76F51] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <RotateCcw size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-gray-900">Freshness Refund Guarantee</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Hassle-free replacement or credit if any produce does not meet your standard.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/60 border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Headphones size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-gray-900">7-Day UK Support</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Live phone and WhatsApp customer care based right here in London.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Customer Testimonials Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#155E40] uppercase tracking-wider mb-2">
              <Star size={14} className="fill-current text-amber-400" />
              <span>Verified Customer Love</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight">
              Trusted by 12,000+ UK Households
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Authentic Indian groceries delivered fresh to doorsteps from London to Edinburgh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {"★".repeat(review.rating)}
                    </div>
                    {review.isVerifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        <CheckCircle2 size={11} className="text-[#155E40]" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-6 font-normal">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-gray-900 block">{review.userName}</span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin size={11} />
                      <span>London, UK</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Newsletter Subscription Banner */}
      <section className="pb-12 sm:pb-16">
        <div className="container mx-auto px-4">
          <div className="w-full bg-[#0C2A1E] text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden border border-emerald-900/60 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 mb-4 border border-white/15">
              <Mail size={22} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight">
              Get £5 Off Your First Order
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 mb-6 max-w-md mx-auto leading-relaxed">
              Subscribe to get fresh harvest arrivals, festive Diwali hamper pre-orders, and seasonal mango notifications.
            </p>

            {isSubscribed ? (
              <div className="bg-emerald-800/80 border border-emerald-500/40 text-white text-xs font-bold py-3 px-6 rounded-full inline-block">
                🎉 Welcome to Raithanna Market! Use code <span className="underline text-amber-300 font-mono text-sm ml-1">WELCOME10</span> at checkout.
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex w-full bg-white rounded-full p-1.5 shadow-lg max-w-md border-2 border-transparent focus-within:border-[#D4A373] focus-within:ring-2 focus-within:ring-[#D4A373]/20 transition-all"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-2 text-xs sm:text-sm text-gray-900 border-none outline-none focus:outline-none focus:ring-0 bg-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D4A373] hover:bg-[#c69360] text-gray-950 font-bold text-xs sm:text-sm rounded-full transition-colors flex-shrink-0 cursor-pointer shadow-xs"
                >
                  Claim £5 Voucher
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
