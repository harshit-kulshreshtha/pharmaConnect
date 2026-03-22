"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ConfirmationPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) setOrder(JSON.parse(lastOrder));
  }, []);

  if (!order) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] text-gray-600">
        <p>No recent order found.</p>
        <Link href="/dashboard/medicines" className="text-blue-600 mt-4">
          Go to Medicines
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100 text-center">
        <h1 className="text-2xl font-semibold text-green-600 mb-4">
          🎉 Booking Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">
          Your order #{order.id} has been placed successfully.
        </p>

        <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-gray-700 mb-2">Order Summary:</h2>
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm text-gray-600 mb-1"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          Expected Delivery: <b>{order.eta}</b>
        </p>

        <Link
          href="/dashboard/medicines"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
