"use server";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { limit } from "@/lib/utils/ratelimit";
import { unstable_cache, revalidateTag } from "next/cache";
const getCachedDummyOrders = unstable_cache(
  async () => {
    const dummyId = "123";

    const orders = await prisma.order.findMany({
      where: { userId: dummyId },
    });

    return orders;
  },
  ["dummy-orders"],
  {
    tags: ["orders", "dummy-orders"],
    revalidate: 300, // 5 minutos
  }
);
export const createOrderPaypal = async (paypalOrder, cartItems) => {
  try {
    const allowed = limit(ip, 3, 3_600_000);

    if (!allowed) {
      console.log(`This IP ${ip} has been rate-limited.`);
      return null;
    }
    const user = await stackServerApp.getUser();
    if (!user) return null;

    const existingUser = await prisma.user.findUnique({
      where: { email: user.primaryEmail },
    });
    if (!existingUser) return null;

    const purchaseUnit = paypalOrder.purchase_units?.[0];
    const paymentResult = paypalOrder?.payment_source?.paypal;

    const mergedItems = purchaseUnit.items.map((paypalItem) => {
      const local = cartItems.find((c) => c.name === paypalItem.name);

      return {
        ...paypalItem,
        image: local?.image || null,
        slug: local?.slug || null,
        productId: local?.id || null,
      };
    });

    // Build Prisma record
    const newOrder = await prisma.order.create({
      data: {
        id: paypalOrder.id, // use PayPal order ID as your Order ID
        userId: existingUser.id,
        orderItems: mergedItems || [],
        shippingAddress: {
          fullName:
            paypalOrder.payer?.name?.given_name +
            " " +
            paypalOrder.payer?.name?.surname,
          address: purchaseUnit.shipping?.address?.address_line_1,
          city: purchaseUnit.shipping?.address?.admin_area_2,
          postalCode: purchaseUnit.shipping?.address?.postal_code,
          country: purchaseUnit.shipping?.address?.country_code,
        },
        paymentMethod: "PayPal",
        paymentResult: {
          id: paypalOrder.id,
          status: paypalOrder.status,
          email: paypalOrder.payer?.email_address,
        },
        shippingStatus: {
          currentStatus: "pending",
        },
        itemsPrice: parseFloat(purchaseUnit.amount.value),
        totalPrice: parseFloat(purchaseUnit.amount.value),
        isPaid: paypalOrder.status === "COMPLETED",
        paidAt: paypalOrder.status === "COMPLETED" ? new Date() : undefined,
      },
    });
    revalidateTag("orders");
    return newOrder;
  } catch (e) {
    console.error("❌ Error creating order:", e);
    return null;
  }
};

export const createDummyOrder = async (user, cartItems, total, ip) => {
  try {
    const allowed = limit(ip, 3, 3_600_000);

    if (!allowed) {
      console.log(`This IP ${ip} has been rate-limited.`);
      return null;
    }
    const mergedItems = cartItems.map((item) => ({
      tax: {
        value: "0.00",
        currency_code: "USD",
      },
      name: item.name,
      slug: item.slug ?? null,
      image: item.image,
      quantity: String(item.quantity),
      productId: item.productId,
      unit_amount: {
        value: String(item.price),
        currency_code: "USD",
      },
    }));

    const newOrder = await prisma.order.create({
      data: {
        userId: user.id,
        orderItems: mergedItems || [],
        shippingAddress: {
          fullName: user.shippingAddress.fullName,
          address: user.shippingAddress.address,
          city: user.shippingAddress.city,
          postalCode: user.shippingAddress.postalCode,
        },
        paymentMethod: "Another",
        paymentResult: {
          id: "4",
          status: "COMPLETED",
          email: user.email,
        },
        shippingStatus: {
          currentStatus: "pending",
        },
        itemsPrice: parseFloat(total),
        totalPrice: parseFloat(total),
        isPaid: true,
        paidAt: new Date(),
      },
    });
    console.log("payment dummy successful");
    revalidateTag("orders");
    return newOrder;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getOrderPaypal = async (id) => {
  try {
    // Get logged-in user
    const user = await stackServerApp.getUser();
    const dummyId = "123";
    let existingUser;
    if (user) {
      existingUser = await prisma.user.findUnique({
        where: { email: user.primaryEmail },
      });
    }

    // Fetch order
    const order = await prisma.order.findUnique({
      where: { id },
    });
    if (!order) return null;

    // Authorization: allow only if admin or owner
    console.log(order);
    const isAuthorized =
      existingUser?.isAdmin ||
      order.userId === existingUser?.id ||
      order.userId === dummyId;

    if (!isAuthorized) {
      console.warn("🚫 Unauthorized access to order:", id);
      return null;
    }

    return order;
  } catch (e) {
    console.error("❌ Error fetching order:", e);
    return null;
  }
};

export const getUserOrders = async () => {
  try {
    // Get logged-in user
    const user = await stackServerApp.getUser();
    if (!user) return null;

    const existingUser = await prisma.user.findUnique({
      where: { email: user.primaryEmail },
    });
    if (!existingUser) return null;

    // Fetch order
    const orders = await prisma.order.findMany({
      where: { userId: existingUser.id },
    });
    if (!orders) return null;

    return orders;
  } catch (e) {
    console.error("❌ Error fetching order:", e);
    return null;
  }
};

export const getDummyOrders = async () => {
  try {
    const orders = await getCachedDummyOrders();
    return orders;
  } catch (e) {
    console.error("❌ Error fetching order:", e);
    return null;
  }
};

export const getAdminOrders = async () => {
  try {
    // Get logged-in user
    const user = await stackServerApp.getUser();
    if (!user) return null;

    const existingUser = await prisma.user.findUnique({
      where: { email: user.primaryEmail },
    });
    if (!existingUser) return null;

    // Fetch order
    const order = await prisma.order.findMany();
    if (!order) return null;

    // Authorization: allow only if admin or owner
    const isAuthorized = existingUser.isAdmin;

    if (!isAuthorized) {
      console.warn("🚫 Unauthorized access to order:", id);
      return null;
    }

    return order;
  } catch (e) {
    console.error("❌ Error fetching order:", e);
    return null;
  }
};

export const getOrderById = async (id) => {
  try {
    const user = await stackServerApp.getUser();
    if (!user) return null;

    const existingUser = await prisma.user.findUnique({
      where: { email: user.primaryEmail },
    });
    if (!existingUser) return null;
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) return null;

    // Allow access only if the user owns the order or is an admin
    if (order.userId !== existingUser.id && !existingUser.isAdmin) {
      return null;
    }

    return order;
  } catch (e) {
    return null;
  }
};

export const updateOrderById = async (id, orderData) => {
  try {
    const user = await stackServerApp.getUser();
    if (!user) return null;

    const existingUser = await prisma.user.findUnique({
      where: { email: user.primaryEmail },
    });
    if (!existingUser) return null;
    const order = await prisma.order.update({
      where: { id },
      data: {
        ...orderData,
      },
    });

    if (!order) return null;

    // Allow access only if the user owns the order or is an admin
    if (order.userId !== existingUser.id && !existingUser.isAdmin) {
      return null;
    }
    revalidateTag("orders");
    return order;
  } catch (e) {
    return null;
  }
};
