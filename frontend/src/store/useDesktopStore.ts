import { create } from 'zustand';

interface DesktopStore {
  selectedIconId: string | null;
  isStartMenuOpen: boolean;

  selectIcon: (id: string | null) => void;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
}

export const useDesktopStore = create<DesktopStore>((set) => ({
  selectedIconId: null,
  isStartMenuOpen: false,

  selectIcon: (id) => set({ selectedIconId: id, isStartMenuOpen: false }),
  toggleStartMenu: () => set((state) => ({ isStartMenuOpen: !state.isStartMenuOpen })),
  closeStartMenu: () => set({ isStartMenuOpen: false }),
}));
