import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: string = "GBP"): string {
  const symbol = currency === "GBP" ? "£" : currency === "USD" ? "$" : currency === "EUR" ? "€" : "₹";
  return `${symbol}${amount.toFixed(2)}`;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

export function getDiscountPercentage(original: number, sale: number): number {
  if (!original || original <= sale) return 0;
  return Math.round(((original - sale) / original) * 100);
}

export function generateOrderId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "RM-";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getProductDisplayImage(product: {
  images?: { url: string }[];
  categoryId?: string;
  image?: string;
}): string {
  if (product.image && !product.image.includes("/images/products/")) {
    return product.image;
  }
  if (
    product.images &&
    product.images[0] &&
    !product.images[0].url.includes("/images/products/")
  ) {
    return product.images[0].url;
  }

  // Map category IDs to our generated photorealistic images
  const cat = (product.categoryId || "").toLowerCase();
  if (cat.includes("dryfruit") || cat.includes("nut")) {
    return "/images/categories/category-dryfruits.jpg";
  }
  if (cat.includes("spice") || cat.includes("masala")) {
    return "/images/categories/category-spices.jpg";
  }
  if (cat.includes("rice")) {
    return "/images/categories/category-rice.jpg";
  }
  if (cat.includes("dal") || cat.includes("pulse") || cat.includes("bean")) {
    return "/images/categories/category-dals.jpg";
  }
  if (cat.includes("sweet") || cat.includes("snack") || cat.includes("namkeen")) {
    return "/images/categories/category-sweets.jpg";
  }
  if (cat.includes("fruit") || cat.includes("veg")) {
    return "/images/categories/category-fruits.jpg";
  }

  return "/images/categories/category-dryfruits.jpg";
}
