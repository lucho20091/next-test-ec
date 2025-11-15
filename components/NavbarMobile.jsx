"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CartCountBadge from "@/components/CartCountBadge";
import SignOutButton from "@/components/SignOutButton";
import { stackClientApp } from "@/stack/client";
import { isAdmin } from "@/lib/actions/user";
import { Button } from "./ui/button";
export default function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    async function fetchUserAndRole() {
      try {
        const currentUser = await stackClientApp.getUser();
        setUser(currentUser);

        if (currentUser) {
          const admin = await isAdmin();
          if (admin) setIsUserAdmin(true);
        }
      } catch (error) {}
    }

    fetchUserAndRole();
  }, []);

  return (
    <div className="md:hidden flex items-center">
      {/* Burger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 focus:outline-none cursor-pointer p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="
          absolute top-16 left-0 w-full 
          bg-white border-t shadow-lg 
          flex flex-col gap-2 py-4 
          z-50 animate-slideDown
        "
        >
          {/* Menu links */}
          <div className="flex flex-col px-6 gap-1 py-2">
            <Link
              href="/"
              className="flex items-center py-2 text-gray-700 font-medium hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>

            <Link
              href="/orders"
              className="flex items-center py-2 text-gray-700 font-medium hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Orders
            </Link>

            {isUserAdmin && (
              <Link
                href="/admin"
                className="flex items-center py-2 text-gray-700 font-medium hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Auth section */}
          <div className="px-6 py-3 border-t flex items-center justify-between">
            <button onClick={() => setIsOpen(false)}>
              <CartCountBadge />
            </button>
            {user ? (
              <SignOutButton />
            ) : (
              <Button
                asChild
                size="sm"
                variant="outline"
                className="px-3 py-2  border-none hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
