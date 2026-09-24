import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Returns & Refund Policy | Raithanna Market",
  description: "Read about our 100% Quality & Freshness Guarantee, hassle-free returns, and refund processes.",
};

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Returns Policy", href: "/returns" },
          ]}
          className="mb-4"
        />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-xs space-y-6">
          <h1 className="font-playfair text-3xl font-bold text-gray-900 pb-4 border-b">
            Returns &amp; Refund Policy
          </h1>

          <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <h2 className="font-bold text-base text-gray-900 pt-2">1. The 100% Freshness Promise</h2>
            <p>
              We want you to be completely delighted with every order from Raithanna Market. Because we take pride in Farm Bandi quality, we offer a straightforward, customer-friendly refund process.
            </p>

            <h2 className="font-bold text-base text-gray-900 pt-2">2. Perishable Groceries &amp; Produce</h2>
            <p>
              Due to hygiene and food safety standards, physical returns of opened or perishable groceries (fresh vegetables, fruits, dairy, frozen foods) are not required.
            </p>
            <p>
              If any perishable item arrives bruised, damaged in transit, or below acceptable quality standards:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Take a clear photo of the affected item and your package label.</li>
              <li>Send the photo via WhatsApp (+44 7123 456789) or email (support@raithannamarket.com) within <strong>48 hours</strong> of delivery.</li>
              <li>We will immediately process a refund to your original payment method or credit your Store Wallet.</li>
            </ul>

            <h2 className="font-bold text-base text-gray-900 pt-2">3. Non-Perishable Pantry Items</h2>
            <p>
              Unopened non-perishable items (packaged spices, grains, cookware, sealed dry fruit canisters, pooja essentials) can be returned within <strong>14 days</strong> of receipt in original packaging for a full refund.
            </p>

            <h2 className="font-bold text-base text-gray-900 pt-2">4. Refund Processing Time</h2>
            <p>
              Approved card refunds are processed within 2 to 4 business days depending on your bank issuer. Wallet credits are available instantly for your next checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
