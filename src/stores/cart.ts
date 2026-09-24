import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItemState {
  id: string; // product id or product-variant id
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  image: string;
  weight?: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
}

export interface AppliedCoupon {
  code: string;
  discountAmount: number;
  type: "PERCENTAGE" | "FIXED" | "FREE_SHIPPING";
  description?: string;
}

interface CartStore {
  items: CartItemState[];
  appliedCoupon: AppliedCoupon | null;
  deliveryType: "standard" | "express" | "same-day";
  isDrawerOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItemState, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
  setDeliveryType: (type: "standard" | "express" | "same-day") => void;
  toggleDrawer: () => void;
  setDrawerOpen: (isOpen: boolean) => void;

  // Computed
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getDeliveryFee: () => number;
  getTax: () => number;
  getTotal: () => number;
}

const DELIVERY_FEES = {
  standard: 3.99,
  express: 6.99,
  "same-day": 9.99,
};

const FREE_DELIVERY_THRESHOLD = 50.0;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: "fb-cashews-500g",
          productId: "p1",
          name: "Farm Bandi Premium Whole Cashews",
          slug: "farm-bandi-cashews",
          image: "/images/categories/category-dryfruits.jpg",
          weight: "500g",
          price: 14.99,
          compareAtPrice: 17.99,
          quantity: 1,
        },
        {
          id: "basmati-rice-5kg",
          productId: "p6",
          name: "Royal Heritage Basmati Rice",
          slug: "basmati-rice",
          image: "/images/categories/category-rice.jpg",
          weight: "5kg",
          price: 12.99,
          compareAtPrice: 14.99,
          quantity: 1,
        },
        {
          id: "toor-dal-1kg",
          productId: "p7",
          name: "Organic Toor Dal (Pigeon Peas)",
          slug: "toor-dal",
          image: "/images/categories/category-dals.jpg",
          weight: "1kg",
          price: 3.49,
          quantity: 2,
        },
      ],
      appliedCoupon: null,
      deliveryType: "standard",
      isDrawerOpen: false,

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex((i) => i.id === item.id);
          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            return { items: updated };
          }
          return { items: [...state.items, { ...item, quantity }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [], appliedCoupon: null }),

      applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
      removeCoupon: () => set({ appliedCoupon: null }),
      setDeliveryType: (type) => set({ deliveryType: type }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      getDiscount: () => {
        const coupon = get().appliedCoupon;
        if (!coupon) return 0;
        return coupon.discountAmount;
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        const type = get().deliveryType;
        const coupon = get().appliedCoupon;

        if (coupon?.type === "FREE_SHIPPING") return 0;
        if (subtotal >= FREE_DELIVERY_THRESHOLD && type === "standard") return 0;
        return DELIVERY_FEES[type];
      },

      getTax: () => {
        // Essential groceries in UK are zero-rated VAT
        return 0;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const delivery = get().getDeliveryFee();
        return Math.max(0, subtotal - discount + delivery);
      },
    }),
    {
      name: "raithanna_cart_storage",
    }
  )
);
