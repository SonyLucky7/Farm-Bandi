"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
    <footer className="bg-[#081B13] text-white pt-8 pb-24 md:pb-8 border-t border-emerald-950">
      {/* 1. Compact Newsletter Banner */}
      <div className="container mx-auto px-4 pb-8 border-b border-emerald-900/50">
        <div className="bg-gradient-to-r from-emerald-950 via-[#0B2A1E] to-[#0A1F16] rounded-2xl p-4 sm:p-6 border border-emerald-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight text-center md:text-left">
            Get £5 OFF — Join 15k families
          </h3>
          
          <form
            onSubmit={handleNewsletterSubmit}
            className="w-full md:w-auto flex flex-col sm:flex-row items-stretch gap-2 shrink-0"
          >
            {isSubscribed ? (
              <div className="flex items-center justify-center gap-2 bg-emerald-800/60 border border-emerald-700 text-emerald-100 px-5 py-2.5 rounded-full text-sm font-bold">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>You're in! Use voucher WELCOME5</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address..."
                  required
                  className="px-4 py-2.5 bg-white/10 text-white placeholder-emerald-300/60 text-sm rounded-full border border-emerald-700/80 focus:border-amber-400 focus:bg-white/15 outline-none transition-all w-full sm:w-64"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D4A373] hover:bg-[#c49262] text-gray-950 font-bold text-sm rounded-full transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={14} />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* 2. 4-Column Link Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-6 pb-8 border-b border-emerald-900/60">
          
          {/* Column 1: Brand (Wider, Col Span 4) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 flex flex-col items-start">
            <Link
              href="/"
              className="inline-block mb-3 bg-white px-3 py-1.5 rounded-xl shadow-sm hover:opacity-95 transition-opacity"
              title="Farm Bandi"
            >
              <Image
                src="/images/logo.png"
                alt={SITE_CONFIG.name || "Farm Bandi"}
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-emerald-200/70 mb-4 max-w-sm">
              Farm-fresh Indian groceries delivered across the UK.
            </p>
            <div className="flex flex-col gap-1.5 text-sm text-emerald-200/70">
              <p>0800 246 1890</p>
              <p>support@raithannamarket.co.uk</p>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3">
            <h4 className="text-sm font-semibold text-white mb-3">Shop</h4>
            <ul className="flex flex-col gap-2 text-sm text-emerald-200/70">
              <li><Link href="/category/rice-rice-products" className="hover:text-white transition-colors">Basmati & Rice</Link></li>
              <li><Link href="/category/beans-dals-pulses" className="hover:text-white transition-colors">Dals & Pulses</Link></li>
              <li><Link href="/category/spices" className="hover:text-white transition-colors">Spices & Masalas</Link></li>
              <li><Link href="/category/dry-fruits-nuts-seeds" className="hover:text-white transition-colors">Dry Fruits & Nuts</Link></li>
              <li><Link href="/category/sweets-snacks" className="hover:text-white transition-colors">Sweets & Namkeen</Link></li>
              <li><Link href="/category/fruits-vegetables" className="hover:text-white transition-colors">Fresh Produce</Link></li>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3">
            <h4 className="text-sm font-semibold text-white mb-3">Help</h4>
            <ul className="flex flex-col gap-2 text-sm text-emerald-200/70">
              <li><Link href="/account/orders" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Delivery</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2 mt-2 md:mt-0">
            <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
            <ul className="flex flex-col gap-2 text-sm text-emerald-200/70">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/quality" className="hover:text-white transition-colors">Quality</Link></li>
              <li><Link href="/story" className="hover:text-white transition-colors">Story</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* 3. Payment & Copyright Row */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {PAYMENT_METHODS.map((pm) => (
              <div
                key={pm.name}
                className="bg-white rounded p-1 h-7 flex items-center justify-center border border-gray-100"
                title={pm.name}
              >
                <Image
                  src={pm.src}
                  alt={pm.name}
                  width={pm.width}
                  height={pm.height}
                  className="h-4 w-auto object-contain"
                />
              </div>
            ))}
          </div>
          
          <div className="text-sm text-emerald-200/70 text-center md:text-right">
            &copy; 2026 Farm Bandi UK Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
