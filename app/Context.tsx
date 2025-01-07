'use client';
import LoginPanel from "./components/LoginPanel";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { loginStore } from "@/store/LoginStore";




export default function Context({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const showLoginPanel = loginStore((state) => state.showLoginPanel)

  return (
    <>
      {showLoginPanel && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <LoginPanel />
      </div>}

      <Header />
      {children}
      <Footer />

    </>
  )
}