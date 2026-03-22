"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <Link href="/" className="text-xl font-bold">Digital Pharmacy</Link>

      <div className="flex items-center gap-4">

        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/medicines">Medicines</Link>
        <Link href="/cart">Cart</Link>

        {/* ✅ Show Add Medicine only for Admins */}
        {user?.role === "admin" && (
          <Link 
            href="/admin/medicines"
          >
            Add Medicine
          </Link>
        )}

        {user ? (
          <>
            <span className="font-medium">
              Hi, {user?.firstName}
            </span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/auth/login">
            <button className="bg-blue-500 text-white px-3 py-1 rounded">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
