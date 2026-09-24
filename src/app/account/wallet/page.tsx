"use client";

import { useState } from "react";
import { Wallet, ArrowDownLeft, ArrowUpRight, Plus, ShieldCheck } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function AccountWalletPage() {
  const [balance, setBalance] = useState(15.00);

  const transactions = [
    {
      id: "tx_1",
      type: "CREDIT",
      title: "First Order Cashback Welcome Reward",
      date: "15 Sep 2026",
      amount: 10.00,
    },
    {
      id: "tx_2",
      type: "CREDIT",
      title: "Referral Bonus from Anita M.",
      date: "08 Sep 2026",
      amount: 5.00,
    },
  ];

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "My Account", href: "/account" },
            { label: "Store Wallet", href: "/account/wallet" },
          ]}
          className="mb-4"
        />

        <div className="flex items-center justify-between mb-8 pb-4 border-b">
          <div>
            <h1 className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              My Store Wallet
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Apply stored credits directly during checkout for instant savings
            </p>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-[#2D6A4F] to-[#1e4a36] text-white rounded-3xl p-6 sm:p-8 shadow-md mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider block mb-1">
              Available Store Balance
            </span>
            <div className="font-playfair text-4xl sm:text-5xl font-extrabold text-[#D4A373]">
              {formatPrice(balance)}
            </div>
            <p className="text-xs text-gray-200 mt-2">
              Automatically deducted on your next checkout when selected.
            </p>
          </div>

          <button
            onClick={() => toast.info("Add money via debit card or UPI")}
            className="px-6 py-3 bg-[#D4A373] text-[#1A1A1A] font-bold text-xs sm:text-sm rounded-full hover:bg-[#c29161] transition-all flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Top-up Wallet</span>
          </button>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
          <h2 className="font-playfair text-lg font-bold text-gray-900 pb-3 border-b mb-4">
            Recent Wallet Activity
          </h2>
          <div className="divide-y divide-gray-100">
            {transactions.map((tx) => (
              <div key={tx.id} className="py-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#2D6A4F] flex items-center justify-center">
                    <ArrowDownLeft size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900">{tx.title}</h3>
                    <span className="text-[11px] text-gray-400">{tx.date}</span>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-emerald-700">
                  +{formatPrice(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
