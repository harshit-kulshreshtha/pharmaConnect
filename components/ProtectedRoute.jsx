"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, role }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (role && user?.role !== role) {
      router.push("/dashboard");
    }
  }, [user, isLoading, role, router]);

  if (isLoading) {
    return null;
  }

  return children;
}
