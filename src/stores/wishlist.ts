import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItemState {
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  weight?: string;
  category?: string;
  addedAt: string;
}

interface WishlistStore {
  items: WishlistItemState[];
  addItem: (item: Omit<WishlistItemState, "addedAt">) => void;
  removeItem: (productId: string) => void;
  toggleItem: (item: Omit<WishlistItemState, "addedAt">) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        if (!get().isInWishlist(item.productId)) {
          set((state) => ({
            items: [...state.items, { ...item, addedAt: new Date().toISOString() }],
          }));
        }
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      toggleItem: (item) => {
        if (get().isInWishlist(item.productId)) {
          get().removeItem(item.productId);
        } else {
          get().addItem(item);
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },

      clearWishlist: () => set({ items: [] }),

      getCount: () => get().items.length,
    }),
    {
      name: "raithanna_wishlist_storage",
    }
  )
);
