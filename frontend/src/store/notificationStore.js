import { create } from 'zustand';

const useNotificationStore = create((set, get) => ({
  notification: null,

  show: (message, type = 'login') => {
    // Clear any running auto-hide timer
    if (get()._timer) clearTimeout(get()._timer);
    const timer = setTimeout(
      () => set({ notification: null, _timer: null }),
      4000
    );
    set({ notification: { message, type }, _timer: timer });
  },

  hide: () => {
    if (get()._timer) clearTimeout(get()._timer);
    set({ notification: null, _timer: null });
  },

  _timer: null,
}));

export default useNotificationStore;
