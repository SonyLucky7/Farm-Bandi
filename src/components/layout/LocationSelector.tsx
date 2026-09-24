"use client";

import { useState } from "react";
import { MapPin, ChevronDown, Navigation, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("London, UK");
  const [postcode, setPostcode] = useState("");

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode.trim()) {
      setLocation(`${postcode.trim().toUpperCase()}`);
      setIsOpen(false);
      setPostcode("");
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs text-gray-800 hover:text-[#155E40] transition-colors py-1 px-2 rounded-lg hover:bg-gray-50 group"
        aria-label="Select delivery location"
      >
        <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#155E40] flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
          <MapPin size={14} />
        </div>
        <div className="text-left leading-tight">
          <span className="text-[10px] text-gray-400 block font-normal">Deliver to</span>
          <span className="font-bold text-gray-800 max-w-[100px] truncate block">{location}</span>
        </div>
        <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-transform" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-84 bg-white shadow-2xl border border-gray-200/90 rounded-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
              <div>
                <h3 className="font-extrabold text-sm text-gray-900">Delivery Destination</h3>
                <p className="text-[11px] text-gray-500">Same-day & next-day slots available</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            
            <button 
              onClick={() => {
                setLocation("London, UK");
                setIsOpen(false);
              }}
              className="w-full bg-[#EBF5F0] hover:bg-emerald-100/70 border border-emerald-200 text-[#155E40] font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all mb-4 shadow-2xs"
            >
              <Navigation size={14} />
              <span>Use Current Location (London)</span>
            </button>

            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-3 text-gray-400 text-[10px] uppercase font-bold tracking-wider">or enter postcode</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form onSubmit={handleApply} className="mt-3">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="e.g. E8 3HN, SW1A 1AA" 
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#155E40] focus:ring-2 focus:ring-[#155E40]/15"
                />
                <button 
                  type="submit"
                  className="bg-[#155E40] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0F4932] transition-colors shadow-xs"
                >
                  Apply
                </button>
              </div>
            </form>

            {/* Quick Presets */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Popular UK Hubs</h4>
              <div className="space-y-1">
                {[
                  { name: "Greater London (Central)", code: "London, UK" },
                  { name: "Birmingham & Midlands", code: "Birmingham, UK" },
                  { name: "Manchester & North West", code: "Manchester, UK" },
                ].map((hub) => (
                  <button 
                    key={hub.code}
                    onClick={() => {
                      setLocation(hub.code);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full text-left p-2 rounded-lg flex items-center justify-between text-xs transition-colors",
                      location === hub.code ? "bg-emerald-50 text-[#155E40] font-bold" : "hover:bg-gray-50 text-gray-700"
                    )}
                  >
                    <span>{hub.name}</span>
                    {location === hub.code && <Check size={14} className="text-[#155E40]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
