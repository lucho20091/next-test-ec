"use client";

import { useState } from "react";
import { updateOrderById } from "@/lib/actions/order";
import { Input } from "@/components/ui/input"; // Import Input
import { Label } from "@/components/ui/label"; // Import Label
import { Button } from "@/components/ui/button"; // Import Button

export default function EditOrder({ order }) {
  const [shippingStatus, setShippingStatus] = useState(
    order.shippingStatus?.currentStatus || "pending"
  );
  const [carrier, setCarrier] = useState(order.shippingStatus?.carrier || "");
  const [trackingId, setTrackingId] = useState(
    order.shippingStatus?.trackingId || ""
  );
  const [isDelivered, setIsDelivered] = useState(order.isDelivered);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      shippingStatus: {
        currentStatus: shippingStatus,
      },
      isDelivered,
    };

    // Include tracking data only if "Order shipped"
    if (shippingStatus === "shipped") { // Changed from "Preparing order" to "shipped" for logical consistency
      updateData.shippingStatus.carrier = carrier;
      updateData.shippingStatus.trackingId = trackingId;
    } else {
      // Clear tracking info if not shipped
      updateData.shippingStatus.carrier = null;
      updateData.shippingStatus.trackingId = null;
    }

    const update = await updateOrderById(order.id, updateData);
    if (update) {
      // showToast("Order updated successfully!", "success"); // Assuming showToast exists
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6 mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Edit Order: <span className="text-gray-500">{order.id}</span>
      </h2>

      {/* Order Summary */}
      <div className="border p-4 rounded-lg mb-6 bg-gray-50">
        <p>
          <strong>Customer:</strong> {order.shippingAddress.fullName}
        </p>
        <p>
          <strong>Address:</strong> {order.shippingAddress.address},{" "}
          {order.shippingAddress.city}, {order.shippingAddress.country}
        </p>
        <p>
          <strong>Email:</strong> {order.paymentResult?.email}
        </p>
        <p>
          <strong>Payment:</strong> {order.paymentMethod} (
          {order.paymentResult?.status})
        </p>
        <p>
          <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
        </p>
      </div>

      {/* Items */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Items</h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Name</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, i) => (
              <tr key={i}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">
                  ${Number(item.unit_amount?.value).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Editable Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="shippingStatus">Shipping Status</Label>
          <select
            id="shippingStatus"
            value={shippingStatus}
            onChange={(e) => setShippingStatus(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {/* Conditional tracking fields */}
        {shippingStatus === "shipped" && ( // Changed condition
          <div className="space-y-3">
            <div>
              <Label htmlFor="carrier">Carrier</Label>
              <Input
                id="carrier"
                type="text"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                placeholder="e.g. DHL, FedEx, UPS"
              />
            </div>

            <div>
              <Label htmlFor="trackingId">Tracking ID</Label>
              <Input
                id="trackingId"
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="e.g. 1Z999AA10123456784"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isDelivered}
            onChange={(e) => setIsDelivered(e.target.checked)}
            id="isDelivered"
          />
          <Label htmlFor="isDelivered">Mark as Delivered</Label>
        </div>

        <Button
          type="submit"
          className="w-full"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}