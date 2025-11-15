import Link from "next/link";
import { Package } from "lucide-react";
import { stackServerApp } from "@/stack/server";
import SignOutButton from "@/components/SignOutButton";
import { isAdmin } from "@/lib/actions/user";
import CartCountBadge from "@/components/CartCountBadge";
import NavbarMobile from "./NavbarMobile";
import { Button } from "./ui/button";
import NavLink from "@/components/NavLink";

export default async function Navbar() {
  const user = await stackServerApp.getUser();
  const isUserAdmin = await isAdmin();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <Package className="h-6 w-6" />
          <span>TechStore</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {isUserAdmin && <NavLink href="/admin">Admin</NavLink>}

          <NavLink href="/">Products</NavLink>

          <NavLink href="/orders">Orders</NavLink>

          <CartCountBadge />

          {user ? (
            <SignOutButton />
          ) : (
            <NavLink href="/sign-in">Sign In</NavLink>
          )}
        </nav>

        <NavbarMobile />
      </div>
    </header>
  );
}
