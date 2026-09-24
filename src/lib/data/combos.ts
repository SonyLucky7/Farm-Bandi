export interface Combo {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  price: number;
  compareAtPrice: number;
  productIds: string[];
  isFeatured: boolean;
}

export const combos: Combo[] = [
  {
    id: 'combo_diwali',
    name: 'Diwali Special Combo',
    slug: 'diwali-special-combo',
    description: 'A perfect festive bundle containing premium dry fruits, assorted sweets, and pure ghee.',
    image: '/images/categories/category-sweets.jpg',
    price: 29.99,
    compareAtPrice: 39.99,
    productIds: ['prod_cashews', 'prod_soan_papdi', 'prod_patanjali_ghee_500'],
    isFeatured: true,
  },
  {
    id: 'combo_daily',
    name: 'Daily Essentials Pack',
    slug: 'daily-essentials-pack',
    description: 'Your everyday grocery needs sorted with premium atta, rice, dal, and cooking oil.',
    image: '/images/categories/category-dals.jpg',
    price: 19.99,
    compareAtPrice: 27.99,
    productIds: ['prod_aashirvaad_atta_5', 'prod_sona_masoori_5', 'prod_toor_dal_1', 'prod_mustard_oil'],
    isFeatured: true,
  },
  {
    id: 'combo_spice',
    name: 'Spice Box Collection',
    slug: 'spice-box-collection',
    description: 'Essential Indian spices to elevate your cooking.',
    image: '/images/categories/category-spices.jpg',
    price: 8.99,
    compareAtPrice: 12.99,
    productIds: ['prod_turmeric', 'prod_chilli_powder', 'prod_garam_masala'],
    isFeatured: false,
  },
  {
    id: 'combo_breakfast',
    name: 'Breakfast Bundle',
    slug: 'breakfast-bundle',
    description: 'Start your day right with traditional breakfast staples.',
    image: '/images/categories/category-rice.jpg',
    price: 11.99,
    compareAtPrice: 16.99,
    productIds: ['prod_poha', 'prod_tata_tea', 'prod_dabur_honey_250'],
    isFeatured: false,
  }
];
