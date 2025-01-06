'use client';
import LoginPanel from "./components/LoginPanel";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { create } from "zustand";

export interface Store {
  isLogin: boolean;
  setIsLogin: (b: boolean) => void;
  showLoginPanel: boolean;
  setShowLoginPanel: (b: boolean) => void;
  username: string;
  setUsername: (s: string) => void;
}


export default function Context({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const useStore = create<Store>((set) => ({
    isLogin: false,
    setIsLogin: (b: boolean) => set({ isLogin: b }),
    showLoginPanel: false,
    setShowLoginPanel: (b: boolean) => set({ showLoginPanel: b }),
    username: "",
    setUsername: (s: string) => set({ username: s }),
  }));

  const showLoginPanel = useStore((state) => state.showLoginPanel)

  return (
    <>
      {showLoginPanel && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <LoginPanel useStore={useStore} />
      </div>}

      <Header useStore={useStore} />
      {children}
      <Footer />

    </>
  )
}