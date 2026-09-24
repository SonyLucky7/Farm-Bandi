export interface Coupon {
  id: string;
  code: string;
  type: 'PERCENTAGE' | 'FIXED' | 'FREE_SHIPPING';
  value: number; // percentage or fixed amount
  description?: string;
  minOrderValue?: number;
  maxDiscount?: number;
  applicableCategoryIds?: string[];
  isActive: boolean;
  expiryDate?: string;
}

export const coupons: Coupon[] = [
  {
    id: 'coup_welcome',
    code: 'WELCOME10',
    type: 'PERCENTAGE',
    value: 10,
    maxDiscount: 5,
    description: '10% OFF your first grocery order (Max £5.00 discount)',
    isActive: true,
  },
  {
    id: 'coup_fresh',
    code: 'FRESH20',
    type: 'PERCENTAGE',
    value: 20,
    minOrderValue: 30,
    description: '20% OFF fruits and vegetables on orders over £30',
    applicableCategoryIds: ['cat_fruits_veg'],
    isActive: true,
  },
  {
    id: 'coup_festival',
    code: 'FESTIVAL15',
    type: 'PERCENTAGE',
    value: 15,
    description: '15% OFF all festive sweets & gift boxes',
    isActive: true,
  },
  {
    id: 'coup_freedel',
    code: 'FREEDEL',
    type: 'FREE_SHIPPING',
    value: 0,
    minOrderValue: 35,
    description: 'Free standard delivery on orders above £35',
    isActive: true,
  }
];
