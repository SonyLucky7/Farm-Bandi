import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Privacy Policy | Raithanna Market",
  description: "Learn how Raithanna Market protects and respects your personal data under UK GDPR.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy", href: "/privacy" },
          ]}
          className="mb-4"
        />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-xs space-y-6">
          <h1 className="font-playfair text-3xl font-bold text-gray-900 pb-4 border-b">
            Privacy Policy &amp; Data Protection
          </h1>

          <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <p>
              Raithanna Market (&ldquo;we&rdquo;, &ldquo;our&rdquo;) is committed to protecting the privacy and personal data of our customers in accordance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
            </p>

            <h2 className="font-bold text-base text-gray-900 pt-2">1. Information We Collect</h2>
            <p>
              When you place an order or create an account, we collect your name, email address, telephone number, shipping/billing address, and payment confirmation tokens.
            </p>

            <h2 className="font-bold text-base text-gray-900 pt-2">2. How We Use Your Data</h2>
            <p>
              We process your personal information solely to process transactions, dispatch packages via our courier partners, send live SMS delivery tracking links, and provide customer support.
            </p>

            <h2 className="font-bold text-base text-gray-900 pt-2">3. Payment Information Security</h2>
            <p>
              We do NOT store credit card numbers on our servers. All card transactions are processed securely through certified PCI-DSS Level 1 payment gateways (Stripe, Apple Pay, PayPal).
            </p>

            <h2 className="font-bold text-base text-gray-900 pt-2">4. Your Data Rights</h2>
            <p>
              Under UK GDPR, you have the right to request access to your stored personal data, request corrections, or request deletion of your account by contacting support@raithannamarket.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
