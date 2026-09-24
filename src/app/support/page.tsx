"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  Mail,
  Phone,
  MessageSquare,
  Search,
  ChevronDown,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { toast } from "sonner";

export default function SupportPage() {
  const [ticketData, setTicketData] = useState({
    name: "",
    email: "",
    orderId: "",
    subject: "Order Status Query",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support ticket #RM-TK819 created! Our support team will reply within 2 hours.");
    setTicketData({ name: "", email: "", orderId: "", subject: "Order Status Query", message: "" });
  };

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Help & Support", href: "/support" },
          ]}
          className="mb-4"
        />

        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#2D6A4F] bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Headphones size={14} />
            <span>Customer Care 7 Days a Week</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-2">
            How Can We Help You Today?
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Get instant help with order delivery, missing items, product freshness, or bulk order requests.
          </p>
        </div>

        {/* Contact Methods Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {/* WhatsApp */}
          <a
            href="https://wa.me/447123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-3xl p-6 border border-emerald-200/80 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center group"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MessageSquare size={26} />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">WhatsApp Chat Support</h3>
            <p className="text-xs text-gray-500 mb-3">Fastest responses for live order queries</p>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Chat on WhatsApp &rarr;
            </span>
          </a>

          {/* Phone */}
          <a
            href="tel:+442081234567"
            className="bg-white rounded-3xl p-6 border border-gray-200/80 hover:border-[#2D6A4F] shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center group"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Phone size={26} />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">Telephone Line</h3>
            <p className="text-xs text-gray-500 mb-3">Mon - Sat: 8:00 AM - 7:00 PM GMT</p>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full font-mono">
              +44 20 8123 4567
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:support@raithannamarket.com"
            className="bg-white rounded-3xl p-6 border border-gray-200/80 hover:border-[#2D6A4F] shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center group"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Mail size={26} />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">Email Desk</h3>
            <p className="text-xs text-gray-500 mb-3">Detailed inquiries &amp; business partnerships</p>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full">
              support@raithannamarket.com
            </span>
          </a>
        </div>

        {/* Support Ticket Submission Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-xs mb-12">
          <h2 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Send Us an Online Inquiry
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Fill in the details below and an international food support specialist will get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Your Name *</label>
              <input
                type="text"
                required
                value={ticketData.name}
                onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                placeholder="Priya Sharma"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                value={ticketData.email}
                onChange={(e) => setTicketData({ ...ticketData, email: e.target.value })}
                placeholder="name@example.co.uk"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Order ID (if applicable)</label>
              <input
                type="text"
                value={ticketData.orderId}
                onChange={(e) => setTicketData({ ...ticketData, orderId: e.target.value })}
                placeholder="e.g. RM-892415"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Topic / Subject</label>
              <select
                value={ticketData.subject}
                onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden bg-white"
              >
                <option value="Order Status Query">Where is my order?</option>
                <option value="Damaged / Missing Product">Damaged / Missing item in parcel</option>
                <option value="Produce Freshness Guarantee">Produce freshness inquiry</option>
                <option value="Billing / Payment / Refund">Payment &amp; Refund request</option>
                <option value="Wholesale / Bulk Inquiry">Wholesale or Festival bulk order</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Your Message *</label>
              <textarea
                required
                rows={4}
                value={ticketData.message}
                onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                placeholder="Describe your issue or inquiry with specific details..."
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-2 pt-2 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-[#2D6A4F] hover:bg-[#23533e] text-white font-bold text-xs sm:text-sm rounded-full transition-all shadow-md"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>

        {/* Quick FAQ links */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Looking for quick answers? Visit our{" "}
            <Link href="/faq" className="text-[#2D6A4F] font-bold underline">
              Frequently Asked Questions (FAQ)
            </Link>{" "}
            or check our{" "}
            <Link href="/shipping" className="text-[#2D6A4F] font-bold underline">
              Shipping &amp; Delivery Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
