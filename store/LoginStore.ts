import { create } from "zustand";

export interface Store {
  isLogin: boolean;
  showLoginPanel: boolean;
  setShowLoginPanel: (b: boolean) => void;
  username: string;
  setUsername: (s: string) => void;
  token: string;
  setToken: (s: string) => void;
}

export const loginStore = create<Store>((set) => ({
  isLogin: false,
  showLoginPanel: false,
  setShowLoginPanel: (b: boolean) => set({ showLoginPanel: b }),
  username: "",
  setUsername: (s: string) => {
    if (s) {
      set({ username: s, isLogin: true });
    } else {
      set({ username: "", isLogin: false });
    }
  },
  token: "",
  setToken: (s: string) => set({ token: s }),
}));
