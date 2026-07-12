"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex flex-wrap justify-between items-center gap-3 p-4 bg-white border-b border-slate-200 shadow-sm">
      <Link href="/" className="text-xl font-bold text-slate-900">Digital Pharmacy</Link>

      <div className="flex flex-wrap items-center gap-3 text-slate-700">
        {user?.role === "admin" ? (
          <>
            <Link href="/admin" className="hover:text-slate-900 transition">Admin Dashboard</Link>
            <Link href="/admin/medicines" className="hover:text-slate-900 transition">Manage Medicines</Link>
            <Link href="/admin/orders" className="hover:text-slate-900 transition">Manage Orders</Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" className="hover:text-slate-900 transition">Dashboard</Link>
            <Link href="/dashboard/medicines" className="hover:text-slate-900 transition">Medicines</Link>
            <Link href="/dashboard/cart" className="hover:text-slate-900 transition">Cart</Link>
          </>
        )}

        {user ? (
          <>
            <span className="font-medium text-slate-900">
              Hi, {user?.firstName}
            </span>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/auth/login">
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
