import Link from "next/link";
export default function Sidebar() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Link href="/admin">Dashboard</Link>
      <Link href="/admin/orders">Orders</Link>
      <Link href="/admin/products">Products</Link>
      <Link href="/admin/users">Users</Link>
    </div>
  );
}
