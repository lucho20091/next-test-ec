"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CartCountBadge from "@/components/CartCountBadge";
import SignOutButton from "@/components/SignOutButton";
import { stackClientApp } from "@/stack/client";
import { isAdmin } from "@/lib/actions/user";
import { Button } from "./ui/button";
import NavLink from "./NavLink"; // Import NavLink for consistent styling and active state

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
          setIsUserAdmin(!!admin);
        }
      } catch (error) {
        console.error("Error fetching user or admin status:", error);
      }
    }

    fetchUserAndRole();
  }, []);

  return (
    <div className="md:hidden flex items-center">
      {/* Burger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu" // Added aria-controls
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
      <div
        id="mobile-menu" // Added id
        className={`
          fixed top-16 left-0 w-full z-50
          bg-white/80 backdrop-blur-lg shadow-lg border-t
          transition-all duration-300 
          ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }
        `}
      >
        {/* Links */}
        <nav className="flex flex-col px-6 gap-2 py-4" aria-label="Mobile navigation">
          <NavLink href="/" onClick={() => setIsOpen(false)}>
            Products
          </NavLink>

          <NavLink href="/about-us" onClick={() => setIsOpen(false)}>
            About Us
          </NavLink>

          <NavLink href="/orders" onClick={() => setIsOpen(false)}>
            Orders
          </NavLink>

          {isUserAdmin && (
            <NavLink href="/admin" onClick={() => setIsOpen(false)}>
              Admin
            </NavLink>
          )}
        </nav>

        {/* Auth + cart */}
        <div className="px-6 py-3 border-t flex items-center justify-between">
          <button onClick={() => setIsOpen(false)} aria-label="View shopping cart">
            <CartCountBadge />
          </button>

          {user ? (
            <SignOutButton />
          ) : (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="px-3 py-2 border-none hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}