import { create } from 'zustand';
import api from '../api/axios';
import useAuthStore from './authStore';
import useNotificationStore from './notificationStore';

const PLACEHOLDER_IMG = 'https://pngimg.com/d/milk_PNG12756.png';

const useCartStore = create((set, get) => ({
  cartItems: [],
  cartCount: 0,
  isInCart: (productId) => get().cartItems.some((item) => item.productId === productId),
  getCartItemByProductId: (productId) =>
    get().cartItems.find((item) => item.productId === productId),

  setCart: (items) =>
    set({
      cartItems: items,
      cartCount: items.reduce((acc, item) => acc + item.qty, 0),
    }),

  fetchCart: async () => {
    try {
      const { isAuthenticated } = useAuthStore.getState();
      if (!isAuthenticated) return;
      const res = await api.get('/cart');
      const items = res.data.data?.items || [];

      const formatted = items.map((item) => ({
        id: item.id,
        productId: item.productId,
        name: item.product?.name || 'Product',
        price: '₹' + (item.product?.price || 0).toLocaleString('en-IN'),
        rawPrice: item.product?.price || 0,
        img: item.product?.imageUrl || PLACEHOLDER_IMG,
        qty: item.quantity,
        inStock: item.product?.inStock !== false,
      }));

      set({
        cartItems: formatted,
        cartCount: formatted.reduce((acc, i) => acc + i.qty, 0),
      });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  },

  addItem: async (product) => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      return { success: false, message: 'Please sign in to add items to cart' };
    }
    try {
      await api.post('/cart', { productId: product.id, quantity: 1 });
      await get().fetchCart();
      const notify = useNotificationStore.getState().show;
      notify(`${product.name} added to cart`, 'cart_add');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to add to cart';
      return { success: false, message: msg };
    }
  },

  updateItem: async (itemId, quantity) => {
    try {
      await api.patch(`/cart/item/${itemId}`, { quantity });
      await get().fetchCart();
    } catch (error) {
      console.error('Failed to update cart item:', error);
    }
  },

  removeItem: async (itemId) => {
    try {
      const item = get().cartItems.find((i) => i.id === itemId);
      await api.delete(`/cart/item/${itemId}`);
      await get().fetchCart();
      const notify = useNotificationStore.getState().show;
      notify(`${item?.name || 'Item'} removed from cart`, 'cart_remove');
      return { success: true };
    } catch (error) {
      console.error('Failed to remove cart item:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to remove item' };
    }
  },

  removeByProductId: async (productId) => {
    const cartItem = get().getCartItemByProductId(productId);
    if (!cartItem) {
      return { success: false, message: 'Item is not in cart' };
    }
    return get().removeItem(cartItem.id);
  },

  clearCart: () => set({ cartItems: [], cartCount: 0 }),
}));

export default useCartStore;
