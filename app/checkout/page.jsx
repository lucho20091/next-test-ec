"use client";
import { useCart } from "@/context/CartContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { createOrderPaypal, createDummyOrder } from "@/lib/actions/order";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getDummyUser, getUserByEmail } from "@/lib/actions/user";
const initialOptions = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
  currency: "USD",
  intent: "capture",
};

export default function CheckoutPage() {
  const [user, setUser] = useState(null);
  const [isDummyUser, setIsDummyUser] = useState(false);
  const { cartItems, total, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getUserByEmail();
        if (currentUser) {
          setIsDummyUser(false);
          setUser(currentUser);
        } else {
          const dummyUser = await getDummyUser();
          setIsDummyUser(true);
          setUser(dummyUser);
        }
      } catch (error) {}
    }

    fetchUser();
  }, []);

  const totalAmount =
    total ||
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: totalAmount.toFixed(2),
              },
            },
          },
          items: cartItems.map((item) => ({
            name: item.name,
            unit_amount: {
              currency_code: "USD",
              value: item.price.toFixed(2),
            },
            quantity: item.quantity,
          })),
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    const paypalOrder = await actions.order.capture();
    const dbOrder = await createOrderPaypal(paypalOrder, cartItems);

    if (dbOrder) {
      router.push(`/orders/${dbOrder.id}`);
      clearCart();
    } else {
    }
  };

  const onError = (err) => {};

  const dummyPayment = async () => {
    try {
      const ip = await fetch("/api/get-ip").then((r) => r.text());
      const dummyOrder = await createDummyOrder(
        user,
        cartItems,
        totalAmount,
        ip
      );
      router.push(`/orders/${dummyOrder.id}`);
      clearCart();
    } catch (e) {}
  };

  if (!cartItems.length)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        Your cart is empty 🛒
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Title */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/shipping">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shipping
        </Link>
      </Button>
      <h1 className="mb-8">Checkout</h1>
      {isDummyUser && (
        <div className="w-full bg-black text-white p-4 rounded-md mb-8 text-center">
          To customize your shipping address and test PayPal Sandbox, please
          sign in.
        </div>
      )}
      {!isDummyUser && user && (
        <div className="w-full bg-black text-white p-4 rounded-md mb-8 text-center">
          This is a demo project, please do not enter your personal payment
          method.
          <p>
            You can test with this card: 6304000000000000 exp: 12/30 cvc: 123
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:order-2 lg:row-start-1">
          <Card className="p-6">
            <h2 className="mb-4">Shipping Address</h2>
            <div className="space-y-1 text-gray-700">
              {user?.shippingAddress && (
                <>
                  <p>{user.shippingAddress.fullName}</p>
                  <p>{user.shippingAddress.address}</p>
                  <p>
                    {user.shippingAddress.city},{" "}
                    {user.shippingAddress.postalCode}
                  </p>
                  <p>{user.email}</p>
                  <p>{user.shippingAddress.phoneNumber}</p>
                </>
              )}
            </div>
          </Card>
        </div>

        <div className="lg:order-1 lg:row-start-1 lg:row-span-2">
          <Card className="p-6 sticky top-24">
            <h2 className="mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mb-4">
              By placing this order, you agree to our terms and conditions
            </p>
          </Card>
        </div>

        <div className="lg:order-3 lg:row-start-2 lg:mt-auto z-[99]">
          <Card className="p-6 ">
            {user && !isDummyUser ? (
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                  style={{
                    layout: "vertical",
                    color: "gold",
                    shape: "rect",
                    label: "paypal",
                    height: 45,
                  }}
                />
              </PayPalScriptProvider>
            ) : (
              <div>
                <Button
                  className="w-full cursor-pointer"
                  onClick={dummyPayment}
                >
                  Pay
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
