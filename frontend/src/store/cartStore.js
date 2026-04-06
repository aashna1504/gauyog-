import { create } from 'zustand';
import api from '../api/axios';
import useAuthStore from './authStore';

const useCartStore = create((set, get) => ({
  cartItems: [],
  cartCount: 0,

  // Set the whole cart from backend
  setCart: (items) => set({
    cartItems: items,
    cartCount: items.reduce((acc, item) => acc + item.quantity, 0)
  }),

  fetchCart: async () => {
    try {
      const { isAuthenticated } = useAuthStore.getState();
      if (!isAuthenticated) return;
      const res = await api.get('/cart');
      const items = res.data.data?.items || [];
      
      const formattedItems = items.map(item => ({
        id: item.id,
        productId: item.productId,
        name: item.product?.name || "Product",
        price: "₹" + (item.product?.price || 0).toLocaleString('en-IN'),
        rawPrice: item.product?.price || 0,
        img: "https://pngimg.com/d/rice_PNG17.png",
        qty: item.quantity,
      }));

      set({
         cartItems: formattedItems,
         cartCount: formattedItems.reduce((acc, i) => acc + i.qty, 0)
      });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  },

  // Clean local cart
  // Clean local cart
  clearCart: () => set({ cartItems: [], cartCount: 0 }),
}));

export default useCartStore;