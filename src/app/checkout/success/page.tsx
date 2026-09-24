"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Download,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "RM-892415";

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("raithanna_latest_order");
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    }
  }, []);

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-md text-center mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
            <CheckCircle2 size={44} />
          </div>

          <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider bg-[#2D6A4F]/10 px-3 py-1 rounded-full mb-2 inline-block">
            Order Confirmed &amp; Payment Successful
          </span>

          <h1 className="font-playfair text-2xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-2">
            Thank You For Your Order!
          </h1>

          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mb-6">
            We&apos;ve received your order and dispatched confirmation details to{" "}
            <strong>{order?.email || "your email address"}</strong>.
          </p>

          <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-2xl text-xs font-mono font-bold text-gray-800 mb-6">
            <span>ORDER NUMBER:</span>
            <span className="text-[#2D6A4F] text-sm">{order?.orderId || orderId}</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/orders/${order?.orderId || orderId}`}
              className="px-6 py-3 bg-[#2D6A4F] hover:bg-[#23533e] text-white font-bold text-xs sm:text-sm rounded-full shadow-md transition-all flex items-center space-x-2"
            >
              <Package size={16} />
              <span>Track Live Order Status</span>
              <ArrowRight size={14} />
            </Link>

            <button
              onClick={() => window.print()}
              className="px-5 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs sm:text-sm rounded-full transition-all flex items-center space-x-1.5"
            >
              <Download size={15} />
              <span>Download Invoice</span>
            </button>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-gray-100 text-xs">
            <div className="flex items-start space-x-2">
              <Calendar size={18} className="text-[#2D6A4F] mt-0.5" />
              <div>
                <span className="text-gray-400 block">Order Date</span>
                <span className="font-bold text-gray-900">
                  {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Truck size={18} className="text-[#2D6A4F] mt-0.5" />
              <div>
                <span className="text-gray-400 block">Estimated Delivery</span>
                <span className="font-bold text-emerald-700">2-3 Business Days</span>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <MapPin size={18} className="text-[#2D6A4F] mt-0.5" />
              <div>
                <span className="text-gray-400 block">Delivering To</span>
                <span className="font-bold text-gray-900 truncate block max-w-[160px]">
                  {order?.address || "42 Richmond Road, London, E8 3HN"}
                </span>
              </div>
            </div>
          </div>

          {/* Ordered Products */}
          {order?.items && order.items.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Items In This Package
              </h3>
              <div className="divide-y divide-gray-100">
                {order.items.map((item: any) => (
                  <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 border relative overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">{item.name}</span>
                        <span className="text-gray-500">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price Calculations */}
          <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">{formatPrice(order?.subtotal || 34.96)}</span>
            </div>
            {order?.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-bold text-gray-900">
                {order?.deliveryFee === 0 ? "FREE" : formatPrice(order?.deliveryFee || 3.99)}
              </span>
            </div>
            <div className="pt-2 border-t flex justify-between text-base font-extrabold text-gray-900">
              <span>Total Paid</span>
              <span className="text-[#2D6A4F] text-lg">
                {formatPrice(order?.total || 38.95)}
              </span>
            </div>
          </div>
        </div>

        {/* Continue Shopping CTA */}
        <div className="text-center mt-8">
          <Link
            href="/shop"
            className="text-xs font-bold text-[#2D6A4F] hover:underline inline-flex items-center space-x-1"
          >
            <span>&larr; Return to Shopping Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center p-8">Loading order confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
