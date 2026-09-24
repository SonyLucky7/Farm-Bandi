export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  website?: string;
  isFeatured: boolean;
}

export const brands: Brand[] = [
  {
    id: 'brand_farmbandi',
    name: 'Farm Bandi',
    slug: 'farm-bandi',
    description: 'Premium quality organic groceries and dry fruits directly from farms.',
    logo: '/images/logo.png',
    isFeatured: true,
  },
  {
    id: 'brand_aashirvaad',
    name: 'Aashirvaad',
    slug: 'aashirvaad',
    description: 'Trusted brand for premium wheat flour and everyday essentials.',
    logo: '/images/brands/aashirvaad.png',
    isFeatured: true,
  },
  {
    id: 'brand_tata',
    name: 'Tata',
    slug: 'tata',
    description: 'A legacy brand known for salt, tea, and premium pulses.',
    logo: '/images/brands/tata.png',
    isFeatured: true,
  },
  {
    id: 'brand_mtr',
    name: 'MTR',
    slug: 'mtr',
    description: 'Authentic Indian ready-to-eat meals and spices.',
    logo: '/images/brands/mtr.png',
    isFeatured: false,
  },
  {
    id: 'brand_haldirams',
    name: "Haldiram's",
    slug: 'haldirams',
    description: 'The taste of Indian snacks and sweets.',
    logo: '/images/brands/haldirams.png',
    isFeatured: true,
  },
  {
    id: 'brand_mdh',
    name: 'MDH',
    slug: 'mdh',
    description: 'Legendary Indian spice blends.',
    logo: '/images/brands/mdh.png',
    isFeatured: false,
  },
  {
    id: 'brand_everest',
    name: 'Everest',
    slug: 'everest',
    description: 'Pure and blended spices from India.',
    logo: '/images/brands/everest.png',
    isFeatured: false,
  },
  {
    id: 'brand_24mantra',
    name: '24 Mantra',
    slug: '24-mantra',
    description: '100% organic groceries for a healthy lifestyle.',
    logo: '/images/brands/24-mantra.png',
    isFeatured: true,
  },
  {
    id: 'brand_dabur',
    name: 'Dabur',
    slug: 'dabur',
    description: 'Natural and ayurvedic products.',
    logo: '/images/brands/dabur.png',
    isFeatured: false,
  },
  {
    id: 'brand_patanjali',
    name: 'Patanjali',
    slug: 'patanjali',
    description: 'Purity of nature and Ayurveda.',
    logo: '/images/brands/patanjali.png',
    isFeatured: false,
  },
  {
    id: 'brand_generic',
    name: 'Farm Fresh Produce',
    slug: 'generic',
    description: 'Fresh and unbranded daily essentials from local partner farms.',
    logo: '/images/brands/generic.png',
    isFeatured: false,
  }
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

