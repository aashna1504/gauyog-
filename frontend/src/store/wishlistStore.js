import { create } from 'zustand';
import api from '../api/axios';
import useAuthStore from './authStore';
import useNotificationStore from './notificationStore';

const getProductImage = (product) => {
  const w = product?.weight;
  if (w === '1kg' && product?.image1kg) return product.image1kg;
  if (w === '3kg' && product?.image3kg) return product.image3kg;
  if (w === '5kg' && product?.image5kg) return product.image5kg;
  return product?.imageUrl || null;
};

const useWishlistStore = create((set, get) => ({
  wishlistItems: [],
  wishlistCount: 0,

  fetchWishlist: async () => {
    try {
      const { isAuthenticated } = useAuthStore.getState();
      if (!isAuthenticated) return;
      const res = await api.get('/wishlist');
      const items = res.data.data || [];

      const formatted = items.map((item) => ({
        id: item.id,
        productId: item.productId,
        name: item.product?.name || 'Product',
        price: item.product?.price || 0,
        img: getProductImage(item.product),
        category: item.product?.category || '',
        inStock: item.product?.inStock !== false,
        product: item.product,
      }));

      set({ wishlistItems: formatted, wishlistCount: formatted.length });
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  },

  addToWishlist: async (product) => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      useNotificationStore.getState().show('Please sign in to save to wishlist', 'wishlist_auth');
      return { success: false, message: 'Please sign in to save to wishlist' };
    }
    try {
      await api.post('/wishlist', { productId: product.id });
      await get().fetchWishlist();
      useNotificationStore.getState().show(`${product.name} added to wishlist`, 'wishlist_add');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to add to wishlist';
      useNotificationStore.getState().show(msg, 'logout');
      return { success: false, message: msg };
    }
  },

  removeFromWishlist: async (productId, productName = 'Product') => {
    try {
      await api.delete(`/wishlist/${productId}`);
      await get().fetchWishlist();
      useNotificationStore.getState().show(`${productName} removed from wishlist`, 'wishlist_remove');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to remove from wishlist';
      useNotificationStore.getState().show(msg, 'logout');
      return { success: false, message: msg };
    }
  },

  toggleWishlist: async (product) => {
    const inWishlist = get().isInWishlist(product.id);
    if (inWishlist) {
      return get().removeFromWishlist(product.id, product.name);
    }
    return get().addToWishlist(product);
  },

  isInWishlist: (productId) =>
    get().wishlistItems.some((item) => item.productId === productId),
}));

export default useWishlistStore;
