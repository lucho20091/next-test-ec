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
      variant="ghost"
      className="
        px-3 py-2 
        text-gray-700 font-medium
        hover:text-red-500
        hover:bg-transparent
        transition cursor-pointer
      "
    >
      Sign Out
    </Button>
  );
}
