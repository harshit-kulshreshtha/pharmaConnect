"use client";
import { useAuth } from "../../context/AuthContext";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin") redirect("/");

  return <div className="p-6">{children}</div>;
}
