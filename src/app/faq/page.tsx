"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Truck, Package, RotateCcw, ShieldCheck } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const FAQS = [
  {
    q: "How does Raithanna Market ensure produce freshness during shipping?",
    a: "All fresh vegetables, tropical fruits, and dairy products are packaged in custom insulated moisture-barrier boxes with food-grade gel refrigerant packs. We use overnight and same-day delivery partners to guarantee farm-to-table freshness.",
  },
  {
    q: "What are the delivery charges and thresholds for free delivery?",
    a: "Orders over £50 automatically qualify for FREE Standard Delivery anywhere in the United Kingdom. For orders below £50, standard shipping is £3.99 (2-4 business days), express delivery is £6.99 (1-2 business days), and same-day delivery is £9.99 for select postcodes.",
  },
  {
    q: "Are your dry fruits, spices, and flours 100% genuine and certified?",
    a: "Yes. All Farm Bandi and imported partner products undergo rigorous batch testing for chemical residues and aflatoxins, and comply fully with UK and EU food import safety regulations.",
  },
  {
    q: "What is your refund policy if an item arrives damaged or bruised?",
    a: "We offer a 100% Quality Freshness Guarantee. Simply message our WhatsApp support desk (+44 7123 456789) or email us with a photograph within 48 hours of delivery. We will issue an immediate refund to your original payment method or wallet credit.",
  },
  {
    q: "How do Weekly Basket Subscriptions work?",
    a: "Our recurring baskets let you schedule automated deliveries of weekly staples (milk, vegetables, flours, lentils) and receive an automatic 10% discount on every shipment. You can pause, reschedule, or cancel anytime with zero commitments.",
  },
  {
    q: "Do you support international shipments outside the United Kingdom?",
    a: "Yes, we ship non-perishable groceries (spices, dals, basmati rice, dry fruits, pooja items) across the Republic of Ireland and continental Europe.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Frequently Asked Questions", href: "/faq" },
          ]}
          className="mb-4"
        />

        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#2D6A4F] bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <HelpCircle size={14} />
            <span>Answers to Common Questions</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Everything you need to know about deliveries, freshness guarantees, and subscriptions.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-gray-900 hover:text-[#2D6A4F] transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#2D6A4F]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
