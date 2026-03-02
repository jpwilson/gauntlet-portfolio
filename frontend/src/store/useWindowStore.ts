import { create } from 'zustand';
import { WindowState, OpenWindowConfig } from '../types/window';

interface WindowStore {
  windows: WindowState[];
  nextZIndex: number;
  nextCascadeOffset: number;

  openWindow: (config: OpenWindowConfig) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
}

const DEFAULT_SIZE = { width: 500, height: 400 };
const CASCADE_STEP = 30;
const MAX_CASCADE = 210;
const ZOOM = 1.3;

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  nextZIndex: 10,
  nextCascadeOffset: 0,

  openWindow: (config) => {
    const { windows, nextZIndex, nextCascadeOffset } = get();

    // Check if a window of this type with same data already exists
    const existing = windows.find(
      (w) => w.type === config.type && JSON.stringify(w.data) === JSON.stringify(config.data)
    );
    if (existing) {
      // Focus and restore it instead of opening a new one
      get().focusWindow(existing.id);
      if (existing.isMinimized) {
        get().restoreWindow(existing.id);
      }
      return;
    }

    const id = `${config.type}-${Date.now()}`;
    const position = config.position || {
      x: 50 + nextCascadeOffset,
      y: 50 + nextCascadeOffset,
    };

    const newWindow: WindowState = {
      id,
      type: config.type,
      title: config.title,
      icon: config.icon,
      position,
      size: config.size || { ...DEFAULT_SIZE },
      zIndex: nextZIndex,
      isMinimized: false,
      isMaximized: false,
      data: config.data,
    };

    set({
      windows: [...windows, newWindow],
      nextZIndex: nextZIndex + 1,
      nextCascadeOffset: (nextCascadeOffset + CASCADE_STEP) % MAX_CASCADE,
    });
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    }));
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id
          ? {
              ...w,
              isMaximized: true,
              prevPosition: w.position,
              prevSize: w.size,
              position: { x: 0, y: 0 },
              size: { width: window.innerWidth / ZOOM, height: window.innerHeight / ZOOM - 36 },
              zIndex: state.nextZIndex,
            }
          : w
      ),
      nextZIndex: state.nextZIndex + 1,
    }));
  },

  restoreWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id
          ? {
              ...w,
              isMinimized: false,
              isMaximized: false,
              position: w.prevPosition || w.position,
              size: w.prevSize || w.size,
              zIndex: state.nextZIndex,
            }
          : w
      ),
      nextZIndex: state.nextZIndex + 1,
    }));
  },

  focusWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.nextZIndex } : w
      ),
      nextZIndex: state.nextZIndex + 1,
    }));
  },

  toggleMinimize: (id) => {
    const win = get().windows.find((w) => w.id === id);
    if (!win) return;

    if (win.isMinimized) {
      get().restoreWindow(id);
      get().focusWindow(id);
    } else {
      // If it's already focused (top z-index), minimize it
      const maxZ = Math.max(...get().windows.map((w) => w.zIndex));
      if (win.zIndex === maxZ) {
        get().minimizeWindow(id);
      } else {
        get().focusWindow(id);
      }
    }
  },

  updatePosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },

  updateSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    }));
  },
}));
