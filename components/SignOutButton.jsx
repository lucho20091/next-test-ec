"use client";
import { stackClientApp } from "@/stack/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await stackClientApp.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <Button
      onClick={handleSignOut}
      size="sm"
      variant="outline"
      className="px-3 py-2 text-xs font-bold border-none hover:text-red-500 cursor-pointer"
    >
      Sign Out
    </Button>
  );
}
