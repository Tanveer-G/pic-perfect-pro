import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { GlobalContextProvider } from "../context/store";
import BrandHeader from "@/components/Layouts/BrandHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Layouts/Footer";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Pic Perfect | Tanveer H.",
  description: "Experience the Realtime Image Optimization",
  openGraph: {
    title: "Pic Perfect: Realtime Image Optimization App - Tanveer H.",
    description: "Resize, crop, filters, rotate and blur functionality.",
    url: "https://tanveer-pic-perfect-pro.vercel.app",
    siteName: "Tanveer pic perfect",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: [
    "resize image",
    "Tanveer",
    "Frontend Developer",
    "Remote Engineer",
    "pic resizer",
    "crop image",
    "optimize image",
    "photo edit",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          <BrandHeader />
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
