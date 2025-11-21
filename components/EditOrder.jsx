"use client";

import { useState } from "react";
import { updateOrderById } from "@/lib/actions/order";

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
    if (shippingStatus !== "Preparing order") {
      updateData.shippingStatus.carrier = carrier;
      updateData.shippingStatus.trackingId = trackingId;
    }

    const update = await updateOrderById(order.id, updateData);
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
          <label className="block mb-1 font-medium">Shipping Status</label>
          <select
            value={shippingStatus}
            onChange={(e) => setShippingStatus(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option>pending</option>
            <option>processing</option>
            <option>shipped</option>
            <option>delivered</option>
          </select>
        </div>

        {/* Conditional tracking fields */}
        {shippingStatus !== "Preparing order" && (
          <div className="space-y-3">
            <div>
              <label className="block mb-1 font-medium">Carrier</label>
              <input
                type="text"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                placeholder="e.g. DHL, FedEx, UPS"
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Tracking ID</label>
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="e.g. 1Z999AA10123456784"
                className="w-full border rounded-md p-2"
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
          <label htmlFor="isDelivered">Mark as Delivered</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
