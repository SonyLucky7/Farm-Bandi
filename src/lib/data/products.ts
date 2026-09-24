export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brandId: string;
  categoryId: string;
  description: string;
  ingredients?: string;
  nutrition?: string;
  images: { url: string; alt: string; isDefault: boolean }[];
  variants: {
    id: string;
    name: string;
    sku: string;
    price: number;
    compareAtPrice?: number;
    weight: string;
    weightUnit: string;
    inventory: number;
    isDefault: boolean;
  }[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  isOrganic: boolean;
  isFeatured: boolean;
  isBestseller: boolean;
  isNewArrival: boolean;
  isSeasonal: boolean;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  createdAt: string;
}

export const products: Product[] = [
  {
    "id": "prod_cashews",
    "sku": "SKU-CASHEWS-BASE",
    "name": "Premium Cashews",
    "slug": "premium-cashews",
    "brandId": "brand_farmbandi",
    "categoryId": "cat_dryfruits",
    "description": "Premium quality whole cashews.",
    "images": [
      { "url": "/images/products/premium-cashews.jpg", "alt": "Premium Cashews", "isDefault": true }
    ],
    "variants": [
      { "id": "var_cashews_0", "name": "Premium Cashews 250g", "sku": "SKU-CASHEWS-250G", "price": 7.99, "compareAtPrice": 9.99, "weight": "250g", "weightUnit": "g", "inventory": 50, "isDefault": true },
      { "id": "var_cashews_1", "name": "Premium Cashews 500g", "sku": "SKU-CASHEWS-500G", "price": 14.99, "compareAtPrice": 18.99, "weight": "500g", "weightUnit": "g", "inventory": 50, "isDefault": false },
      { "id": "var_cashews_2", "name": "Premium Cashews 1kg", "sku": "SKU-CASHEWS-1KG", "price": 24.99, "compareAtPrice": 32.99, "weight": "1kg", "weightUnit": "kg", "inventory": 50, "isDefault": false }
    ],
    "price": 7.99,
    "compareAtPrice": 9.99,
    "currency": "GBP",
    "rating": 4.8,
    "reviewCount": 120,
    "tags": ["cashews", "nuts", "premium"],
    "isOrganic": true,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_anjeer",
    "sku": "SKU-ANJEER-BASE",
    "name": "Premium Anjeer (Figs)",
    "slug": "premium-anjeer-(figs)",
    "brandId": "brand_farmbandi",
    "categoryId": "cat_dryfruits",
    "description": "Sweet and nutritious dried figs.",
    "images": [
      { "url": "/images/products/premium-anjeer-(figs).jpg", "alt": "Premium Anjeer (Figs)", "isDefault": true }
    ],
    "variants": [
      { "id": "var_anjeer_0", "name": "Premium Anjeer (Figs) 250g", "sku": "SKU-ANJEER-250G", "price": 6.99, "compareAtPrice": 8.99, "weight": "250g", "weightUnit": "g", "inventory": 45, "isDefault": true },
      { "id": "var_anjeer_1", "name": "Premium Anjeer (Figs) 500g", "sku": "SKU-ANJEER-500G", "price": 12.99, "compareAtPrice": 15.99, "weight": "500g", "weightUnit": "g", "inventory": 30, "isDefault": false }
    ],
    "price": 6.99,
    "compareAtPrice": 8.99,
    "currency": "GBP",
    "rating": 4.5,
    "reviewCount": 42,
    "tags": ["anjeer", "figs", "dry fruits"],
    "isOrganic": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_chia_seeds",
    "sku": "SKU-CHIA_SEEDS-BASE",
    "name": "Organic Chia Seeds",
    "slug": "organic-chia-seeds",
    "brandId": "brand_farmbandi",
    "categoryId": "cat_dryfruits",
    "description": "High quality chia seeds rich in omega-3.",
    "images": [
      { "url": "/images/products/organic-chia-seeds.jpg", "alt": "Organic Chia Seeds", "isDefault": true }
    ],
    "variants": [
      { "id": "var_chia_seeds_0", "name": "Organic Chia Seeds 250g", "sku": "SKU-CHIA_SEEDS-250G", "price": 4.99, "compareAtPrice": 5.99, "weight": "250g", "weightUnit": "g", "inventory": 60, "isDefault": true },
      { "id": "var_chia_seeds_1", "name": "Organic Chia Seeds 500g", "sku": "SKU-CHIA_SEEDS-500G", "price": 8.99, "compareAtPrice": 10.99, "weight": "500g", "weightUnit": "g", "inventory": 40, "isDefault": false }
    ],
    "price": 4.99,
    "compareAtPrice": 5.99,
    "currency": "GBP",
    "rating": 4.6,
    "reviewCount": 85,
    "tags": ["chia", "seeds", "healthy"],
    "isOrganic": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": true,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_almonds",
    "sku": "SKU-ALMONDS-BASE",
    "name": "California Almonds",
    "slug": "california-almonds",
    "brandId": "brand_farmbandi",
    "categoryId": "cat_dryfruits",
    "description": "Crunchy and healthy almonds.",
    "images": [
      { "url": "/images/products/california-almonds.jpg", "alt": "California Almonds", "isDefault": true }
    ],
    "variants": [
      { "id": "var_almonds_0", "name": "California Almonds 250g", "sku": "SKU-ALMONDS-250G", "price": 6.49, "compareAtPrice": 7.99, "weight": "250g", "weightUnit": "g", "inventory": 70, "isDefault": true },
      { "id": "var_almonds_1", "name": "California Almonds 500g", "sku": "SKU-ALMONDS-500G", "price": 11.99, "compareAtPrice": 14.99, "weight": "500g", "weightUnit": "g", "inventory": 50, "isDefault": false }
    ],
    "price": 6.49,
    "compareAtPrice": 7.99,
    "currency": "GBP",
    "rating": 4.7,
    "reviewCount": 110,
    "tags": ["almonds", "nuts"],
    "isOrganic": false,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_pistachios",
    "sku": "SKU-PISTACHIOS-BASE",
    "name": "Roasted Pistachios",
    "slug": "roasted-pistachios",
    "brandId": "brand_farmbandi",
    "categoryId": "cat_dryfruits",
    "description": "Lightly salted roasted pistachios.",
    "images": [
      { "url": "/images/products/roasted-pistachios.jpg", "alt": "Roasted Pistachios", "isDefault": true }
    ],
    "variants": [
      { "id": "var_pistachios_0", "name": "Roasted Pistachios 250g", "sku": "SKU-PISTACHIOS-250G", "price": 8.99, "compareAtPrice": 10.99, "weight": "250g", "weightUnit": "g", "inventory": 65, "isDefault": true },
      { "id": "var_pistachios_1", "name": "Roasted Pistachios 500g", "sku": "SKU-PISTACHIOS-500G", "price": 16.99, "compareAtPrice": 20.99, "weight": "500g", "weightUnit": "g", "inventory": 40, "isDefault": false }
    ],
    "price": 8.99,
    "compareAtPrice": 10.99,
    "currency": "GBP",
    "rating": 4.9,
    "reviewCount": 130,
    "tags": ["pistachios", "nuts", "roasted"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": true,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_walnuts",
    "sku": "SKU-WALNUTS-BASE",
    "name": "Kashmiri Walnuts",
    "slug": "kashmiri-walnuts",
    "brandId": "brand_farmbandi",
    "categoryId": "cat_dryfruits",
    "description": "Premium walnut kernels.",
    "images": [
      { "url": "/images/products/kashmiri-walnuts.jpg", "alt": "Kashmiri Walnuts", "isDefault": true }
    ],
    "variants": [
      { "id": "var_walnuts_0", "name": "Kashmiri Walnuts 250g", "sku": "SKU-WALNUTS-250G", "price": 7.49, "compareAtPrice": 8.99, "weight": "250g", "weightUnit": "g", "inventory": 55, "isDefault": true },
      { "id": "var_walnuts_1", "name": "Kashmiri Walnuts 500g", "sku": "SKU-WALNUTS-500G", "price": 13.99, "compareAtPrice": 16.99, "weight": "500g", "weightUnit": "g", "inventory": 35, "isDefault": false }
    ],
    "price": 7.49,
    "compareAtPrice": 8.99,
    "currency": "GBP",
    "rating": 4.4,
    "reviewCount": 65,
    "tags": ["walnuts", "nuts"],
    "isOrganic": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_raisins",
    "sku": "SKU-RAISINS-BASE",
    "name": "Golden Raisins (Kishmish)",
    "slug": "golden-raisins-(kishmish)",
    "brandId": "brand_farmbandi",
    "categoryId": "cat_dryfruits",
    "description": "Sweet golden raisins.",
    "images": [
      { "url": "/images/products/golden-raisins-(kishmish).jpg", "alt": "Golden Raisins (Kishmish)", "isDefault": true }
    ],
    "variants": [
      { "id": "var_raisins_0", "name": "Golden Raisins (Kishmish) 250g", "sku": "SKU-RAISINS-250G", "price": 3.49, "compareAtPrice": 4.49, "weight": "250g", "weightUnit": "g", "inventory": 80, "isDefault": true },
      { "id": "var_raisins_1", "name": "Golden Raisins (Kishmish) 500g", "sku": "SKU-RAISINS-500G", "price": 5.99, "compareAtPrice": 7.99, "weight": "500g", "weightUnit": "g", "inventory": 60, "isDefault": false }
    ],
    "price": 3.49,
    "compareAtPrice": 4.49,
    "currency": "GBP",
    "rating": 4.6,
    "reviewCount": 78,
    "tags": ["raisins", "kishmish", "dry fruits"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_pumpkin_seeds",
    "sku": "SKU-PUMPKIN_SEEDS-BASE",
    "name": "Pumpkin Seeds",
    "slug": "pumpkin-seeds",
    "brandId": "brand_farmbandi",
    "categoryId": "cat_dryfruits",
    "description": "Healthy roasted pumpkin seeds.",
    "images": [
      { "url": "/images/products/pumpkin-seeds.jpg", "alt": "Pumpkin Seeds", "isDefault": true }
    ],
    "variants": [
      { "id": "var_pumpkin_seeds_0", "name": "Pumpkin Seeds 250g", "sku": "SKU-PUMPKIN_SEEDS-250G", "price": 4.49, "compareAtPrice": 5.99, "weight": "250g", "weightUnit": "g", "inventory": 45, "isDefault": true }
    ],
    "price": 4.49,
    "compareAtPrice": 5.99,
    "currency": "GBP",
    "rating": 4.5,
    "reviewCount": 34,
    "tags": ["pumpkin seeds", "seeds"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_flax_seeds",
    "sku": "SKU-FLAX_SEEDS-BASE",
    "name": "Roasted Flax Seeds",
    "slug": "roasted-flax-seeds",
    "brandId": "brand_farmbandi",
    "categoryId": "cat_dryfruits",
    "description": "Nutritious roasted flax seeds.",
    "images": [
      { "url": "/images/products/roasted-flax-seeds.jpg", "alt": "Roasted Flax Seeds", "isDefault": true }
    ],
    "variants": [
      { "id": "var_flax_seeds_0", "name": "Roasted Flax Seeds 250g", "sku": "SKU-FLAX_SEEDS-250G", "price": 3.99, "compareAtPrice": 4.99, "weight": "250g", "weightUnit": "g", "inventory": 50, "isDefault": true }
    ],
    "price": 3.99,
    "compareAtPrice": 4.99,
    "currency": "GBP",
    "rating": 4.7,
    "reviewCount": 55,
    "tags": ["flax seeds", "seeds"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_aashirvaad_atta_1",
    "sku": "SKU-AASHIRVAAD_ATTA_1-BASE",
    "name": "Aashirvaad Whole Wheat Atta 1kg",
    "slug": "aashirvaad-whole-wheat-atta-1kg",
    "brandId": "brand_aashirvaad",
    "categoryId": "cat_flours",
    "description": "Premium whole wheat flour.",
    "images": [
      { "url": "/images/products/aashirvaad-whole-wheat-atta-1kg.jpg", "alt": "Aashirvaad Whole Wheat Atta 1kg", "isDefault": true }
    ],
    "variants": [
      { "id": "var_aashirvaad_atta_1_0", "name": "Aashirvaad Whole Wheat Atta 1kg 1kg", "sku": "SKU-AASHIRVAAD_ATTA_1-1KG", "price": 2.49, "compareAtPrice": 2.99, "weight": "1kg", "weightUnit": "kg", "inventory": 100, "isDefault": true }
    ],
    "price": 2.49,
    "compareAtPrice": 2.99,
    "currency": "GBP",
    "rating": 4.8,
    "reviewCount": 200,
    "tags": ["atta", "flour", "wheat"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": true,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_aashirvaad_atta_5",
    "sku": "SKU-AASHIRVAAD_ATTA_5-BASE",
    "name": "Aashirvaad Whole Wheat Atta 5kg",
    "slug": "aashirvaad-whole-wheat-atta-5kg",
    "brandId": "brand_aashirvaad",
    "categoryId": "cat_flours",
    "description": "Premium whole wheat flour.",
    "images": [
      { "url": "/images/products/aashirvaad-whole-wheat-atta-5kg.jpg", "alt": "Aashirvaad Whole Wheat Atta 5kg", "isDefault": true }
    ],
    "variants": [
      { "id": "var_aashirvaad_atta_5_0", "name": "Aashirvaad Whole Wheat Atta 5kg 5kg", "sku": "SKU-AASHIRVAAD_ATTA_5-5KG", "price": 8.99, "compareAtPrice": 10.99, "weight": "5kg", "weightUnit": "kg", "inventory": 80, "isDefault": true }
    ],
    "price": 8.99,
    "compareAtPrice": 10.99,
    "currency": "GBP",
    "rating": 4.9,
    "reviewCount": 350,
    "tags": ["atta", "flour", "wheat"],
    "isOrganic": false,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_aashirvaad_atta_10",
    "sku": "SKU-AASHIRVAAD_ATTA_10-BASE",
    "name": "Aashirvaad Whole Wheat Atta 10kg",
    "slug": "aashirvaad-whole-wheat-atta-10kg",
    "brandId": "brand_aashirvaad",
    "categoryId": "cat_flours",
    "description": "Premium whole wheat flour.",
    "images": [
      { "url": "/images/products/aashirvaad-whole-wheat-atta-10kg.jpg", "alt": "Aashirvaad Whole Wheat Atta 10kg", "isDefault": true }
    ],
    "variants": [
      { "id": "var_aashirvaad_atta_10_0", "name": "Aashirvaad Whole Wheat Atta 10kg 10kg", "sku": "SKU-AASHIRVAAD_ATTA_10-10KG", "price": 15.99, "compareAtPrice": 18.99, "weight": "10kg", "weightUnit": "kg", "inventory": 60, "isDefault": true }
    ],
    "price": 15.99,
    "compareAtPrice": 18.99,
    "currency": "GBP",
    "rating": 4.8,
    "reviewCount": 210,
    "tags": ["atta", "flour", "wheat"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": true,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_tata_salt",
    "sku": "SKU-TATA_SALT-BASE",
    "name": "Tata Salt",
    "slug": "tata-salt",
    "brandId": "brand_tata",
    "categoryId": "cat_spices",
    "description": "Vacuum evaporated iodized salt.",
    "images": [
      { "url": "/images/products/tata-salt.jpg", "alt": "Tata Salt", "isDefault": true }
    ],
    "variants": [
      { "id": "var_tata_salt_0", "name": "Tata Salt 1kg", "sku": "SKU-TATA_SALT-1KG", "price": 0.99, "weight": "1kg", "weightUnit": "kg", "inventory": 200, "isDefault": true }
    ],
    "price": 0.99,
    "currency": "GBP",
    "rating": 4.9,
    "reviewCount": 400,
    "tags": ["salt", "staple"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": true,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_tata_tea",
    "sku": "SKU-TATA_TEA-BASE",
    "name": "Tata Tea Gold",
    "slug": "tata-tea-gold",
    "brandId": "brand_tata",
    "categoryId": "cat_beverages",
    "description": "Premium Assam tea blend.",
    "images": [
      { "url": "/images/products/tata-tea-gold.jpg", "alt": "Tata Tea Gold", "isDefault": true }
    ],
    "variants": [
      { "id": "var_tata_tea_0", "name": "Tata Tea Gold 500g", "sku": "SKU-TATA_TEA-500G", "price": 3.49, "compareAtPrice": 4.49, "weight": "500g", "weightUnit": "g", "inventory": 150, "isDefault": true }
    ],
    "price": 3.49,
    "compareAtPrice": 4.49,
    "currency": "GBP",
    "rating": 4.7,
    "reviewCount": 180,
    "tags": ["tea", "beverage", "chai"],
    "isOrganic": false,
    "isFeatured": true,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_tata_sampann_dal",
    "sku": "SKU-TATA_SAMPANN_DAL-BASE",
    "name": "Tata Sampann Toor Dal",
    "slug": "tata-sampann-toor-dal",
    "brandId": "brand_tata",
    "categoryId": "cat_dals",
    "description": "Unpolished pure toor dal.",
    "images": [
      { "url": "/images/products/tata-sampann-toor-dal.jpg", "alt": "Tata Sampann Toor Dal", "isDefault": true }
    ],
    "variants": [
      { "id": "var_tata_sampann_dal_0", "name": "Tata Sampann Toor Dal 1kg", "sku": "SKU-TATA_SAMPANN_DAL-1KG", "price": 2.99, "compareAtPrice": 3.49, "weight": "1kg", "weightUnit": "kg", "inventory": 120, "isDefault": true }
    ],
    "price": 2.99,
    "compareAtPrice": 3.49,
    "currency": "GBP",
    "rating": 4.6,
    "reviewCount": 90,
    "tags": ["dal", "lentils", "toor"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_mtr_pav_bhaji",
    "sku": "SKU-MTR_PAV_BHAJI-BASE",
    "name": "MTR Ready-to-Eat Pav Bhaji",
    "slug": "mtr-ready-to-eat-pav-bhaji",
    "brandId": "brand_mtr",
    "categoryId": "cat_ready_eat",
    "description": "Authentic Mumbai style Pav Bhaji.",
    "images": [
      { "url": "/images/products/mtr-ready-to-eat-pav-bhaji.jpg", "alt": "MTR Ready-to-Eat Pav Bhaji", "isDefault": true }
    ],
    "variants": [
      { "id": "var_mtr_pav_bhaji_0", "name": "MTR Ready-to-Eat Pav Bhaji 300g", "sku": "SKU-MTR_PAV_BHAJI-300G", "price": 2.49, "compareAtPrice": 2.99, "weight": "300g", "weightUnit": "g", "inventory": 80, "isDefault": true }
    ],
    "price": 2.49,
    "compareAtPrice": 2.99,
    "currency": "GBP",
    "rating": 4.4,
    "reviewCount": 55,
    "tags": ["rte", "ready to eat", "curry"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_mtr_palak_paneer",
    "sku": "SKU-MTR_PALAK_PANEER-BASE",
    "name": "MTR Ready-to-Eat Palak Paneer",
    "slug": "mtr-ready-to-eat-palak-paneer",
    "brandId": "brand_mtr",
    "categoryId": "cat_ready_eat",
    "description": "Classic Palak Paneer curry.",
    "images": [
      { "url": "/images/products/mtr-ready-to-eat-palak-paneer.jpg", "alt": "MTR Ready-to-Eat Palak Paneer", "isDefault": true }
    ],
    "variants": [
      { "id": "var_mtr_palak_paneer_0", "name": "MTR Ready-to-Eat Palak Paneer 300g", "sku": "SKU-MTR_PALAK_PANEER-300G", "price": 2.49, "compareAtPrice": 2.99, "weight": "300g", "weightUnit": "g", "inventory": 70, "isDefault": true }
    ],
    "price": 2.49,
    "compareAtPrice": 2.99,
    "currency": "GBP",
    "rating": 4.5,
    "reviewCount": 65,
    "tags": ["rte", "ready to eat", "curry", "paneer"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_mtr_dal_makhani",
    "sku": "SKU-MTR_DAL_MAKHANI-BASE",
    "name": "MTR Ready-to-Eat Dal Makhani",
    "slug": "mtr-ready-to-eat-dal-makhani",
    "brandId": "brand_mtr",
    "categoryId": "cat_ready_eat",
    "description": "Rich and creamy Dal Makhani.",
    "images": [
      { "url": "/images/products/mtr-ready-to-eat-dal-makhani.jpg", "alt": "MTR Ready-to-Eat Dal Makhani", "isDefault": true }
    ],
    "variants": [
      { "id": "var_mtr_dal_makhani_0", "name": "MTR Ready-to-Eat Dal Makhani 300g", "sku": "SKU-MTR_DAL_MAKHANI-300G", "price": 2.49, "compareAtPrice": 2.99, "weight": "300g", "weightUnit": "g", "inventory": 75, "isDefault": true }
    ],
    "price": 2.49,
    "compareAtPrice": 2.99,
    "currency": "GBP",
    "rating": 4.6,
    "reviewCount": 70,
    "tags": ["rte", "ready to eat", "curry", "dal"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_haldirams_mix",
    "sku": "SKU-HALDIRAMS_MIX-BASE",
    "name": "Haldiram's Navrattan Mix",
    "slug": "haldirams-navrattan-mix",
    "brandId": "brand_haldirams",
    "categoryId": "cat_sweets",
    "description": "Spicy and crunchy namkeen mix.",
    "images": [
      { "url": "/images/products/haldirams-navrattan-mix.jpg", "alt": "Haldiram's Navrattan Mix", "isDefault": true }
    ],
    "variants": [
      { "id": "var_haldirams_mix_0", "name": "Haldiram's Navrattan Mix 400g", "sku": "SKU-HALDIRAMS_MIX-400G", "price": 2.99, "compareAtPrice": 3.49, "weight": "400g", "weightUnit": "g", "inventory": 120, "isDefault": true }
    ],
    "price": 2.99,
    "compareAtPrice": 3.49,
    "currency": "GBP",
    "rating": 4.8,
    "reviewCount": 150,
    "tags": ["namkeen", "snacks"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": true,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_soan_papdi",
    "sku": "SKU-SOAN_PAPDI-BASE",
    "name": "Haldiram's Soan Papdi",
    "slug": "haldirams-soan-papdi",
    "brandId": "brand_haldirams",
    "categoryId": "cat_sweets",
    "description": "Classic Indian flaky sweet.",
    "images": [
      { "url": "/images/products/haldirams-soan-papdi.jpg", "alt": "Haldiram's Soan Papdi", "isDefault": true }
    ],
    "variants": [
      { "id": "var_soan_papdi_0", "name": "Haldiram's Soan Papdi 500g", "sku": "SKU-SOAN_PAPDI-500G", "price": 4.99, "compareAtPrice": 5.99, "weight": "500g", "weightUnit": "g", "inventory": 100, "isDefault": true }
    ],
    "price": 4.99,
    "compareAtPrice": 5.99,
    "currency": "GBP",
    "rating": 4.7,
    "reviewCount": 130,
    "tags": ["sweet", "dessert"],
    "isOrganic": false,
    "isFeatured": true,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_rasgulla",
    "sku": "SKU-RASGULLA-BASE",
    "name": "Haldiram's Rasgulla",
    "slug": "haldirams-rasgulla",
    "brandId": "brand_haldirams",
    "categoryId": "cat_sweets",
    "description": "Spongy rasgulla in syrup.",
    "images": [
      { "url": "/images/products/haldirams-rasgulla.jpg", "alt": "Haldiram's Rasgulla", "isDefault": true }
    ],
    "variants": [
      { "id": "var_rasgulla_0", "name": "Haldiram's Rasgulla 1kg", "sku": "SKU-RASGULLA-1KG", "price": 3.99, "compareAtPrice": 4.99, "weight": "1kg", "weightUnit": "kg", "inventory": 85, "isDefault": true }
    ],
    "price": 3.99,
    "compareAtPrice": 4.99,
    "currency": "GBP",
    "rating": 4.6,
    "reviewCount": 95,
    "tags": ["sweet", "dessert"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_garam_masala",
    "sku": "SKU-GARAM_MASALA-BASE",
    "name": "MDH Garam Masala",
    "slug": "mdh-garam-masala",
    "brandId": "brand_mdh",
    "categoryId": "cat_spices",
    "description": "Authentic spice blend.",
    "images": [
      { "url": "/images/products/mdh-garam-masala.jpg", "alt": "MDH Garam Masala", "isDefault": true }
    ],
    "variants": [
      { "id": "var_garam_masala_0", "name": "MDH Garam Masala 100g", "sku": "SKU-GARAM_MASALA-100G", "price": 1.99, "compareAtPrice": 2.49, "weight": "100g", "weightUnit": "g", "inventory": 150, "isDefault": true }
    ],
    "price": 1.99,
    "compareAtPrice": 2.49,
    "currency": "GBP",
    "rating": 4.8,
    "reviewCount": 180,
    "tags": ["masala", "spice", "garam masala"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": true,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_chana_masala",
    "sku": "SKU-CHANA_MASALA-BASE",
    "name": "MDH Chana Masala",
    "slug": "mdh-chana-masala",
    "brandId": "brand_mdh",
    "categoryId": "cat_spices",
    "description": "Spice blend for chickpea curry.",
    "images": [
      { "url": "/images/products/mdh-chana-masala.jpg", "alt": "MDH Chana Masala", "isDefault": true }
    ],
    "variants": [
      { "id": "var_chana_masala_0", "name": "MDH Chana Masala 100g", "sku": "SKU-CHANA_MASALA-100G", "price": 1.79, "compareAtPrice": 2.29, "weight": "100g", "weightUnit": "g", "inventory": 130, "isDefault": true }
    ],
    "price": 1.79,
    "compareAtPrice": 2.29,
    "currency": "GBP",
    "rating": 4.6,
    "reviewCount": 110,
    "tags": ["masala", "spice"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_biryani_masala",
    "sku": "SKU-BIRYANI_MASALA-BASE",
    "name": "MDH Biryani Masala",
    "slug": "mdh-biryani-masala",
    "brandId": "brand_mdh",
    "categoryId": "cat_spices",
    "description": "Aromatic biryani spice blend.",
    "images": [
      { "url": "/images/products/mdh-biryani-masala.jpg", "alt": "MDH Biryani Masala", "isDefault": true }
    ],
    "variants": [
      { "id": "var_biryani_masala_0", "name": "MDH Biryani Masala 100g", "sku": "SKU-BIRYANI_MASALA-100G", "price": 2.29, "compareAtPrice": 2.79, "weight": "100g", "weightUnit": "g", "inventory": 120, "isDefault": true }
    ],
    "price": 2.29,
    "compareAtPrice": 2.79,
    "currency": "GBP",
    "rating": 4.7,
    "reviewCount": 140,
    "tags": ["masala", "spice", "biryani"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_turmeric",
    "sku": "SKU-TURMERIC-BASE",
    "name": "Everest Turmeric Powder",
    "slug": "everest-turmeric-powder",
    "brandId": "brand_everest",
    "categoryId": "cat_spices",
    "description": "Pure haldi powder.",
    "images": [
      { "url": "/images/products/everest-turmeric-powder.jpg", "alt": "Everest Turmeric Powder", "isDefault": true }
    ],
    "variants": [
      { "id": "var_turmeric_0", "name": "Everest Turmeric Powder 200g", "sku": "SKU-TURMERIC-200G", "price": 1.49, "compareAtPrice": 1.99, "weight": "200g", "weightUnit": "g", "inventory": 200, "isDefault": true }
    ],
    "price": 1.49,
    "compareAtPrice": 1.99,
    "currency": "GBP",
    "rating": 4.8,
    "reviewCount": 190,
    "tags": ["spice", "turmeric", "haldi"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": true,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_chilli_powder",
    "sku": "SKU-CHILLI_POWDER-BASE",
    "name": "Everest Red Chilli Powder",
    "slug": "everest-red-chilli-powder",
    "brandId": "brand_everest",
    "categoryId": "cat_spices",
    "description": "Spicy lal mirch powder.",
    "images": [
      { "url": "/images/products/everest-red-chilli-powder.jpg", "alt": "Everest Red Chilli Powder", "isDefault": true }
    ],
    "variants": [
      { "id": "var_chilli_powder_0", "name": "Everest Red Chilli Powder 200g", "sku": "SKU-CHILLI_POWDER-200G", "price": 1.69, "compareAtPrice": 2.19, "weight": "200g", "weightUnit": "g", "inventory": 180, "isDefault": true }
    ],
    "price": 1.69,
    "compareAtPrice": 2.19,
    "currency": "GBP",
    "rating": 4.7,
    "reviewCount": 160,
    "tags": ["spice", "chilli", "mirch"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_meat_masala",
    "sku": "SKU-MEAT_MASALA-BASE",
    "name": "Everest Meat Masala",
    "slug": "everest-meat-masala",
    "brandId": "brand_everest",
    "categoryId": "cat_spices",
    "description": "Rich spice blend for non-veg curries.",
    "images": [
      { "url": "/images/products/everest-meat-masala.jpg", "alt": "Everest Meat Masala", "isDefault": true }
    ],
    "variants": [
      { "id": "var_meat_masala_0", "name": "Everest Meat Masala 100g", "sku": "SKU-MEAT_MASALA-100G", "price": 2.49, "compareAtPrice": 2.99, "weight": "100g", "weightUnit": "g", "inventory": 110, "isDefault": true }
    ],
    "price": 2.49,
    "compareAtPrice": 2.99,
    "currency": "GBP",
    "rating": 4.6,
    "reviewCount": 105,
    "tags": ["masala", "spice", "non-veg"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_organic_toor_dal",
    "sku": "SKU-ORGANIC_TOOR_DAL-BASE",
    "name": "24 Mantra Organic Toor Dal",
    "slug": "24-mantra-organic-toor-dal",
    "brandId": "brand_24mantra",
    "categoryId": "cat_dals",
    "description": "100% Organic unpolished toor dal.",
    "images": [
      { "url": "/images/products/24-mantra-organic-toor-dal.jpg", "alt": "24 Mantra Organic Toor Dal", "isDefault": true }
    ],
    "variants": [
      { "id": "var_organic_toor_dal_0", "name": "24 Mantra Organic Toor Dal 1kg", "sku": "SKU-ORGANIC_TOOR_DAL-1KG", "price": 3.99, "compareAtPrice": 4.99, "weight": "1kg", "weightUnit": "kg", "inventory": 90, "isDefault": true }
    ],
    "price": 3.99,
    "compareAtPrice": 4.99,
    "currency": "GBP",
    "rating": 4.8,
    "reviewCount": 85,
    "tags": ["organic", "dal", "toor dal"],
    "isOrganic": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_organic_rice",
    "sku": "SKU-ORGANIC_RICE-BASE",
    "name": "24 Mantra Organic Sonamasuri Rice",
    "slug": "24-mantra-organic-sonamasuri-rice",
    "brandId": "brand_24mantra",
    "categoryId": "cat_rice",
    "description": "Organic everyday rice.",
    "images": [
      { "url": "/images/products/24-mantra-organic-sonamasuri-rice.jpg", "alt": "24 Mantra Organic Sonamasuri Rice", "isDefault": true }
    ],
    "variants": [
      { "id": "var_organic_rice_0", "name": "24 Mantra Organic Sonamasuri Rice 1kg", "sku": "SKU-ORGANIC_RICE-1KG", "price": 4.99, "compareAtPrice": 5.99, "weight": "1kg", "weightUnit": "kg", "inventory": 80, "isDefault": true }
    ],
    "price": 4.99,
    "compareAtPrice": 5.99,
    "currency": "GBP",
    "rating": 4.7,
    "reviewCount": 75,
    "tags": ["organic", "rice"],
    "isOrganic": true,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_organic_jaggery",
    "sku": "SKU-ORGANIC_JAGGERY-BASE",
    "name": "24 Mantra Organic Jaggery Powder",
    "slug": "24-mantra-organic-jaggery-powder",
    "brandId": "brand_24mantra",
    "categoryId": "cat_sweets",
    "description": "Pure organic jaggery powder.",
    "images": [
      { "url": "/images/products/24-mantra-organic-jaggery-powder.jpg", "alt": "24 Mantra Organic Jaggery Powder", "isDefault": true }
    ],
    "variants": [
      { "id": "var_organic_jaggery_0", "name": "24 Mantra Organic Jaggery Powder 500g", "sku": "SKU-ORGANIC_JAGGERY-500G", "price": 3.49, "compareAtPrice": 4.49, "weight": "500g", "weightUnit": "g", "inventory": 100, "isDefault": true }
    ],
    "price": 3.49,
    "compareAtPrice": 4.49,
    "currency": "GBP",
    "rating": 4.9,
    "reviewCount": 115,
    "tags": ["organic", "jaggery", "sweetener"],
    "isOrganic": true,
    "isFeatured": true,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_dabur_honey_250",
    "sku": "SKU-DABUR_HONEY_250-BASE",
    "name": "Dabur Pure Honey 250g",
    "slug": "dabur-pure-honey-250g",
    "brandId": "brand_dabur",
    "categoryId": "cat_sweets",
    "description": "Pure and natural honey.",
    "images": [
      { "url": "/images/products/dabur-pure-honey-250g.jpg", "alt": "Dabur Pure Honey 250g", "isDefault": true }
    ],
    "variants": [
      { "id": "var_dabur_honey_250_0", "name": "Dabur Pure Honey 250g 250g", "sku": "SKU-DABUR_HONEY_250-250G", "price": 4.99, "compareAtPrice": 5.99, "weight": "250g", "weightUnit": "g", "inventory": 120, "isDefault": true }
    ],
    "price": 4.99,
    "compareAtPrice": 5.99,
    "currency": "GBP",
    "rating": 4.8,
    "reviewCount": 140,
    "tags": ["honey", "sweetener"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_dabur_honey_500",
    "sku": "SKU-DABUR_HONEY_500-BASE",
    "name": "Dabur Pure Honey 500g",
    "slug": "dabur-pure-honey-500g",
    "brandId": "brand_dabur",
    "categoryId": "cat_sweets",
    "description": "Pure and natural honey.",
    "images": [
      { "url": "/images/products/dabur-pure-honey-500g.jpg", "alt": "Dabur Pure Honey 500g", "isDefault": true }
    ],
    "variants": [
      { "id": "var_dabur_honey_500_0", "name": "Dabur Pure Honey 500g 500g", "sku": "SKU-DABUR_HONEY_500-500G", "price": 8.99, "compareAtPrice": 10.99, "weight": "500g", "weightUnit": "g", "inventory": 90, "isDefault": true }
    ],
    "price": 8.99,
    "compareAtPrice": 10.99,
    "currency": "GBP",
    "rating": 4.9,
    "reviewCount": 160,
    "tags": ["honey", "sweetener"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": true,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_chyawanprash",
    "sku": "SKU-CHYAWANPRASH-BASE",
    "name": "Dabur Chyawanprash",
    "slug": "dabur-chyawanprash",
    "brandId": "brand_dabur",
    "categoryId": "cat_beverages",
    "description": "Ayurvedic immunity booster.",
    "images": [
      { "url": "/images/products/dabur-chyawanprash.jpg", "alt": "Dabur Chyawanprash", "isDefault": true }
    ],
    "variants": [
      { "id": "var_chyawanprash_0", "name": "Dabur Chyawanprash 500g", "sku": "SKU-CHYAWANPRASH-500G", "price": 6.99, "compareAtPrice": 8.49, "weight": "500g", "weightUnit": "g", "inventory": 80, "isDefault": true }
    ],
    "price": 6.99,
    "compareAtPrice": 8.49,
    "currency": "GBP",
    "rating": 4.7,
    "reviewCount": 130,
    "tags": ["ayurveda", "immunity"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_patanjali_ghee_500",
    "sku": "SKU-PATANJALI_GHEE_500-BASE",
    "name": "Patanjali Cow Ghee 500ml",
    "slug": "patanjali-cow-ghee-500ml",
    "brandId": "brand_patanjali",
    "categoryId": "cat_oils",
    "description": "Pure cow ghee.",
    "images": [
      { "url": "/images/products/patanjali-cow-ghee-500ml.jpg", "alt": "Patanjali Cow Ghee 500ml", "isDefault": true }
    ],
    "variants": [
      { "id": "var_patanjali_ghee_500_0", "name": "Patanjali Cow Ghee 500ml 500ml", "sku": "SKU-PATANJALI_GHEE_500-500ML", "price": 5.99, "compareAtPrice": 6.99, "weight": "500ml", "weightUnit": "ml", "inventory": 110, "isDefault": true }
    ],
    "price": 5.99,
    "compareAtPrice": 6.99,
    "currency": "GBP",
    "rating": 4.8,
    "reviewCount": 150,
    "tags": ["ghee", "oil", "cow ghee"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_patanjali_ghee_1l",
    "sku": "SKU-PATANJALI_GHEE_1L-BASE",
    "name": "Patanjali Cow Ghee 1L",
    "slug": "patanjali-cow-ghee-1l",
    "brandId": "brand_patanjali",
    "categoryId": "cat_oils",
    "description": "Pure cow ghee.",
    "images": [
      { "url": "/images/products/patanjali-cow-ghee-1l.jpg", "alt": "Patanjali Cow Ghee 1L", "isDefault": true }
    ],
    "variants": [
      { "id": "var_patanjali_ghee_1l_0", "name": "Patanjali Cow Ghee 1L 1L", "sku": "SKU-PATANJALI_GHEE_1L-1L", "price": 10.99, "compareAtPrice": 12.99, "weight": "1L", "weightUnit": "L", "inventory": 85, "isDefault": true }
    ],
    "price": 10.99,
    "compareAtPrice": 12.99,
    "currency": "GBP",
    "rating": 4.9,
    "reviewCount": 190,
    "tags": ["ghee", "oil", "cow ghee"],
    "isOrganic": false,
    "isFeatured": true,
    "isBestseller": true,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_mango",
    "sku": "SKU-MANGO-BASE",
    "name": "Fresh Alphonso Mango (Seasonal)",
    "slug": "fresh-alphonso-mango-(seasonal)",
    "brandId": "brand_generic",
    "categoryId": "cat_fruits_veg",
    "description": "Sweet and juicy fresh mangoes.",
    "images": [
      { "url": "/images/products/fresh-alphonso-mango-(seasonal).jpg", "alt": "Fresh Alphonso Mango (Seasonal)", "isDefault": true }
    ],
    "variants": [
      { "id": "var_mango_0", "name": "Fresh Alphonso Mango (Seasonal) 1kg", "sku": "SKU-MANGO-1KG", "price": 3.99, "weight": "1kg", "weightUnit": "kg", "inventory": 40, "isDefault": true }
    ],
    "price": 3.99,
    "currency": "GBP",
    "rating": 4.9,
    "reviewCount": 120,
    "tags": ["fruit", "fresh", "mango", "seasonal"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": true,
    "isSeasonal": true,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_coconut",
    "sku": "SKU-COCONUT-BASE",
    "name": "Fresh Coconut",
    "slug": "fresh-coconut",
    "brandId": "brand_generic",
    "categoryId": "cat_fruits_veg",
    "description": "Fresh mature coconut.",
    "images": [
      { "url": "/images/products/fresh-coconut.jpg", "alt": "Fresh Coconut", "isDefault": true }
    ],
    "variants": [
      { "id": "var_coconut_0", "name": "Fresh Coconut 1 pc", "sku": "SKU-COCONUT-1PC", "price": 1.99, "weight": "1 pc", "weightUnit": "pc", "inventory": 150, "isDefault": true }
    ],
    "price": 1.99,
    "currency": "GBP",
    "rating": 4.6,
    "reviewCount": 60,
    "tags": ["fresh", "coconut"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_basmati_5",
    "sku": "SKU-BASMATI_5-BASE",
    "name": "Premium Basmati Rice 5kg",
    "slug": "premium-basmati-rice-5kg",
    "brandId": "brand_generic",
    "categoryId": "cat_rice",
    "description": "Long grain aromatic basmati rice.",
    "images": [
      { "url": "/images/products/premium-basmati-rice-5kg.jpg", "alt": "Premium Basmati Rice 5kg", "isDefault": true }
    ],
    "variants": [
      { "id": "var_basmati_5_0", "name": "Premium Basmati Rice 5kg 5kg", "sku": "SKU-BASMATI_5-5KG", "price": 12.99, "compareAtPrice": 14.99, "weight": "5kg", "weightUnit": "kg", "inventory": 100, "isDefault": true }
    ],
    "price": 12.99,
    "compareAtPrice": 14.99,
    "currency": "GBP",
    "rating": 4.8,
    "reviewCount": 220,
    "tags": ["rice", "basmati"],
    "isOrganic": false,
    "isFeatured": true,
    "isBestseller": false,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "id": "prod_sona_masoori_5",
    "sku": "SKU-SONA_MASOORI_5-BASE",
    "name": "Sona Masoori Rice 5kg",
    "slug": "sona-masoori-rice-5kg",
    "brandId": "brand_generic",
    "categoryId": "cat_rice",
    "description": "Everyday medium grain rice.",
    "images": [
      { "url": "/images/products/sona-masoori-rice-5kg.jpg", "alt": "Sona Masoori Rice 5kg", "isDefault": true }
    ],
    "variants": [
      { "id": "var_sona_masoori_5_0", "name": "Sona Masoori Rice 5kg 5kg", "sku": "SKU-SONA_MASOORI_5-5KG", "price": 9.99, "compareAtPrice": 11.99, "weight": "5kg", "weightUnit": "kg", "inventory": 150, "isDefault": true }
    ],
    "price": 9.99,
    "compareAtPrice": 11.99,
    "currency": "GBP",
    "rating": 4.9,
    "reviewCount": 310,
    "tags": ["rice", "sona masoori"],
    "isOrganic": false,
    "isFeatured": false,
    "isBestseller": true,
    "isNewArrival": false,
    "isSeasonal": false,
    "status": "ACTIVE",
    "createdAt": "2023-01-01T00:00:00Z"
  }
];
