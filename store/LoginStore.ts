import { create } from "zustand";

export interface LoginStore {
  showLoginPanel: boolean;
  setShowLoginPanel: (b: boolean) => void;
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo | null) => void;
}

export interface UserInfo {
  username: string;
  email: string;
  picture: string | null;
  credits: number;
}

export const loginStore = create<LoginStore>((set) => ({
  showLoginPanel: false,
  setShowLoginPanel: (b: boolean) => set({ showLoginPanel: b }),
  userInfo: null,
  setUserInfo: (info: UserInfo | null) => set({ userInfo: info }),
}));
