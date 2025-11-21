import { getOrderPaypal } from "@/lib/actions/order";
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { getDummyUser, getUserByEmail } from "@/lib/actions/user";
export default async function Page({ params }) {
  const { id } = await params;
  const order = await getOrderPaypal(id);
  let user = await getUserByEmail();
  let isDummy = false;
  if (!user) {
    user = await getDummyUser();
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5" />;
      case "processing":
        return <Package className="h-5 w-5" />;
      case "shipped":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto mt-16 text-center text-gray-600">
        <h2 className="text-2xl font-semibold mb-2">Order not found</h2>
        <p>It may not exist or you don't have permission to view it.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href={isDummy ? "/orders/dummy" : "/orders"}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Link>
      </Button>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1>Order Details</h1>
          <Badge
            className={getStatusColor(order?.shippingStatus?.currentStatus)}
          >
            {order?.shippingStatus?.currentStatus.charAt(0).toUpperCase() +
              order?.shippingStatus?.currentStatus.slice(1)}
          </Badge>
        </div>
        <p className="text-gray-600">Order #{order.id}</p>
        <p className="text-gray-600">
          Placed on {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="mb-4">Order Status</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                {getStatusIcon(order.shippingStatus?.currentStatus)}
              </div>
              <div>
                <p className="capitalize">
                  {order.shippingStatus?.currentStatus}
                </p>
                <p className="text-sm text-gray-600">
                  {order.shippingStatus?.currentStatus === "pending" &&
                    "Your order is being confirmed"}
                  {order.shippingStatus?.currentStatus === "processing" &&
                    "Your order is being prepared"}
                  {order.shippingStatus?.currentStatus === "shipped" &&
                    "Your order is on its way"}
                  {order.shippingStatus?.currentStatus === "delivered" &&
                    "Your order has been delivered"}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4">Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-blue-600">
                      ${Number(item.unit_amount.value).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p>
                      ${(item.unit_amount.value * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4">Shipping Address</h2>
            <div className="space-y-1 text-gray-700">
              <p>{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city},{order.shippingAddress.postalCode}
              </p>
              <p>{user.email}</p>
              <p>{user.shippingAddress.phoneNumber}</p>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 sticky top-24">
            <h2 className="mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span>
                    ${(item.unit_amount.value * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>

            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
