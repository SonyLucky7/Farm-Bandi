"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Plus, Pause, Play, Trash2, CheckCircle2, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { toast } from "sonner";

export default function AccountSubscriptionsPage() {
  const [isActive, setIsActive] = useState(true);

  const toggleSubscription = () => {
    setIsActive((prev) => !prev);
    toast.success(isActive ? "Recurring basket paused" : "Recurring basket resumed!");
  };

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "My Account", href: "/account" },
            { label: "Basket Subscriptions", href: "/account/subscriptions" },
          ]}
          className="mb-4"
        />

        <div className="flex items-center justify-between mb-8 pb-4 border-b">
          <div>
            <h1 className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              My Grocery Baskets (Subscribe &amp; Save 10%)
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Automated recurring deliveries for weekly essentials with zero cancellation fees
            </p>
          </div>
        </div>

        {/* Active Subscription Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-playfair text-xl font-bold text-gray-900">
                  Weekly Family Staples Basket
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    isActive ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isActive ? "ACTIVE" : "PAUSED"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Frequency: <strong>Every Tuesday</strong> • Next Scheduled Delivery: <strong>29 Sep 2026</strong>
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleSubscription}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 flex items-center space-x-1.5"
              >
                {isActive ? (
                  <>
                    <Pause size={14} />
                    <span>Pause Delivery</span>
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    <span>Resume Delivery</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Included Products */}
          <div className="py-6 border-b border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
              Items in this Weekly Basket
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 rounded-2xl border flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-white border relative overflow-hidden flex-shrink-0">
                  <Image src="/images/categories/category-fruits.jpg" alt="" fill className="object-cover" />
                </div>
                <div>
                  <span className="font-bold text-xs text-gray-900 block truncate">Weekly Veg Box</span>
                  <span className="text-[11px] text-gray-500">Fresh Okra, Curry Leaves, Chilies</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-white border relative overflow-hidden flex-shrink-0">
                  <Image src="/images/categories/category-dals.jpg" alt="" fill className="object-cover" />
                </div>
                <div>
                  <span className="font-bold text-xs text-gray-900 block truncate">Organic Toor Dal</span>
                  <span className="text-[11px] text-gray-500">1kg bag</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-white border relative overflow-hidden flex-shrink-0">
                  <Image src="/images/categories/category-rice.jpg" alt="" fill className="object-cover" />
                </div>
                <div>
                  <span className="font-bold text-xs text-gray-900 block truncate">Basmati Rice</span>
                  <span className="text-[11px] text-gray-500">5kg bag</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-gray-500 gap-2">
            <span>Delivered to: 42 Richmond Road, London, E8 3HN</span>
            <span className="font-bold text-gray-900">Recurring Price: £24.20 / week</span>
          </div>
        </div>
      </div>
    </div>
  );
}
