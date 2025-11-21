import Sidebar from "@/components/Sidebar";
import { redirectBasedOnAdminStatus } from "@/lib/utils/auth";
import { getUserByEmail } from "@/lib/actions/user";
import { stackServerApp } from "@/stack/server";
export default async function AdminLayout({ children }) {
  await redirectBasedOnAdminStatus();
  return (
    <section className="grid sm:grid-cols-[1fr_4fr]">
      <Sidebar />
      {children}
    </section>
  );
}
