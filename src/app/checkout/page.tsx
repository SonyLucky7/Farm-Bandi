"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  CreditCard,
  Truck,
  ArrowRight,
  ChevronRight,
  ArrowLeft,
  MapPin,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useCartStore } from "@/stores/cart";
import { formatPrice, generateOrderId } from "@/lib/utils";
import { useMounted } from "@/hooks/useMounted";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const mounted = useMounted();
  const rawItems = useCartStore((state) => state.items);
  const items = mounted ? rawItems : [];
  const rawSubtotal = useCartStore((state) => state.getSubtotal());
  const rawDiscount = useCartStore((state) => state.getDiscount());
  const rawDeliveryFee = useCartStore((state) => state.getDeliveryFee());
  const rawTotal = useCartStore((state) => state.getTotal());

  const subtotal = mounted ? rawSubtotal : 0;
  const discount = mounted ? rawDiscount : 0;
  const deliveryFee = mounted ? rawDeliveryFee : 0;
  const total = mounted ? rawTotal : 0;

  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const clearCart = useCartStore((state) => state.clearCart);

  // 3-step checkout flow state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Delivery Form
  const [formData, setFormData] = useState({
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@example.co.uk",
    phone: "+44 7911 123456",
    addressLine1: "42 Richmond Road",
    apartment: "Flat 3B",
    city: "London",
    state: "Greater London",
    postalCode: "E8 3HN",
    country: "United Kingdom",
    deliveryInstructions: "Please leave in the porch if not home.",
    saveAddress: true,
  });

  // Step 2: Payment Method Selection
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple_pay" | "paypal" | "upi" | "cod">("card");
  const [cardData, setCardData] = useState({
    cardNumber: "•••• •••• •••• 4242",
    expiry: "12/28",
    cvc: "•••",
    cardHolder: "Priya Sharma",
  });

  // Step 3: Terms Agreement
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!formData.firstName || !formData.addressLine1 || !formData.postalCode) {
        toast.error("Please fill in all mandatory delivery fields");
        return;
      }
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 2) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePlaceOrder = () => {
    if (!agreedToTerms) {
      toast.error("Please agree to the Terms of Service & Privacy Policy");
      return;
    }

    setIsProcessing(true);
    const orderId = generateOrderId();

    // Store order in localStorage for tracking
    const orderData = {
      orderId,
      customerName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.addressLine1}, ${formData.apartment ? formData.apartment + ", " : ""}${formData.city}, ${formData.postalCode}`,
      items,
      subtotal,
      discount,
      deliveryFee,
      total,
      paymentMethod,
      date: new Date().toISOString(),
      status: "CONFIRMED",
      estimatedDelivery: "In 2 business days",
    };

    if (typeof window !== "undefined") {
      const existingOrders = JSON.parse(localStorage.getItem("raithanna_orders") || "[]");
      localStorage.setItem("raithanna_orders", JSON.stringify([orderData, ...existingOrders]));
      localStorage.setItem("raithanna_latest_order", JSON.stringify(orderData));
    }

    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      toast.success("Order placed successfully!");
      router.push(`/checkout/success?orderId=${orderId}`);
    }, 1500);
  };

  if (items.length === 0 && !isProcessing) {
    return (
      <div className="bg-[#FAFAF5] min-h-screen py-16 text-center">
        <div className="container mx-auto px-4 max-w-md bg-white p-8 rounded-3xl border border-gray-200">
          <h2 className="text-xl font-bold mb-2">No items to checkout</h2>
          <p className="text-xs text-gray-500 mb-6">Your shopping basket is currently empty.</p>
          <Link
            href="/shop"
            className="px-6 py-2.5 bg-[#2D6A4F] text-white rounded-full font-bold text-xs"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF5] min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/cart" },
            { label: "Checkout", href: "/checkout" },
          ]}
          className="mb-6"
        />

        {/* Stepper Header */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200/80 shadow-xs mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {/* Step 1 */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  currentStep >= 1
                    ? "bg-[#2D6A4F] text-white shadow-xs"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                1
              </div>
              <span
                className={`text-xs font-bold ${
                  currentStep >= 1 ? "text-gray-900" : "text-gray-400"
                }`}
              >
                Delivery Address
              </span>
            </div>

            <ChevronRight size={16} className="text-gray-300" />

            {/* Step 2 */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  currentStep >= 2
                    ? "bg-[#2D6A4F] text-white shadow-xs"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                2
              </div>
              <span
                className={`text-xs font-bold ${
                  currentStep >= 2 ? "text-gray-900" : "text-gray-400"
                }`}
              >
                Payment Option
              </span>
            </div>

            <ChevronRight size={16} className="text-gray-300" />

            {/* Step 3 */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  currentStep === 3
                    ? "bg-[#2D6A4F] text-white shadow-xs"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                3
              </div>
              <span
                className={`text-xs font-bold ${
                  currentStep === 3 ? "text-gray-900" : "text-gray-400"
                }`}
              >
                Review &amp; Pay
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Steps Form */}
          <div className="lg:col-span-8 space-y-6">
            {/* STEP 1: Delivery Details */}
            {currentStep === 1 && (
              <form onSubmit={handleNextStep} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b">
                  <h2 className="font-playfair text-xl font-bold text-gray-900">
                    1. Shipping &amp; Delivery Address
                  </h2>
                  <span className="text-xs text-[#2D6A4F] font-semibold flex items-center">
                    <MapPin size={14} className="mr-1" /> UK &amp; International Delivery
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">Email for Tracking *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">Mobile Phone (for delivery SMS) *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">Street Address *</label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      placeholder="House number and street name"
                      required
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">Apartment, suite, unit (optional)</label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">Town / City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">County / State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden font-mono uppercase"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">Country / Region</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden bg-white"
                    >
                      <option value="United Kingdom">United Kingdom (Free over £50)</option>
                      <option value="Ireland">Republic of Ireland</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="United States">United States</option>
                      <option value="India">India</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">Delivery Notes &amp; Safe Place</label>
                    <textarea
                      name="deliveryInstructions"
                      rows={2}
                      value={formData.deliveryInstructions}
                      onChange={handleInputChange}
                      className="w-full text-xs sm:text-sm px-4 py-2 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#2D6A4F] hover:bg-[#23533e] text-white font-bold text-sm rounded-full shadow-md transition-all flex items-center space-x-2"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Payment Selection */}
            {currentStep === 2 && (
              <form onSubmit={handleNextStep} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b">
                  <h2 className="font-playfair text-xl font-bold text-gray-900">
                    2. Choose Payment Method
                  </h2>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Lock size={13} className="text-emerald-700" />
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Option 1: Credit / Debit Card */}
                  <label
                    className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "border-[#2D6A4F] bg-[#2D6A4F]/5 shadow-xs"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="accent-[#2D6A4F] w-4 h-4"
                        />
                        <span className="font-bold text-sm text-gray-900">
                          Credit or Debit Card
                        </span>
                      </div>
                      <div className="flex space-x-1.5 text-xs text-gray-400 font-mono">
                        <span className="bg-white border px-1.5 py-0.5 rounded-sm">VISA</span>
                        <span className="bg-white border px-1.5 py-0.5 rounded-sm">Mastercard</span>
                        <span className="bg-white border px-1.5 py-0.5 rounded-sm">AMEX</span>
                      </div>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 text-xs">
                        <div className="col-span-2">
                          <label className="text-[11px] font-bold text-gray-600 block mb-1">Card Number</label>
                          <input
                            type="text"
                            value={cardData.cardNumber}
                            readOnly
                            className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-gray-600 block mb-1">Expires (MM/YY)</label>
                          <input
                            type="text"
                            value={cardData.expiry}
                            readOnly
                            className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-gray-600 block mb-1">CVC / CVV</label>
                          <input
                            type="password"
                            value={cardData.cvc}
                            readOnly
                            className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-mono text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </label>

                  {/* Option 2: Apple Pay / Google Pay */}
                  <label
                    className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "apple_pay"
                        ? "border-[#2D6A4F] bg-[#2D6A4F]/5 shadow-xs"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "apple_pay"}
                          onChange={() => setPaymentMethod("apple_pay")}
                          className="accent-[#2D6A4F] w-4 h-4"
                        />
                        <span className="font-bold text-sm text-gray-900">
                          Apple Pay / Google Pay
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Instant 1-Click Pay</span>
                    </div>
                  </label>

                  {/* Option 3: PayPal */}
                  <label
                    className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "paypal"
                        ? "border-[#2D6A4F] bg-[#2D6A4F]/5 shadow-xs"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "paypal"}
                          onChange={() => setPaymentMethod("paypal")}
                          className="accent-[#2D6A4F] w-4 h-4"
                        />
                        <span className="font-bold text-sm text-gray-900">PayPal International</span>
                      </div>
                      <span className="text-xs text-blue-700 font-bold">PayPal</span>
                    </div>
                  </label>

                  {/* Option 4: UPI / Netbanking (for Indian Cards) */}
                  <label
                    className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "upi"
                        ? "border-[#2D6A4F] bg-[#2D6A4F]/5 shadow-xs"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "upi"}
                          onChange={() => setPaymentMethod("upi")}
                          className="accent-[#2D6A4F] w-4 h-4"
                        />
                        <span className="font-bold text-sm text-gray-900">
                          UPI / Net Banking (GPay, PhonePe, Paytm)
                        </span>
                      </div>
                      <span className="text-xs text-emerald-800 font-mono font-bold">UPI Enabled</span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 border-t flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Delivery</span>
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#2D6A4F] hover:bg-[#23533e] text-white font-bold text-sm rounded-full shadow-md transition-all flex items-center space-x-2"
                  >
                    <span>Review Order</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Review & Final Confirmation */}
            {currentStep === 3 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
                <h2 className="font-playfair text-xl font-bold text-gray-900 pb-4 border-b">
                  3. Review Order &amp; Confirm
                </h2>

                {/* Shipping summary preview */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex justify-between items-start text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block mb-1">
                      Shipping to: {formData.firstName} {formData.lastName}
                    </span>
                    <p className="text-gray-600">
                      {formData.addressLine1}, {formData.apartment && `${formData.apartment}, `}
                      {formData.city}, {formData.postalCode}, {formData.country}
                    </p>
                    <p className="text-gray-500 mt-1">Tel: {formData.phone} • {formData.email}</p>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-[#2D6A4F] hover:underline"
                  >
                    Edit
                  </button>
                </div>

                {/* Items in Order */}
                <div className="space-y-3">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500">
                    Ordered Products ({items.length})
                  </h3>
                  <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-2">
                    {items.map((item) => (
                      <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-gray-100 border flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block truncate max-w-[200px] sm:max-w-xs">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-gray-500">
                              {item.quantity} × {formatPrice(item.price)}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agreements */}
                <div className="pt-4 border-t space-y-2">
                  <label className="flex items-start space-x-2 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 rounded-sm accent-[#2D6A4F] w-4 h-4"
                    />
                    <span>
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#2D6A4F] underline">
                        Terms &amp; Conditions
                      </Link>
                      ,{" "}
                      <Link href="/privacy" className="text-[#2D6A4F] underline">
                        Privacy Policy
                      </Link>
                      , and{" "}
                      <Link href="/returns" className="text-[#2D6A4F] underline">
                        Refund &amp; Return Policy
                      </Link>
                      .
                    </span>
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Payment</span>
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="px-8 py-4 bg-[#2D6A4F] hover:bg-[#23533e] text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
                  >
                    <Lock size={16} />
                    <span>
                      {isProcessing ? "Processing Payment..." : `Place Order & Pay ${formatPrice(total)}`}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
              <h3 className="font-playfair text-lg font-bold text-gray-900 pb-2 border-b">
                Cart Total
              </h3>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount Coupon</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-bold text-gray-900">
                    {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>VAT &amp; Taxes</span>
                  <span>Zero-rated (£0.00)</span>
                </div>

                <div className="pt-3 border-t flex justify-between text-base font-extrabold text-gray-900">
                  <span>Final Total</span>
                  <span className="text-[#2D6A4F] text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-[11px] text-emerald-800 space-y-1">
                <div className="font-bold flex items-center">
                  <ShieldCheck size={14} className="mr-1 text-emerald-700" />
                  International Buyer Protection
                </div>
                <p className="text-gray-500">
                  Your payment is authenticated securely via 3D Secure / Stripe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
