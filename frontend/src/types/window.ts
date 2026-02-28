export interface WindowState {
  id: string;
  type: string;
  title: string;
  icon?: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  prevPosition?: { x: number; y: number };
  prevSize?: { width: number; height: number };
  data?: Record<string, unknown>;
}

export interface OpenWindowConfig {
  type: string;
  title: string;
  icon?: string;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  data?: Record<string, unknown>;
}
