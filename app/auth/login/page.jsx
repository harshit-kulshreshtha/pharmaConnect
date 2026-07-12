"use client";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const { addToast } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
      
        try {
          const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
          });
        
          const data = await res.json();
        
          if (!res.ok) {
            addToast(data.message || "Login failed", "error");
            setLoading(false);
            return;
          }
        
          login(data);   // store in context
          addToast("Login successful!", "success");

          setTimeout(() => {
            if (data.role === "admin") {
              router.push("/admin");
            } else {
              router.push("/dashboard");
            }
          }, 500);
        } catch (err) {
          addToast("An error occurred. Please try again.", "error");
          setLoading(false);
        }
      };
      

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50 px-4">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-slate-200"
            >
                <h1 className="text-3xl font-bold mb-2 text-center text-slate-900">Welcome Back</h1>
                <p className="text-center text-slate-600 mb-6">Login to your account</p>

                <input
                    type="email"
                    placeholder="Email"
                    className="border border-slate-300 p-3 rounded-lg w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border border-slate-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg font-medium transition disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="mt-6 text-center">
                    <p className="text-slate-600">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => router.push("/auth/signup")}
                            className="text-blue-600 hover:text-blue-700 font-semibold transition"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
}
