import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Context from "./Context";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Resize",
  description: "Professional image resizing tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body className={`${inter.className} w-full min-h-screen`}>

        <Context children={children} />

      </body>
    </html>

  );
}
