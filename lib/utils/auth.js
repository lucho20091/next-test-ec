import { isAdmin } from "@/lib/actions/user";
import { redirect } from "next/navigation";

export async function redirectBasedOnAdminStatus() {
  const user = await isAdmin();

  if (!user) {
    redirect("/");
  }
}
