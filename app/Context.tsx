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
  const { showLoginPanel } = loginStore();

  useEffect(() => {
    loadFromCache();
  }, [])

  return (
    <>
      {showLoginPanel && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <LoginPanel />
      </div>}

      <Header />

      <div>
        {children}

      </div>
      <Footer />

    </>
  )
}