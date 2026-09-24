"use client";

import Link from "next/link";
import {
  Package,
  MapPin,
  Calendar,
  Wallet,
  Heart,
  User,
  Settings,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function AccountDashboardPage() {
  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "My Account", href: "/account" },
          ]}
          className="mb-4"
        />

        {/* User Welcome Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center font-playfair text-2xl font-bold">
              PS
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Gold Grocery Member
              </span>
              <h1 className="font-playfair text-2xl font-bold text-gray-900 mt-1">
                Priya Sharma
              </h1>
              <p className="text-xs text-gray-500">priya.sharma@example.co.uk • +44 7911 123456</p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-center min-w-[140px]">
            <span className="text-[10px] font-bold uppercase text-emerald-800 block">Wallet Credit</span>
            <span className="text-xl font-extrabold text-[#2D6A4F]">£15.00</span>
          </div>
        </div>

        {/* Account Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {/* Card 1: Orders */}
          <Link
            href="/account/orders"
            className="group bg-white p-6 rounded-3xl border border-gray-200/80 hover:border-[#2D6A4F]/40 shadow-xs hover:shadow-md transition-all flex items-start space-x-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#2D6A4F] flex items-center justify-center flex-shrink-0">
              <Package size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#2D6A4F] transition-colors mb-1">
                My Orders
              </h3>
              <p className="text-xs text-gray-500 mb-2">Track active shipments, view invoices, and reorder</p>
              <span className="text-xs font-bold text-[#2D6A4F] flex items-center">
                <span>View orders</span> &rarr;
              </span>
            </div>
          </Link>

          {/* Card 2: Subscriptions */}
          <Link
            href="/account/subscriptions"
            className="group bg-white p-6 rounded-3xl border border-gray-200/80 hover:border-[#2D6A4F]/40 shadow-xs hover:shadow-md transition-all flex items-start space-x-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
              <Calendar size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#2D6A4F] transition-colors mb-1">
                Basket Subscriptions
              </h3>
              <p className="text-xs text-gray-500 mb-2">Manage weekly fresh deliveries &amp; save 10%</p>
              <span className="text-xs font-bold text-amber-800 flex items-center">
                <span>Manage basket</span> &rarr;
              </span>
            </div>
          </Link>

          {/* Card 3: Addresses */}
          <Link
            href="/account/addresses"
            className="group bg-white p-6 rounded-3xl border border-gray-200/80 hover:border-[#2D6A4F]/40 shadow-xs hover:shadow-md transition-all flex items-start space-x-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
              <MapPin size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#2D6A4F] transition-colors mb-1">
                Saved Addresses
              </h3>
              <p className="text-xs text-gray-500 mb-2">London home &amp; office delivery instructions</p>
              <span className="text-xs font-bold text-blue-700 flex items-center">
                <span>Edit addresses</span> &rarr;
              </span>
            </div>
          </Link>

          {/* Card 4: Wallet */}
          <Link
            href="/account/wallet"
            className="group bg-white p-6 rounded-3xl border border-gray-200/80 hover:border-[#2D6A4F]/40 shadow-xs hover:shadow-md transition-all flex items-start space-x-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
              <Wallet size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#2D6A4F] transition-colors mb-1">
                Store Wallet
              </h3>
              <p className="text-xs text-gray-500 mb-2">Refund credits &amp; promotional balances</p>
              <span className="text-xs font-bold text-purple-700 flex items-center">
                <span>View credits</span> &rarr;
              </span>
            </div>
          </Link>

          {/* Card 5: Wishlist */}
          <Link
            href="/wishlist"
            className="group bg-white p-6 rounded-3xl border border-gray-200/80 hover:border-[#2D6A4F]/40 shadow-xs hover:shadow-md transition-all flex items-start space-x-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center flex-shrink-0">
              <Heart size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#2D6A4F] transition-colors mb-1">
                Saved Wishlist
              </h3>
              <p className="text-xs text-gray-500 mb-2">Saved spices and seasonal grocery alerts</p>
              <span className="text-xs font-bold text-rose-700 flex items-center">
                <span>Open wishlist</span> &rarr;
              </span>
            </div>
          </Link>

          {/* Card 6: Support */}
          <Link
            href="/support"
            className="group bg-white p-6 rounded-3xl border border-gray-200/80 hover:border-[#2D6A4F]/40 shadow-xs hover:shadow-md transition-all flex items-start space-x-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-700 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#2D6A4F] transition-colors mb-1">
                Customer Support
              </h3>
              <p className="text-xs text-gray-500 mb-2">WhatsApp chat, delivery queries &amp; refunds</p>
              <span className="text-xs font-bold text-gray-700 flex items-center">
                <span>Get help</span> &rarr;
              </span>
            </div>
          </Link>
        </div>

        {/* Recent Active Order Preview */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b mb-4">
            <h2 className="font-playfair text-lg font-bold text-gray-900">
              Most Recent Shipment
            </h2>
            <Link href="/account/orders" className="text-xs font-bold text-[#2D6A4F] hover:underline">
              View All Orders &rarr;
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 p-4 rounded-2xl border">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-gray-900">Order #RM-892415</span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  Shipped
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                3 Items • Total: £34.96 • Expected Delivery: Tomorrow
              </p>
            </div>

            <Link
              href="/orders/RM-892415"
              className="px-4 py-2 bg-[#2D6A4F] text-white text-xs font-bold rounded-xl hover:bg-[#23533e] text-center"
            >
              Track Order Live
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
