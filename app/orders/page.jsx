import Link from "next/link";
import { getUserOrders } from "@/lib/actions/order";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { getDummyUser, getUserByEmail } from "@/lib/actions/user";
export default async function Page() {
  const orders = await getUserOrders();
  let user = await getUserByEmail();
  let isDummy = false;
  if (!user) {
    isDummy = true;
  }
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-start mb-8">
          <Link href="/orders">My Orders</Link>
          {isDummy && <Link href="/orders/dummy">Dummy Account Orders</Link>}
        </div>
        <Card className="p-8 text-center">
          <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">
            You haven't placed any orders yet
          </p>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-start mb-8">
        <Link href="/orders">My Orders</Link>
        {isDummy && <Link href="/orders/dummy">Dummy Account Orders</Link>}
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        {orders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Order #{order.id}</p>
                <p className="text-gray-600 text-sm">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Badge
                className={getStatusColor(order?.shippingStatus?.currentStatus)}
              >
                {order?.shippingStatus?.currentStatus.charAt(0).toUpperCase() +
                  order?.shippingStatus?.currentStatus.slice(1)}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} × {item.quantity}
                  </span>
                  <span>
                    ${(item.unit_amount.value * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="text-gray-600 text-sm">Total</p>
                <p>${order.totalPrice.toFixed(2)}</p>
              </div>
              <Button asChild>
                <Link href={`/orders/${order.id}`}>View Details</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
