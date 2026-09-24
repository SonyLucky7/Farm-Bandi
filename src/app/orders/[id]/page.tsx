"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  ArrowRight,
  Headphones,
  ShoppingBag,
  MapPin,
  Calendar,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { toast } from "sonner";

interface OrderTrackingPageProps {
  params: Promise<{ id: string }>;
}

const TIMELINE_STAGES = [
  { id: "placed", label: "Order Placed", desc: "Order details received & verified", done: true },
  { id: "confirmed", label: "Confirmed", desc: "Payment captured & inventory reserved", done: true },
  { id: "processing", label: "Processing", desc: "Quality checks and batch inspection", done: true },
  { id: "packed", label: "Packed", desc: "Sealed in insulated temperature packaging", done: true },
  { id: "shipped", label: "Shipped", desc: "Handed over to express courier", done: false },
  { id: "out_for_delivery", label: "Out for Delivery", desc: "Courier on route to your doorstep", done: false },
  { id: "delivered", label: "Delivered", desc: "Delivered & signed for", done: false },
];

export default function OrderTrackingPage({ params }: OrderTrackingPageProps) {
  const { id } = use(params);
  const [order, setOrder] = useState<any>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedOrders = JSON.parse(localStorage.getItem("raithanna_orders") || "[]");
      const found = storedOrders.find((o: any) => o.orderId === id);
      if (found) {
        setOrder(found);
      }
    }
  }, [id]);

  const handleReorder = () => {
    if (order?.items) {
      order.items.forEach((item: any) => {
        addItem(item, item.quantity);
      });
      toast.success("All items added back to your shopping basket!");
    } else {
      toast.info("Reorder completed for standard staples!");
    }
  };

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "My Orders", href: "/account/orders" },
            { label: `Tracking #${id}`, href: `/orders/${id}` },
          ]}
          className="mb-4"
        />

        {/* Header Summary */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
            <div>
              <span className="text-[11px] font-bold text-[#2D6A4F] uppercase tracking-wider bg-[#2D6A4F]/10 px-3 py-1 rounded-full mb-2 inline-block">
                In Transit • On Schedule
              </span>
              <h1 className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
                Tracking Order #{id}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Estimated Delivery: <strong className="text-emerald-700">Tomorrow by 4:00 PM</strong> • Courier: DPD Express UK
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleReorder}
                className="px-4 py-2 bg-[#2D6A4F] text-white rounded-xl text-xs font-bold hover:bg-[#23533e] transition-colors flex items-center space-x-1.5"
              >
                <ShoppingBag size={14} />
                <span>Reorder Items</span>
              </button>
              <Link
                href="/support"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors flex items-center space-x-1.5"
              >
                <Headphones size={14} />
                <span>Support</span>
              </Link>
            </div>
          </div>

          {/* 7-Stage Interactive Timeline */}
          <div className="pt-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">
              Dispatch &amp; Delivery Progress
            </h2>
            <div className="relative">
              <div className="hidden sm:block absolute top-4 left-4 right-4 h-1 bg-gray-200 -z-0">
                <div className="bg-[#2D6A4F] h-full w-[55%] transition-all duration-500" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 relative z-10">
                {TIMELINE_STAGES.map((stage, idx) => (
                  <div key={stage.id} className="flex sm:flex-col items-center sm:text-center space-x-3 sm:space-x-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 sm:mb-2 ${
                        stage.done
                          ? "bg-[#2D6A4F] text-white ring-4 ring-[#2D6A4F]/20"
                          : "bg-gray-100 text-gray-400 border border-gray-300"
                      }`}
                    >
                      {stage.done ? <CheckCircle2 size={16} /> : idx + 1}
                    </div>
                    <div>
                      <h3
                        className={`text-xs font-bold leading-tight ${
                          stage.done ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {stage.label}
                      </h3>
                      <p className="text-[10px] text-gray-400 hidden sm:block mt-0.5">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Courier & Address Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-gray-900 flex items-center space-x-2">
              <Truck size={18} className="text-[#2D6A4F]" />
              <span>Courier &amp; Tracking Information</span>
            </h3>
            <div className="text-xs space-y-1.5 text-gray-600">
              <p><strong>Tracking Number:</strong> DPD-UK-982410842</p>
              <p><strong>Service:</strong> Next Day Insured Express</p>
              <p><strong>Safe Place:</strong> Covered Front Porch</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-gray-900 flex items-center space-x-2">
              <MapPin size={18} className="text-[#2D6A4F]" />
              <span>Delivery Address</span>
            </h3>
            <div className="text-xs space-y-1 text-gray-600">
              <p className="font-bold text-gray-900">{order?.customerName || "Priya Sharma"}</p>
              <p>{order?.address || "42 Richmond Road, London, E8 3HN, UK"}</p>
              <p>Contact: {order?.phone || "+44 7911 123456"}</p>
            </div>
          </div>
        </div>

        {/* Products in this package */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
          <h3 className="font-playfair text-lg font-bold text-gray-900 mb-4 pb-3 border-b">
            Items in This Shipment
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs py-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border relative overflow-hidden flex-shrink-0">
                  <Image src="/images/categories/category-dryfruits.jpg" alt="Cashews" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Farm Bandi Whole Cashews (500g)</h4>
                  <span className="text-gray-400">Qty: 1</span>
                </div>
              </div>
              <span className="font-bold text-gray-900">£14.99</span>
            </div>

            <div className="flex items-center justify-between text-xs py-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border relative overflow-hidden flex-shrink-0">
                  <Image src="/images/categories/category-rice.jpg" alt="Rice" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Royal Heritage Basmati Rice (5kg)</h4>
                  <span className="text-gray-400">Qty: 1</span>
                </div>
              </div>
              <span className="font-bold text-gray-900">£12.99</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
