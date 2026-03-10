import { create } from 'zustand';
import { ProjectStop } from './roadConfig';

interface GameStore {
  speed: number;
  score: number;
  activeZone: ProjectStop | null;
  showPasswordPrompt: boolean;
  passwordInput: string;
  unlockedProjects: string[];
  boosted: boolean;
  gameStarted: boolean;
  showControls: boolean;
  hitFlash: boolean;

  setSpeed: (speed: number) => void;
  addScore: (points: number) => void;
  setActiveZone: (zone: ProjectStop | null) => void;
  setShowPasswordPrompt: (show: boolean) => void;
  setPasswordInput: (input: string) => void;
  unlockProject: (id: string) => void;
  setBoosted: (boosted: boolean) => void;
  setGameStarted: (started: boolean) => void;
  setShowControls: (show: boolean) => void;
  setHitFlash: (hit: boolean) => void;
  reset: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  speed: 0,
  score: 0,
  activeZone: null,
  showPasswordPrompt: false,
  passwordInput: '',
  unlockedProjects: [],
  boosted: false,
  gameStarted: false,
  showControls: true,
  hitFlash: false,

  setSpeed: (speed) => set({ speed }),
  addScore: (points) => set((s) => ({ score: s.score + points })),
  setActiveZone: (zone) => set({ activeZone: zone }),
  setShowPasswordPrompt: (show) => set({ showPasswordPrompt: show }),
  setPasswordInput: (input) => set({ passwordInput: input }),
  unlockProject: (id) => set((s) => ({
    unlockedProjects: [...s.unlockedProjects, id],
  })),
  setBoosted: (boosted) => set({ boosted }),
  setGameStarted: (started) => set({ gameStarted: started }),
  setShowControls: (show) => set({ showControls: show }),
  setHitFlash: (hit) => set({ hitFlash: hit }),
  reset: () => set({
    speed: 0,
    score: 0,
    activeZone: null,
    showPasswordPrompt: false,
    passwordInput: '',
    boosted: false,
    gameStarted: false,
    showControls: true,
    hitFlash: false,
  }),
}));
