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
  title: "TechStore",
  description: "demo ecommerce site",
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
