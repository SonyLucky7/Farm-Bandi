"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShoppingBag, Check, Gift, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { combos } from "@/lib/data/combos";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { toast } from "sonner";

export default function CombosPage() {
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddCombo = (combo: (typeof combos)[0]) => {
    addItem(
      {
        id: combo.id,
        productId: combo.id,
        name: combo.name,
        slug: combo.slug,
        image: combo.image,
        price: combo.price,
        compareAtPrice: combo.compareAtPrice,
      },
      1
    );

    setAddedIds((prev) => [...prev, combo.id]);
    toast.success(`Added ${combo.name} to basket!`);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== combo.id));
    }, 1500);
  };

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Value Combos", href: "/combos" },
          ]}
          className="mb-4"
        />

        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Gift size={14} />
            <span>Bundle &amp; Save Big</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-2">
            Curated Grocery Combos &amp; Family Packs
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Smart bundles created for everyday cooking, festival celebrations, and bulk monthly savings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {combos.map((combo) => {
            const isAdded = addedIds.includes(combo.id);
            const savings = combo.compareAtPrice - combo.price;
            return (
              <div
                key={combo.id}
                className="bg-white rounded-3xl border border-gray-200/80 hover:border-[#2D6A4F]/40 shadow-xs hover:shadow-xl transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-gray-50 mb-4">
                    <Image src={combo.image} alt={combo.name} fill className="object-cover" />
                    {savings > 0 && (
                      <div className="absolute top-3 left-3 bg-[#E76F51] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
                        <Sparkles size={12} />
                        <span>Save {formatPrice(savings)}</span>
                      </div>
                    )}
                  </div>

                  <h2 className="font-playfair text-xl font-bold text-[#1A1A1A] mb-2">
                    {combo.name}
                  </h2>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {combo.description}
                  </p>

                  <div className="bg-gray-50 rounded-2xl p-4 mb-4 text-xs space-y-2 border border-gray-100">
                    <span className="font-bold text-gray-800 text-[11px] uppercase tracking-wider block">
                      Included In This Pack:
                    </span>
                    <ul className="space-y-1 text-gray-600">
                      {combo.productIds.map((pId: string, idx: number) => (
                        <li key={idx} className="flex items-center space-x-1.5">
                          <CheckCircle2 size={13} className="text-[#2D6A4F] flex-shrink-0" />
                          <span className="capitalize">{pId.replace("prod_", "").replace(/_/g, " ")}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-[#1A1A1A]">
                      {formatPrice(combo.price)}
                    </span>
                    {combo.compareAtPrice > combo.price && (
                      <span className="text-xs text-gray-400 line-through block">
                        Original Value: {formatPrice(combo.compareAtPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddCombo(combo)}
                    disabled={isAdded}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md flex items-center space-x-1.5 ${
                      isAdded
                        ? "bg-green-600 text-white"
                        : "bg-[#2D6A4F] hover:bg-[#23533e] text-white"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={14} />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        <span>Add Combo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
