export const ANNOUNCEMENT_MESSAGES = [
  "Free delivery on orders above £50",
  "10% OFF your first order — Use code WELCOME10",
  "Fresh groceries delivered to your door",
];

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
  { label: "Offers", href: "/offers" },
  { label: "Combos", href: "/combos" },
  { label: "Festival Collections", href: "/festival" },
  { label: "New Arrivals", href: "/new-arrivals" },
];

export const FOOTER_LINKS = {
  SHOP: [
    { label: "All Products", href: "/shop" },
    { label: "Categories", href: "/categories" },
    { label: "Brands", href: "/brands" },
    { label: "Offers", href: "/offers" },
    { label: "Combos", href: "/combos" },
    { label: "Festival Collections", href: "/festival" },
  ],
  ACCOUNT: [
    { label: "My Account", href: "/account" },
    { label: "Orders", href: "/account/orders" },
    { label: "Wishlist", href: "/account/wishlist" },
    { label: "Cart", href: "/cart" },
    { label: "Addresses", href: "/account/addresses" },
  ],
  HELP: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
  ],
  COMPANY: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/story" },
    { label: "Quality Promise", href: "/quality" },
    { label: "Careers", href: "/careers" },
  ],
};

export const SITE_CONFIG = {
  name: "Raithanna Market",
  tagline: "Healthy Food. Fast Delivery.",
  description: "Premium international Indian grocery store offering fresh produce, authentic spices, pulses, rice, sweets, and festival essentials.",
  phone: "+44 20 8123 4567",
  email: "support@raithannamarket.com",
  whatsapp: "+44 7123 456789",
  currency: "GBP",
  currencySymbol: "£",
  freeDeliveryThreshold: 50,
};

export const ORDER_STATUSES = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  PACKED: "Packed",
  SHIPPED: "Shipped",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  RETURN_REQUESTED: "Return Requested",
  RETURNED: "Returned",
  REFUNDED: "Refunded",
} as const;

export const PAYMENT_STATUSES = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  AUTHORIZED: "Authorized",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
  PARTIALLY_REFUNDED: "Partially Refunded",
  CANCELLED: "Cancelled",
} as const;

export const CURRENCIES = [
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "AED", symbol: "AED", name: "UAE Dirham" },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "AU$", name: "Australian Dollar" },
];

export const DELIVERY_TYPES = [
  { id: "standard", name: "Standard Delivery", price: 3.99, estimatedDays: "2-4 business days" },
  { id: "express", name: "Express Delivery", price: 6.99, estimatedDays: "1-2 business days" },
  { id: "same-day", name: "Same Day Delivery", price: 9.99, estimatedDays: "Today (Order before 1 PM)" },
];

export const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Customer Rating", value: "rating" },
  { label: "Newest Arrivals", value: "newest" },
  { label: "Highest Discount", value: "discount" },
];

export const DIETARY_PREFERENCES = [
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Vegan", value: "vegan" },
  { label: "Organic", value: "organic" },
  { label: "Gluten-Free", value: "gluten-free" },
  { label: "Jain Friendly", value: "jain" },
];
