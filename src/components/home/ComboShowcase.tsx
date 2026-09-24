"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Check, Gift, Sparkles, Plus } from "lucide-react";
import { useState } from "react";
import { combos } from "@/lib/data/combos";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { toast } from "sonner";

export default function ComboShowcase() {
  const [addedComboId, setAddedComboId] = useState<string | null>(null);
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

    setAddedComboId(combo.id);
    toast.success(`Added ${combo.name} to basket!`);
    setTimeout(() => setAddedComboId(null), 1800);
  };

  return (
    <section className="py-10 sm:py-16 bg-[#F8F9FA] border-y border-gray-200/70">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100/80 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Gift size={14} className="text-amber-700" />
              <span>Value Packs &amp; Bundles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight">
              Curated Grocery Combos
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
              Save more when you buy daily essentials together — handpicked family kits and festive celebration packs.
            </p>
          </div>
          <Link
            href="/combos"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#155E40] hover:text-[#0F4932] group"
          >
            <span>View All Combos</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {combos.map((combo) => {
            const isAdded = addedComboId === combo.id;
            const savings = combo.compareAtPrice - combo.price;
            return (
              <div
                key={combo.id}
                className="bg-white rounded-2xl border border-gray-200/90 hover:border-[#155E40]/40 p-4 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  {/* Image & Savings Badge */}
                  <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-gray-50 mb-4 border border-gray-100">
                    <Image
                      src={combo.image}
                      alt={combo.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-106 transition-transform duration-500"
                    />
                    {savings > 0 && (
                      <div className="absolute top-2.5 left-2.5 bg-[#E76F51] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                        <Sparkles size={11} />
                        <span>Save {formatPrice(savings)}</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#155E40] transition-colors line-clamp-1 mb-1">
                    {combo.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                    {combo.description}
                  </p>

                  {/* Items Included list */}
                  <div className="bg-[#F8F9FA] rounded-xl p-3 mb-4 text-xs text-gray-600 border border-gray-100">
                    <p className="font-bold text-gray-800 text-[10px] uppercase tracking-wider mb-1.5">
                      Includes {combo.productIds.length} Staples:
                    </p>
                    <ul className="space-y-1 text-[11px] text-gray-600">
                      {combo.productIds.slice(0, 3).map((pId: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#155E40]"></span>
                          <span className="truncate capitalize">{pId.replace("prod_", "").replace(/_/g, " ")}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Price & Add */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto">
                  <div>
                    <div className="text-base font-extrabold text-gray-950">
                      {formatPrice(combo.price)}
                    </div>
                    {combo.compareAtPrice > combo.price && (
                      <div className="text-[11px] text-gray-400 line-through">
                        Valued at {formatPrice(combo.compareAtPrice)}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddCombo(combo)}
                    disabled={isAdded}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-[#155E40] hover:bg-[#0F4932] text-white active:scale-95"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={14} />
                        <span>Added</span>
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
    </section>
  );
}
