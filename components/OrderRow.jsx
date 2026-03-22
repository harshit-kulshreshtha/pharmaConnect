"use client";
export default function OrderRow({ order, onStatusChange }) {
  const statuses = ["Pending", "Packed", "Shipped", "Delivered"];

  return (
    <tr>
      <td className="border px-4 py-2">{order.id}</td>
      <td className="border px-4 py-2">{order.customer}</td>
      <td className="border px-4 py-2">{order.status}</td>
      <td className="border px-4 py-2">
        <select
          value={order.status}
          onChange={(e) => onStatusChange(order.id, e.target.value)}
          className="border rounded p-1"
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </td>
    </tr>
  );
}
