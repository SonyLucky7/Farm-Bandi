"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Truck, ArrowRight, RotateCcw, Download, Calendar } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { formatPrice } from "@/lib/utils";

const SAMPLE_ORDERS = [
  {
    orderId: "RM-892415",
    date: "22 Sep 2026",
    status: "SHIPPED",
    statusColor: "bg-amber-100 text-amber-800",
    itemCount: 3,
    total: 34.96,
    itemsPreview: "Farm Bandi Cashews 500g, Basmati Rice 5kg, Toor Dal 1kg",
  },
  {
    orderId: "RM-761204",
    date: "10 Sep 2026",
    status: "DELIVERED",
    statusColor: "bg-emerald-100 text-emerald-800",
    itemCount: 5,
    total: 48.50,
    itemsPreview: "Aashirvaad Atta 10kg, MDH Garam Masala, Patanjali Ghee, Moong Dal",
  },
  {
    orderId: "RM-610992",
    date: "25 Aug 2026",
    status: "DELIVERED",
    statusColor: "bg-emerald-100 text-emerald-800",
    itemCount: 2,
    total: 18.20,
    itemsPreview: "Farm Bandi Anjeer (Figs) 250g, Tata Tea Gold 500g",
  },
];

export default function AccountOrdersPage() {
  const [orders, setOrders] = useState(SAMPLE_ORDERS);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("raithanna_orders");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const formatted = parsed.map((o: any) => ({
              orderId: o.orderId,
              date: new Date(o.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
              status: o.status || "CONFIRMED",
              statusColor: "bg-emerald-100 text-emerald-800",
              itemCount: o.items ? o.items.length : 3,
              total: o.total || 34.96,
              itemsPreview: o.items ? o.items.map((i: any) => i.name).join(", ") : "Farm Bandi Groceries",
            }));
            setOrders([...formatted, ...SAMPLE_ORDERS]);
          }
        } catch (e) {
          // fallback to sample
        }
      }
    }
  }, []);

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "My Account", href: "/account" },
            { label: "Order History", href: "/account/orders" },
          ]}
          className="mb-4"
        />

        <div className="flex items-center justify-between mb-8 pb-4 border-b">
          <div>
            <h1 className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              My Orders &amp; Invoices
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Track live deliveries, review past grocery orders, and download receipts
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {orders.map((order, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-extrabold text-sm text-gray-900">
                    Order #{order.orderId}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>

                <p className="text-xs text-gray-600 line-clamp-1">
                  <strong>Items:</strong> {order.itemsPreview}
                </p>

                <div className="flex items-center space-x-4 text-xs text-gray-400 pt-1">
                  <span className="flex items-center">
                    <Calendar size={13} className="mr-1" /> {order.date}
                  </span>
                  <span>{order.itemCount} Items</span>
                  <span className="font-extrabold text-gray-900 text-sm">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2 md:pt-0 border-t md:border-t-0">
                <Link
                  href={`/orders/${order.orderId}`}
                  className="px-4 py-2 bg-[#2D6A4F] hover:bg-[#23533e] text-white text-xs font-bold rounded-xl transition-colors flex items-center space-x-1"
                >
                  <Truck size={14} />
                  <span>Track Order</span>
                </Link>

                <button
                  onClick={() => window.print()}
                  className="px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-xl"
                  title="Invoice"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
