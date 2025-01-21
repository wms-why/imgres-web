'use client';
import LoginPanel from "./components/LoginPanel";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { loginStore } from "@/store/LoginStore";
import { loadFromCache } from "./api/login";
import { useEffect } from "react";




export default function Context({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { showLoginPanel, setUserInfo } = loginStore();

  useEffect(() => {
    loadFromCache(setUserInfo);
  }, [])

  return (
    <>
      {showLoginPanel && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <LoginPanel />
      </div>}

      <Header />

      <div className="py-24">
        {children}
      </div>
      <Footer />

    </>
  )
}