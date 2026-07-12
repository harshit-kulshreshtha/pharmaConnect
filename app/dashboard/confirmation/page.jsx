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
      <div className="flex flex-col justify-center items-center min-h-[80vh] text-slate-600">
        <p>No recent order found.</p>
        <Link href="/dashboard/medicines" className="text-blue-600 mt-4">
          Go to Medicines
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center bg-slate-50 px-6 py-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-slate-200">
        <h1 className="text-2xl font-semibold text-green-600 mb-4 text-center">
          ✅ Order Confirmed!
        </h1>
        <p className="text-slate-600 mb-6 text-center">
          Your order #{order.id} has been placed successfully.
        </p>

        {/* Pay on Delivery Disclaimer */}
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
            <span>💰</span> Payment Method
          </h3>
          <p className="text-sm text-amber-800 mb-2">
            <b>Pay on Delivery</b> - Payment will be collected when your order is delivered.
          </p>
          <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
            <li>An invoice will be provided with your order</li>
            <li>You can pay via cash or card at delivery</li>
            <li>No prepayment required</li>
          </ul>
        </div>

        <div className="text-left bg-slate-50 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-slate-900 mb-2">Order Summary:</h2>
          {order.items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-sm text-slate-600 mb-1"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between font-semibold text-slate-900">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        <p className="text-slate-700 mb-6 text-center">
          Expected Delivery: <b>{order.eta}</b>
        </p>

        <Link
          href="/dashboard/medicines"
          className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
