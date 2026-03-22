"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  // ✅ Redirect logged-in user to dashboard
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center border border-gray-100">
        <h1 className="text-2xl font-semibold text-blue-700 mb-2">
          Welcome to PharmaConnect 💊
        </h1>

        <p className="text-gray-600 mb-6">
          Order trusted medicines and manage your digital pharmacy from one place.
        </p>

        <button
          onClick={() => router.push("/auth/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
        >
          Login to Continue
        </button>
      </div>
    </div>
  );
}
