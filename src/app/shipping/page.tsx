import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Shipping & Delivery Policy | Raithanna Market",
  description: "Learn about our UK and international delivery timelines, insulated produce packaging, and shipping rates.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shipping Policy", href: "/shipping" },
          ]}
          className="mb-4"
        />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-xs space-y-6">
          <h1 className="font-playfair text-3xl font-bold text-gray-900 pb-4 border-b">
            Shipping &amp; Delivery Policy
          </h1>

          <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <h2 className="font-bold text-base text-gray-900 pt-2">1. Delivery Zones &amp; Rates</h2>
            <p>
              We deliver authentic Indian groceries across the United Kingdom (England, Scotland, Wales, and Northern Ireland) as well as selected European destinations.
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong>Free Standard Delivery:</strong> On all UK mainland orders of £50.00 and above.</li>
              <li><strong>UK Standard Courier (2-4 Working Days):</strong> £3.99 for orders below £50.00.</li>
              <li><strong>UK Express Courier (1-2 Working Days):</strong> £6.99 flat rate.</li>
              <li><strong>Same-Day London Delivery:</strong> £9.99 for eligible postcodes on orders placed before 1:00 PM GMT.</li>
            </ul>

            <h2 className="font-bold text-base text-gray-900 pt-2">2. Fresh Produce &amp; Perishables Handling</h2>
            <p>
              Fresh vegetables (e.g. okra, gongura, curry leaves), tropical fruits, and dairy products (paneer, ghee) are handled with extreme care:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Packed in thermal-insulated silver liners with non-toxic refrigerant gel packs.</li>
              <li>Prioritized for express transit to prevent temperature spikes or spoilage.</li>
            </ul>

            <h2 className="font-bold text-base text-gray-900 pt-2">3. Live Tracking &amp; Courier Updates</h2>
            <p>
              Once your package is handed over to our delivery partners (DPD, Royal Mail, or local courier), you will receive an SMS and email notification with a real-time live GPS tracking link and a 1-hour delivery window.
            </p>

            <h2 className="font-bold text-base text-gray-900 pt-2">4. Safe Place &amp; Unattended Deliveries</h2>
            <p>
              You may specify safe place instructions (e.g., &ldquo;Leave in enclosed porch&rdquo; or &ldquo;Leave with neighbor at #44&rdquo;) during checkout. Drivers will take a delivery photo as proof of delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
