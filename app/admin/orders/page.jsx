"use client";
import { useEffect, useState } from "react";
import OrderRow from "../../../components/OrderRow";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Orders Management</h1>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              onStatusChange={updateStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
