"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! Your inquiry has been sent to our customer care team.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Contact Us", href: "/contact" },
          ]}
          className="mb-4"
        />

        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-2">
            Get in Touch With Us
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Have questions about product availability, trade inquiries, or dietary recommendations? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
            <h2 className="font-playfair text-xl font-bold text-gray-900">Headquarters &amp; Hub</h2>
            <div className="space-y-4 text-xs text-gray-600">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#2D6A4F] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-gray-900">UK Distribution Hub:</strong>
                  <span>Raithanna Market Logistics, Units 4-6 Riverway Industrial Estate, London, E8 3HN, UK</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone size={18} className="text-[#2D6A4F] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-gray-900">Phone Support:</strong>
                  <span>+44 20 8123 4567</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail size={18} className="text-[#2D6A4F] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-gray-900">General Enquiries:</strong>
                  <span>hello@raithannamarket.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
            <h2 className="font-playfair text-xl font-bold text-gray-900 mb-4">Send a Direct Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#2D6A4F] hover:bg-[#23533e] text-white font-bold text-xs sm:text-sm rounded-full transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
