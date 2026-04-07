'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileSidebarOpen: false,
      theme: 'system',
      toggleSidebar: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
      toggleMobileSidebar: () =>
        set((s) => ({ mobileSidebarOpen: !s.mobileSidebarOpen })),
      closeMobileSidebar: () => set({ mobileSidebarOpen: false }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'gauyog-admin-ui',
      partialize: (s) => ({ sidebarCollapsed: s.sidebarCollapsed, theme: s.theme }),
    },
  ),
);
