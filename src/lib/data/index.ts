import { Product } from './products';
import { Category } from './categories';
import { Brand } from './brands';
import { Combo } from './combos';
import { Collection } from './collections';
import { Coupon } from './coupons';
import { Review } from './reviews';

import { products } from './products';
import { categories } from './categories';
import { brands } from './brands';
import { combos } from './combos';
import { collections } from './collections';
import { coupons } from './coupons';
import { reviews } from './reviews';

export * from './products';
export * from './categories';
export * from './brands';
export * from './combos';
export * from './collections';
export * from './coupons';
export * from './reviews';

// Helper functions for Products
export function getProducts(filters?: {
  categoryId?: string;
  brandId?: string;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isOnSale?: boolean;
  limit?: number;
}): Product[] {
  let result = [...products];

  if (filters) {
    if (filters.categoryId) {
      result = result.filter(p => p.categoryId === filters.categoryId);
    }
    if (filters.brandId) {
      result = result.filter(p => p.brandId === filters.brandId);
    }
    if (filters.isFeatured !== undefined) {
      result = result.filter(p => p.isFeatured === filters.isFeatured);
    }
    if (filters.isBestseller !== undefined) {
      result = result.filter(p => p.isBestseller === filters.isBestseller);
    }
    if (filters.isNewArrival !== undefined) {
      result = result.filter(p => p.isNewArrival === filters.isNewArrival);
    }
    if (filters.isOnSale !== undefined) {
      result = result.filter(p => filters.isOnSale ? (p.compareAtPrice && p.compareAtPrice > p.price) : true);
    }
    if (filters.limit) {
      result = result.slice(0, filters.limit);
    }
  }

  return result;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  );
}

export function getFeaturedProducts(limit?: number): Product[] {
  return getProducts({ isFeatured: true, limit });
}

export function getBestsellers(limit?: number): Product[] {
  return getProducts({ isBestseller: true, limit });
}

export function getNewArrivals(limit?: number): Product[] {
  return getProducts({ isNewArrival: true, limit });
}

export function getDeals(limit?: number): Product[] {
  return getProducts({ isOnSale: true, limit });
}

// Helper functions for Categories
export function getCategories(): Category[] {
  return categories.sort((a, b) => a.position - b.position);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return getProducts({ categoryId });
}

// Helper functions for Brands
export function getBrands(): Brand[] {
  return brands;
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find(b => b.slug === slug);
}

export function getProductsByBrand(brandId: string): Product[] {
  return getProducts({ brandId });
}

// Helper functions for Checkout & Coupons
export function validateCoupon(code: string, subtotal: number, cartCategoryIds: string[] = []): { 
  isValid: boolean; 
  discountAmount: number; 
  message: string;
  type?: 'PERCENTAGE' | 'FIXED' | 'FREE_SHIPPING';
} {
  const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
  
  if (!coupon) {
    return { isValid: false, discountAmount: 0, message: 'Invalid or expired coupon code.' };
  }

  if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
    return { isValid: false, discountAmount: 0, message: `Minimum order value of £${coupon.minOrderValue} required.` };
  }

  if (coupon.applicableCategoryIds && coupon.applicableCategoryIds.length > 0) {
    const hasValidCategory = cartCategoryIds.some(id => coupon.applicableCategoryIds!.includes(id));
    if (!hasValidCategory) {
      return { isValid: false, discountAmount: 0, message: 'Coupon not applicable to items in your cart.' };
    }
  }

  let discountAmount = 0;
  if (coupon.type === 'PERCENTAGE') {
    discountAmount = (subtotal * coupon.value) / 100;
    if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
      discountAmount = coupon.maxDiscount;
    }
  } else if (coupon.type === 'FIXED') {
    discountAmount = coupon.value;
  } else if (coupon.type === 'FREE_SHIPPING') {
    discountAmount = 0; // Handled separately in shipping logic
  }

  return { 
    isValid: true, 
    discountAmount, 
    message: 'Coupon applied successfully!',
    type: coupon.type
  };
}
