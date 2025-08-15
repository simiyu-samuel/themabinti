import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  currentModal: string | null;
  isLoading: boolean;
  setSidebarOpen: (open: boolean) => void;
  openModal: (modal: string) => void;
  closeModal: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  currentModal: null,
  isLoading: false,
  
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  openModal: (modal: string) => set({ currentModal: modal }),
  closeModal: () => set({ currentModal: null }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));