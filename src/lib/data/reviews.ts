export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  isVerifiedPurchase: boolean;
}

export const reviews: Review[] = [
  {
    id: 'rev_1',
    productId: 'prod_cashews',
    userName: 'Rahul S.',
    rating: 5,
    comment: 'Excellent quality cashews. Very large and crunchy.',
    createdAt: '2023-09-10T10:00:00Z',
    isVerifiedPurchase: true,
  },
  {
    id: 'rev_2',
    productId: 'prod_cashews',
    userName: 'Priya K.',
    rating: 4,
    comment: 'Good packaging and quality, but a bit pricey.',
    createdAt: '2023-09-12T14:30:00Z',
    isVerifiedPurchase: true,
  },
  {
    id: 'rev_3',
    productId: 'prod_aashirvaad_atta_5',
    userName: 'Amit V.',
    rating: 5,
    comment: 'Always reliable. Makes soft rotis.',
    createdAt: '2023-10-01T09:15:00Z',
    isVerifiedPurchase: true,
  },
  {
    id: 'rev_4',
    productId: 'prod_tata_tea',
    userName: 'Sneha M.',
    rating: 4,
    comment: 'Strong flavor, perfect for morning chai.',
    createdAt: '2023-10-05T08:00:00Z',
    isVerifiedPurchase: true,
  },
  {
    id: 'rev_5',
    productId: 'prod_haldirams_mix',
    userName: 'Vikram B.',
    rating: 5,
    comment: 'Classic taste, never disappoints.',
    createdAt: '2023-10-10T16:45:00Z',
    isVerifiedPurchase: true,
  },
  {
    id: 'rev_6',
    productId: 'prod_patanjali_ghee_500',
    userName: 'Anjali D.',
    rating: 5,
    comment: 'Pure aroma and taste. Very authentic.',
    createdAt: '2023-08-20T11:20:00Z',
    isVerifiedPurchase: true,
  },
  {
    id: 'rev_7',
    productId: 'prod_sona_masoori_5',
    userName: 'Karthik R.',
    rating: 4,
    comment: 'Good quality rice, cooks well.',
    createdAt: '2023-09-25T13:10:00Z',
    isVerifiedPurchase: true,
  },
  {
    id: 'rev_8',
    productId: 'prod_mango',
    userName: 'Neha S.',
    rating: 5,
    comment: 'Very sweet and fresh! Will order again.',
    createdAt: '2023-06-15T10:00:00Z',
    isVerifiedPurchase: true,
  }
];
