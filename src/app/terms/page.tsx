import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Terms and Conditions | Raithanna Market",
  description: "Terms and conditions governing the use of Raithanna Market e-commerce platform.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Terms and Conditions", href: "/terms" },
          ]}
          className="mb-4"
        />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-xs space-y-6">
          <h1 className="font-playfair text-3xl font-bold text-gray-900 pb-4 border-b">
            Terms &amp; Conditions
          </h1>

          <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <p>
              Welcome to Raithanna Market. By accessing or using our website, purchasing our grocery products, or subscribing to recurring baskets, you agree to be bound by the following terms.
            </p>

            <h2 className="font-bold text-base text-gray-900 pt-2">1. Orders and Contracts</h2>
            <p>
              All orders placed through our website constitute an offer to purchase products under these terms. We reserve the right to decline or cancel orders in cases of pricing inaccuracies, stock unavailability, or suspected fraudulent activity.
            </p>

            <h2 className="font-bold text-base text-gray-900 pt-2">2. Pricing &amp; VAT</h2>
            <p>
              All prices are listed in Great British Pounds (GBP). Most essential food groceries in the United Kingdom are zero-rated for VAT. Where VAT applies (confectionery or non-food items), prices are inclusive of applicable VAT.
            </p>

            <h2 className="font-bold text-base text-gray-900 pt-2">3. Product Descriptions &amp; Weights</h2>
            <p>
              We take reasonable care to ensure that weights, origins, and ingredient lists are accurate. Fresh produce weights may vary slightly due to natural agricultural harvesting differences.
            </p>

            <h2 className="font-bold text-base text-gray-900 pt-2">4. Subscriptions &amp; Cancellations</h2>
            <p>
              Recurring grocery basket subscriptions can be paused, modified, or canceled at any time prior to 24 hours before the scheduled dispatch date via your Account dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
