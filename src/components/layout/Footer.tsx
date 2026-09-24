"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS, SITE_CONFIG } from "@/lib/constants";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Heart,
  Truck,
  Sparkles,
  Lock,
  ArrowRight,
  CheckCircle2,
  Clock,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

const PAYMENT_METHODS = [
  { name: "Visa", src: "/images/payments/visa.png", width: 50, height: 32 },
  { name: "Mastercard", src: "/images/payments/mastercard.png", width: 50, height: 32 },
  { name: "American Express", src: "/images/payments/amex.png", width: 50, height: 32 },
  { name: "Apple Pay", src: "/images/payments/applepay.png", width: 50, height: 32 },
  { name: "Google Pay", src: "/images/payments/gpay.png", width: 50, height: 32 },
  { name: "PayPal", src: "/images/payments/paypal.png", width: 50, height: 32 },
  { name: "UPI Instant", src: "/images/payments/upi.png", width: 50, height: 32 },
  { name: "Klarna", src: "/images/payments/klarna.png", width: 50, height: 32 },
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsSubscribed(true);
    toast.success("Welcome to Farm Bandi! Your £5 discount voucher is WELCOME5.");
  };

  return (
    <footer className="bg-[#081B13] text-white pt-12 pb-24 md:pb-12 border-t border-emerald-950">
      {/* 1. Value & Trust Guarantee Strip */}
      <div className="container mx-auto px-4 pb-12 border-b border-emerald-900/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 bg-emerald-950/40 p-4 rounded-2xl border border-emerald-800/40">
            <div className="w-11 h-11 rounded-xl bg-emerald-800/40 flex items-center justify-center shrink-0 text-[#D4A373]">
              <Sparkles size={22} />
            </div>
            <div>
              <div className="font-bold text-sm text-white">Direct Farm Harvest</div>
              <div className="text-xs text-emerald-200/70 mt-0.5">
                450+ farmer families, 100% single-origin
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-emerald-950/40 p-4 rounded-2xl border border-emerald-800/40">
            <div className="w-11 h-11 rounded-xl bg-emerald-800/40 flex items-center justify-center shrink-0 text-[#D4A373]">
              <Truck size={22} />
            </div>
            <div>
              <div className="font-bold text-sm text-white">Next-Day UK Delivery</div>
              <div className="text-xs text-emerald-200/70 mt-0.5">
                Temperature managed cold-chain packaging
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-emerald-950/40 p-4 rounded-2xl border border-emerald-800/40">
            <div className="w-11 h-11 rounded-xl bg-emerald-800/40 flex items-center justify-center shrink-0 text-[#D4A373]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="font-bold text-sm text-white">Certified UK Quality</div>
              <div className="text-xs text-emerald-200/70 mt-0.5">
                UK Food Standards &amp; pesticide batch tested
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-emerald-950/40 p-4 rounded-2xl border border-emerald-800/40">
            <div className="w-11 h-11 rounded-xl bg-emerald-800/40 flex items-center justify-center shrink-0 text-[#D4A373]">
              <Lock size={22} />
            </div>
            <div>
              <div className="font-bold text-sm text-white">256-Bit Encrypted Pay</div>
              <div className="text-xs text-emerald-200/70 mt-0.5">
                Visa, Mastercard, Apple Pay, PayPal &amp; UPI
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Newsletter Subscription Row */}
      <div className="container mx-auto px-4 py-10 border-b border-emerald-900/50">
        <div className="bg-gradient-to-r from-emerald-950 via-[#0B2A1E] to-[#0A1F16] rounded-3xl p-6 sm:p-8 border border-emerald-800/60 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} className="text-amber-400" />
              <span>Special Welcome Offer</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-1.5">
              Get £5 OFF Your First Grocery Basket
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
              Join 15,000+ UK South Asian families receiving seasonal harvest updates, Diwali hamper pre-orders, and secret weekly deals.
            </p>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch gap-2.5 max-w-md shrink-0"
          >
            {isSubscribed ? (
              <div className="flex items-center gap-2 bg-emerald-800/60 border border-emerald-700 text-emerald-100 px-5 py-3 rounded-full text-xs font-bold">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>You&apos;re in! Use voucher WELCOME5 at checkout.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="px-4 py-3 bg-white/10 text-white placeholder-emerald-300/60 text-xs sm:text-sm rounded-full border border-emerald-700/80 focus:border-amber-400 focus:bg-white/15 outline-none transition-all w-full sm:w-64"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D4A373] hover:bg-[#c49262] text-gray-950 font-bold text-xs sm:text-sm rounded-full transition-all shadow-md hover:shadow-lg shrink-0 flex items-center justify-center gap-1.5"
                >
                  <span>Claim £5 Voucher</span>
                  <ArrowRight size={14} />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* 3. Main Multi-Column Footer Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-emerald-900/60">
          {/* Column 1: Brand & UK Hub (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link
              href="/"
              className="inline-block mb-4 bg-white px-3.5 py-2 rounded-2xl shadow-sm hover:opacity-95 transition-opacity"
              title="Farm Bandi"
            >
              <Image
                src="/images/logo.png"
                alt={SITE_CONFIG.name}
                width={180}
                height={54}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-xs text-emerald-200/80 mb-6 max-w-sm leading-relaxed">
              Direct-to-consumer international grocery bringing certified single-origin Indian flours, pulses, stone-pressed oils, exotic mangoes, and pooja essentials to homes across the United Kingdom.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-emerald-200/90 w-full">
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#D4A373] shrink-0" />
                <span>
                  UK Freephone: <strong>0800 246 1890</strong> (Mon–Sun, 8am–8pm)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle size={14} className="text-[#D4A373] shrink-0" />
                <span>
                  WhatsApp Helpdesk: <strong>+44 7400 123456</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#D4A373] shrink-0" />
                <span>support@raithannamarket.co.uk</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#D4A373] shrink-0 mt-0.5" />
                <span>London Distribution Hub, Unit 4B, Park Royal Logistics Park, London NW10 7HQ</span>
              </div>
            </div>
          </div>

          {/* Column 2: Shop Aisles (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
              <span>Shop Aisles</span>
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-emerald-200/80">
              <li>
                <Link href="/category/rice-rice-products" className="hover:text-white hover:underline transition-colors">
                  Basmati &amp; Rice
                </Link>
              </li>
              <li>
                <Link href="/category/beans-dals-pulses" className="hover:text-white hover:underline transition-colors">
                  Dals &amp; Pulses
                </Link>
              </li>
              <li>
                <Link href="/category/spices" className="hover:text-white hover:underline transition-colors">
                  Spices &amp; Masalas
                </Link>
              </li>
              <li>
                <Link href="/category/dry-fruits-nuts-seeds" className="hover:text-white hover:underline transition-colors">
                  Dry Fruits &amp; Nuts
                </Link>
              </li>
              <li>
                <Link href="/category/sweets-snacks" className="hover:text-white hover:underline transition-colors">
                  Sweets &amp; Namkeen
                </Link>
              </li>
              <li>
                <Link href="/category/fruits-vegetables" className="hover:text-white hover:underline transition-colors">
                  Fresh Produce
                </Link>
              </li>
              <li>
                <Link href="/combos" className="text-amber-300 font-semibold hover:underline transition-colors">
                  Combos &amp; Packs (Save £15)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
              <span>Customer Care</span>
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-emerald-200/80">
              <li>
                <Link href="/account/orders" className="hover:text-white hover:underline transition-colors">
                  Track My Order
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white hover:underline transition-colors">
                  UK Delivery Rates
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white hover:underline transition-colors">
                  Returns &amp; Refunds
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white hover:underline transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/quality" className="hover:text-white hover:underline transition-colors">
                  Quality &amp; Sourcing Promise
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Account & Legal (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
              <span>Account &amp; Trust</span>
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-emerald-200/80">
              <li>
                <Link href="/account" className="hover:text-white hover:underline transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white hover:underline transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/account/subscriptions" className="hover:text-white hover:underline transition-colors">
                  Pantry Subscriptions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white hover:underline transition-colors">
                  Privacy &amp; Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white hover:underline transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition-colors">
                  About Farm Bandi
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Fair Trade Direct Spotlight (2 Cols) */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-emerald-950/90 to-[#0F3526] border border-emerald-700/60 rounded-2xl p-4.5 text-xs text-emerald-200/90 flex flex-col justify-between h-full shadow-sm">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-2">
                  <ShieldCheck size={16} className="text-amber-400" />
                  <span>Fair Trade Direct</span>
                </div>
                <p className="text-[11px] leading-relaxed text-emerald-100/75">
                  Over 450+ farmer families in Andhra Pradesh &amp; Telangana receive above-MSP fair compensation for single-origin harvests.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-800/60">
                <Link
                  href="/story"
                  className="text-amber-300 hover:text-amber-200 font-bold text-[11px] inline-flex items-center gap-1 group"
                >
                  <span>Read Farmer Stories</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Payment Methods & Security Logos Row */}
        <div className="py-8 flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-emerald-900/60">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="text-xs font-bold text-emerald-200/90 flex items-center gap-1.5">
              <Lock size={14} className="text-emerald-400" />
              <span>100% Secure UK Payments Accepted:</span>
            </div>

            {/* Payment Method PNG Badges */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {PAYMENT_METHODS.map((pm) => (
                <div
                  key={pm.name}
                  className="bg-white rounded-lg p-1 h-7 sm:h-8 min-w-[44px] sm:min-w-[48px] flex items-center justify-center shadow-xs border border-gray-100 hover:scale-105 transition-transform"
                  title={`${pm.name} accepted`}
                >
                  <Image
                    src={pm.src}
                    alt={pm.name}
                    width={pm.width}
                    height={pm.height}
                    className="h-5 sm:h-6 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* UK Regulatory & Quality Badges */}
          <div className="flex items-center gap-3 text-xs text-emerald-300/80 font-medium">
            <span className="inline-flex items-center gap-1 bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-800/60">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>256-Bit SSL Encrypted</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-800/60">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>UK Food Standards Agency Compliant</span>
            </span>
          </div>
        </div>

        {/* 5. Copyright & Safe Area Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-emerald-300/70 gap-3 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} Raithanna Market UK Ltd (Trading as Farm Bandi). Registered in England &amp; Wales (Company No. 14829104). VAT GB445982103.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span>Crafted for UK South Asian Households</span>
              <Heart size={12} className="fill-current text-rose-400" />
            </span>
            <span>•</span>
            <span className="text-emerald-300/80">🇬🇧 GBP (£)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
