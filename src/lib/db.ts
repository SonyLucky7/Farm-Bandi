import * as data from './data';

export const db = {
  products: data.products,
  categories: data.categories,
  brands: data.brands,
  combos: data.combos,
  collections: data.collections,
  coupons: data.coupons,
  reviews: data.reviews,
  getProducts: data.getProducts,
  getProductBySlug: data.getProductBySlug,
  getCategories: data.getCategories,
  getCategoryBySlug: data.getCategoryBySlug,
  getProductsByCategory: data.getProductsByCategory,
  getBrands: data.getBrands,
  getBrandBySlug: data.getBrandBySlug,
  getProductsByBrand: data.getProductsByBrand,
  searchProducts: data.searchProducts,
  getFeaturedProducts: data.getFeaturedProducts,
  getBestsellers: data.getBestsellers,
  getNewArrivals: data.getNewArrivals,
  getDeals: data.getDeals,
  validateCoupon: data.validateCoupon,
};

export default db;
