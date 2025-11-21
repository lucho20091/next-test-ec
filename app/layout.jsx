import { Geist, Geist_Mono } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: {
    default: "TechStore - Your Go-To for Premium Electronics",
    template: "%s | TechStore",
  },
  description: "Discover the latest in electronics, gadgets, and accessories at TechStore. High-quality products, fast shipping, and excellent customer service.",
  keywords: ["electronics", "tech", "gadgets", "ecommerce", "online store", "headphones", "laptops", "smartwatch", "smartphones"],
  openGraph: {
    title: "TechStore - Your Go-To for Premium Electronics",
    description: "Discover the latest in electronics, gadgets, and accessories at TechStore. High-quality products, fast shipping, and excellent customer service.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    siteName: "TechStore",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/next.svg`, // Replace with a more relevant image if available
        width: 800,
        height: 600,
        alt: "TechStore Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechStore - Your Go-To for Premium Electronics",
    description: "Discover the latest in electronics, gadgets, and accessories at TechStore. High-quality products, fast shipping, and excellent customer service.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/next.svg`], // Replace with a more relevant image if available
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-svh flex flex-col `}
      >
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <CartProvider>
              <Navbar />
              <main className="flex-1 min-h-0">{children}</main>
              <Footer />
              <Toaster position="top-right" />
            </CartProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}