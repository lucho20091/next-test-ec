import Link from "next/link";
import { getAdminOrders } from "@/lib/actions/order";

export default async function Page() {
  const orders = await getAdminOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border text-sm text-gray-700">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Payment</th>
            <th className="p-2 border">Shipping</th>
            <th className="p-2 border">Created</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-2 border font-mono">{order.id}</td>
                <td className="p-2 border">
                  {order.paymentResult?.email || "Unknown"}
                </td>
                <td className="p-2 border">${order.totalPrice.toFixed(2)}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      order.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.paymentMethod} {order.isPaid ? "✓" : "✗"}
                  </span>
                </td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      order.shippingStatus?.currentStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.shippingStatus?.currentStatus || "N/A"}
                  </span>
                </td>
                <td className="p-2 border">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border flex gap-2">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  {!order.isDelivered && (
                    <button className="text-green-600 hover:underline">
                      Mark as Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
