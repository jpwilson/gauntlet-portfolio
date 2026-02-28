import { create } from 'zustand';

type ViewMode = 'desktop' | 'cmd';

interface ViewModeStore {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
}

export const useViewModeStore = create<ViewModeStore>((set) => ({
  viewMode: 'desktop',
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleViewMode: () =>
    set((state) => ({
      viewMode: state.viewMode === 'desktop' ? 'cmd' : 'desktop',
    })),
}));
