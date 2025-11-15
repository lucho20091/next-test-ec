"use client";
import { SignIn } from "@stackframe/stack";
import { stackClientApp } from "@/stack/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { showToast } from "@/lib/utils/toast";

export default function Page() {
  const router = useRouter();
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const user = await stackClientApp.getUser();
      if (user) {
        router.push("/");
        return;
      }
      const hasTriedToCheckOut = localStorage.getItem("hasTriedToCheckOut");
      if (hasTriedToCheckOut === "true") {
        setShowCheckoutMessage(true);
        showToast(
          "Para completar la compra, por favor crea una cuenta primero"
        );
      }
    }

    checkUser();
  }, [router]);

  return (
    <div className="min-h-[calc(100svh-100px)] flex items-center justify-center">
      <div>
        <SignIn />
      </div>
    </div>
  );
}
