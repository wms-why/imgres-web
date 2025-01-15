import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Context from "./Context";
/**
 * Title: 智能图片尺寸调整 - 使用AI与算法快速生成多种分辨率

    Description: 使用先进的AI技术与高效算法，一键将图片调整为多种分辨率。支持批量处理，保持图片质量，适用于网页优化、社交媒体发布等多种场景。体验智能图片处理，提升工作效率。

    Keywords: 图片尺寸调整, AI图片处理, 图片分辨率优化, 批量图片处理, 智能图片缩放, 图片质量优化, 网页图片优化, 社交媒体图片处理
 */

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Resizing|Generate Multiple Resolutions with AI or Algorithms with free",
  description: "Resize a image to multiple resolutions  using AI technology or Algorithms. Supports batch processing, maintaining quality for web and social media.",
  keywords: "image resizing, AI image processing, image resolution optimization, batch image processing, smart image scaling, image quality optimization, web image optimization, social media image processing"
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
