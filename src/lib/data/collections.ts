export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  story: string;
  productIds: string[];
  isActive: boolean;
}

export const collections: Collection[] = [
  {
    id: 'col_diwali',
    name: 'Diwali Collection',
    slug: 'diwali-collection',
    description: 'Illuminate your celebrations with our special Diwali range.',
    heroImage: '/images/collections/diwali-hero.jpg',
    story: 'Diwali, the festival of lights, is incomplete without the joy of sharing sweets and dry fruits. Explore our handpicked selection of premium gifts, traditional sweets, and pure ingredients to make your festive feasts memorable.',
    productIds: ['prod_cashews', 'prod_almonds', 'prod_pistachios', 'prod_soan_papdi', 'prod_rasgulla', 'prod_patanjali_ghee_1l'],
    isActive: true,
  },
  {
    id: 'col_pongal',
    name: 'Pongal / Sankranti Collection',
    slug: 'pongal-sankranti-collection',
    description: 'Celebrate the harvest festival with authentic ingredients.',
    heroImage: '/images/collections/pongal-hero.jpg',
    story: 'Harvest festivals are all about gratitude and abundance. Prepare the perfect sweet Pongal and savory dishes with our premium new harvest rice, organic jaggery, and farm-fresh ingredients.',
    productIds: ['prod_sona_masoori_5', 'prod_organic_jaggery', 'prod_cashews', 'prod_moong_dal_500'],
    isActive: true,
  },
  {
    id: 'col_holi',
    name: 'Holi Collection',
    slug: 'holi-collection',
    description: 'Colors, joy, and delicious treats for Holi.',
    heroImage: '/images/collections/holi-hero.jpg',
    story: 'Welcome spring with the vibrant festival of Holi. Indulge in classic festive snacks, refreshing drinks, and sweets to share with your loved ones.',
    productIds: ['prod_haldirams_mix', 'prod_soan_papdi', 'prod_cashews', 'prod_raisins'],
    isActive: false,
  },
  {
    id: 'col_wedding',
    name: 'Wedding Season Collection',
    slug: 'wedding-season-collection',
    description: 'Premium ingredients for grand celebrations.',
    heroImage: '/images/collections/wedding-hero.jpg',
    story: 'For the most important days of your life, choose only the best. Our Wedding Season Collection features bulk packs of premium ingredients, luxurious dry fruits, and pure spices for grand feasts.',
    productIds: ['prod_basmati_5', 'prod_patanjali_ghee_1l', 'prod_cashews', 'prod_biryani_masala'],
    isActive: true,
  }
];
