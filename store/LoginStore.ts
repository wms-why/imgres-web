import { create } from "zustand";

export interface LoginStore {
  isLogin: boolean;
  showLoginPanel: boolean;
  setShowLoginPanel: (b: boolean) => void;
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo | null) => void;
}

export interface UserInfo {
  username: string;
  email: string;
}

export const loginStore = create<LoginStore>((set) => ({
  isLogin: false,
  showLoginPanel: false,
  setShowLoginPanel: (b: boolean) => set({ showLoginPanel: b }),
  userInfo: null,
  setUserInfo: (info: UserInfo | null) => set({ userInfo: info }),
}));
