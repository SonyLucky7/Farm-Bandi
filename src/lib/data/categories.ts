export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  position: number;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: 'cat_fruits_veg',
    name: 'Fruits & Vegetables',
    slug: 'fruits-vegetables',
    description: 'Fresh, seasonal fruits and vegetables',
    image: '/images/categories/category-fruits.jpg',
    parentId: null,
    position: 1,
    productCount: 15,
  },
  {
    id: 'cat_spices',
    name: 'Spices',
    slug: 'spices',
    description: 'Pure and blended Indian spices',
    image: '/images/categories/category-spices.jpg',
    parentId: null,
    position: 2,
    productCount: 20,
  },
  {
    id: 'cat_dryfruits',
    name: 'Dry Fruits, Nuts & Seeds',
    slug: 'dry-fruits-nuts-seeds',
    description: 'Premium quality dry fruits, nuts, and healthy seeds',
    image: '/images/categories/category-dryfruits.jpg',
    parentId: null,
    position: 3,
    productCount: 25,
  },
  {
    id: 'cat_rice',
    name: 'Rice & Rice Products',
    slug: 'rice-products',
    description: 'Basmati, Sona Masoori, and other rice varieties',
    image: '/images/categories/category-rice.jpg',
    parentId: null,
    position: 4,
    productCount: 10,
  },
  {
    id: 'cat_dals',
    name: 'Beans, Dals & Pulses',
    slug: 'beans-dals-pulses',
    description: 'Essential Indian lentils and beans',
    image: '/images/categories/category-dals.jpg',
    parentId: null,
    position: 5,
    productCount: 15,
  },
  {
    id: 'cat_sweets',
    name: 'Sweets & Snacks',
    slug: 'sweets-snacks',
    description: 'Traditional Indian sweets and savory snacks',
    image: '/images/categories/category-sweets.jpg',
    parentId: null,
    position: 6,
    productCount: 12,
  },
  {
    id: 'cat_dairy',
    name: 'Dairy',
    slug: 'dairy',
    description: 'Fresh paneer, ghee, and dairy products',
    image: '/images/categories/category-placeholder.jpg',
    parentId: null,
    position: 7,
    productCount: 8,
  },
  {
    id: 'cat_flours',
    name: 'Flours',
    slug: 'flours',
    description: 'Atta, besan, and specialty flours',
    image: '/images/categories/category-placeholder.jpg',
    parentId: null,
    position: 8,
    productCount: 10,
  },
  {
    id: 'cat_oils',
    name: 'Oils & Ghee',
    slug: 'oils-ghee',
    description: 'Cooking oils and pure ghee',
    image: '/images/categories/category-placeholder.jpg',
    parentId: null,
    position: 9,
    productCount: 8,
  },
  {
    id: 'cat_ready_eat',
    name: 'Ready to Eat',
    slug: 'ready-to-eat',
    description: 'Instant meals and ready-to-eat curries',
    image: '/images/categories/category-placeholder.jpg',
    parentId: null,
    position: 10,
    productCount: 10,
  },
  {
    id: 'cat_beverages',
    name: 'Beverages',
    slug: 'beverages',
    description: 'Tea, coffee, and health drinks',
    image: '/images/categories/category-placeholder.jpg',
    parentId: null,
    position: 11,
    productCount: 5,
  },
  {
    id: 'cat_pickles',
    name: 'Pickles & Pastes',
    slug: 'pickles-pastes',
    description: 'Traditional Indian pickles and cooking pastes',
    image: '/images/categories/category-placeholder.jpg',
    parentId: null,
    position: 12,
    productCount: 8,
  },
  {
    id: 'cat_bakery',
    name: 'Bakery',
    slug: 'bakery',
    description: 'Rusks, biscuits, and bakery items',
    image: '/images/categories/category-placeholder.jpg',
    parentId: null,
    position: 13,
    productCount: 5,
  },
  {
    id: 'cat_puja',
    name: 'Puja Needs',
    slug: 'puja-needs',
    description: 'Agarbatti, camphor, and puja essentials',
    image: '/images/categories/category-placeholder.jpg',
    parentId: null,
    position: 14,
    productCount: 10,
  },
  {
    id: 'cat_breakfast',
    name: 'Breakfast Cereals',
    slug: 'breakfast-cereals',
    description: 'Poha, upma, and breakfast mixes',
    image: '/images/categories/category-placeholder.jpg',
    parentId: null,
    position: 15,
    productCount: 8,
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

