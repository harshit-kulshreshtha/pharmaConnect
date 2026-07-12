"use client";
import { useAuth } from "../../context/AuthContext";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin") redirect("/");

  return <div className="min-h-screen bg-slate-50 p-6">{children}</div>;
}
