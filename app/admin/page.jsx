"use client";
import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [stats, setStats] = useState({ medicines: 0, orders: 0, users: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [medicinesRes, ordersRes, usersRes] = await Promise.all([
          fetch("/api/medicines"),
          fetch("/api/orders"),
          fetch("/api/users"),
        ]);

        const medicines = await medicinesRes.json();
        const orders = await ordersRes.json();
        const users = await usersRes.json();

        setStats({
          medicines: medicines.length || 0,
          orders: orders.length || 0,
          users: users.length || 0,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  const adminLinks = [
    { name: "Manage Medicines", route: "/admin/medicines", emoji: "💊", description: "Add, edit, or delete medicines" },
    { name: "Manage Orders", route: "/admin/orders", emoji: "📦", description: "View and update order statuses" },
    { name: "Manage Users", route: "/admin/users", emoji: "👥", description: "View and manage user accounts" },
  ];

  return (
    <ProtectedRoute role="admin">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome to the pharmacy admin panel</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm">Total Medicines</p>
            <p className="text-3xl font-bold text-blue-600">{stats.medicines}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-600">
            <p className="text-gray-600 text-sm">Total Orders</p>
            <p className="text-3xl font-bold text-green-600">{stats.orders}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-600">
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-purple-600">{stats.users}</p>
          </div>
        </div>

        {/* Admin Links */}
        <h2 className="text-xl font-semibold mb-4">Management Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {adminLinks.map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-lg hover:border-blue-400 transition"
            >
              <div className="text-3xl mb-2">{link.emoji}</div>
              <h3 className="font-semibold text-lg mb-2">{link.name}</h3>
              <p className="text-sm text-gray-600">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
