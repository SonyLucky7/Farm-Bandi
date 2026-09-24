"use client";

import { useState } from "react";
import { MapPin, Plus, Check, Trash2, Edit2 } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { toast } from "sonner";

interface Address {
  id: string;
  label: "HOME" | "WORK" | "OTHER";
  name: "Priya Sharma";
  line1: string;
  city: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

export default function AccountAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr_1",
      label: "HOME",
      name: "Priya Sharma",
      line1: "42 Richmond Road, Flat 3B",
      city: "London",
      postalCode: "E8 3HN",
      phone: "+44 7911 123456",
      isDefault: true,
    },
    {
      id: "addr_2",
      label: "WORK",
      name: "Priya Sharma",
      line1: "15 Bishopsgate, Floor 8",
      city: "London",
      postalCode: "EC2N 3AQ",
      phone: "+44 7911 123456",
      isDefault: false,
    },
  ]);

  const setDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    toast.success("Default delivery address updated");
  };

  const removeAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.info("Address removed");
  };

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "My Account", href: "/account" },
            { label: "Addresses", href: "/account/addresses" },
          ]}
          className="mb-4"
        />

        <div className="flex items-center justify-between mb-8 pb-4 border-b">
          <div>
            <h1 className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              Delivery Addresses
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Manage your residential and work delivery locations
            </p>
          </div>

          <button
            onClick={() => toast.info("Address modal opened for new location")}
            className="px-4 py-2 bg-[#2D6A4F] text-white rounded-xl text-xs font-bold hover:bg-[#23533e] flex items-center space-x-1.5"
          >
            <Plus size={15} />
            <span>Add Address</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`bg-white rounded-3xl p-6 border transition-all ${
                addr.isDefault
                  ? "border-[#2D6A4F] shadow-sm ring-1 ring-[#2D6A4F]/20"
                  : "border-gray-200/80 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">
                  {addr.label}
                </span>
                {addr.isDefault ? (
                  <span className="text-[11px] font-bold text-[#2D6A4F] flex items-center">
                    <Check size={13} className="mr-1" /> Default Address
                  </span>
                ) : (
                  <button
                    onClick={() => setDefault(addr.id)}
                    className="text-xs text-gray-500 hover:text-[#2D6A4F] font-semibold"
                  >
                    Set as default
                  </button>
                )}
              </div>

              <h3 className="font-bold text-sm text-gray-900 mb-1">{addr.name}</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-1">{addr.line1}</p>
              <p className="text-xs text-gray-600 mb-2">{addr.city}, {addr.postalCode}</p>
              <p className="text-xs text-gray-500 font-mono mb-4">Phone: {addr.phone}</p>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => toast.info("Editing address details")}
                  className="text-gray-600 hover:text-gray-900 font-semibold flex items-center space-x-1"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
                {!addr.isDefault && (
                  <button
                    onClick={() => removeAddress(addr.id)}
                    className="text-red-500 hover:text-red-700 font-semibold flex items-center space-x-1"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
