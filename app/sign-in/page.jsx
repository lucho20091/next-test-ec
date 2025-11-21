"use client";
import { SignIn } from "@stackframe/stack";
import { stackClientApp } from "@/stack/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const user = await stackClientApp.getUser();
      if (user) {
        router.push("/");
        return;
      }
    }

    checkUser();
  }, [router]);

  return (
    <div className="grid place-items-center mt-8">
      <SignIn />
    </div>
  );
}
