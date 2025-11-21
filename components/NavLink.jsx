"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const pathname = usePathname();

  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href)); // optional: makes /orders/123 active

  return (
    <Link
      href={href}
      className={`
        inline-flex items-center hover:underline 
        ${isActive ? "underline font-semibold" : ""}
      `}
    >
      {children}
    </Link>
  );
}
