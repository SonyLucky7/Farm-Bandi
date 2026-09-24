import { ORDER_STATUSES, PAYMENT_STATUSES } from '../lib/constants';

// ---- Base Types ----
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Product Domain ----
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  price: number;
  salePrice?: number;
  stockCount: number;
  weight: number;
  unit: string;
  attributes: Record<string, string>;
}

export interface Product extends BaseEntity {
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  salePrice?: number;
  brandId: string;
  brand?: Brand;
  categoryId: string;
  category?: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  tags: string[];
  dietaryPreferences: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
}

export interface Category extends BaseEntity {
  slug: string;
  name: string;
  description?: string;
  imageUrl?: string;
  parentId?: string;
  children?: Category[];
  isActive: boolean;
}

export interface Brand extends BaseEntity {
  slug: string;
  name: string;
  description?: string;
  logoUrl?: string;
}

// ---- Cart Domain ----
export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  price: number; // Price at time of adding
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode?: string;
}

// ---- Order Domain ----
export type OrderStatus = keyof typeof ORDER_STATUSES;
export type PaymentStatus = keyof typeof PAYMENT_STATUSES;

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  total: number;
  imageUrl?: string;
}

export interface Order extends BaseEntity {
  orderNumber: string;
  userId: string;
  user?: User;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  deliveryType: string;
  estimatedDeliveryDate?: string;
  trackingNumber?: string;
  couponCode?: string;
}

// ---- User Domain ----
export interface Address extends BaseEntity {
  userId: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  role: 'USER' | 'ADMIN' | 'MANAGER';
  addresses: Address[];
}

export interface WalletTransaction extends BaseEntity {
  userId: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  description: string;
  referenceId?: string;
  balanceAfter: number;
}

// ---- Reviews Domain ----
export interface Review extends BaseEntity {
  productId: string;
  userId: string;
  user?: User;
  rating: number; // 1-5
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  images?: string[];
  helpfulCount: number;
}

// ---- Marketing Domain ----
export interface Coupon extends BaseEntity {
  code: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
}

export interface Offer extends BaseEntity {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Combo extends BaseEntity {
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  productIds: string[];
  isActive: boolean;
}

export interface Collection extends BaseEntity {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  productIds: string[];
  isActive: boolean;
}

// ---- Subscription Domain ----
export interface Subscription extends BaseEntity {
  userId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  frequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
  nextDeliveryDate: string;
  status: 'ACTIVE' | 'PAUSED' | 'CANCELLED';
  shippingAddressId: string;
}

// ---- Search & Filter Domain ----
export interface SearchResult {
  products: Product[];
  categories: Category[];
  totalProducts: number;
}

export interface FilterState {
  categories?: string[];
  brands?: string[];
  priceRange?: [number, number];
  dietary?: string[];
  rating?: number;
  inStock?: boolean;
  onSale?: boolean;
}

export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}
