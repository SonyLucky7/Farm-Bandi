import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Careers | Raithanna Market",
  description: "Join the Raithanna Market and Farm Bandi team expanding international authentic grocery access.",
};

export default function CareersPage() {
  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Careers", href: "/careers" },
          ]}
          className="mb-4"
        />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-xs text-center space-y-4">
          <h1 className="font-playfair text-3xl font-bold text-gray-900">
            Work With Raithanna Market
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            We are always looking for passionate logistics handlers, quality food inspectors, and digital commerce specialists across our UK and European fulfillment network.
          </p>
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs max-w-sm mx-auto font-medium">
            Send your CV and a brief note to <strong className="font-mono">careers@raithannamarket.com</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
