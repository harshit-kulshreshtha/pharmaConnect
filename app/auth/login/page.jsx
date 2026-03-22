"use client";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
      
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
      
        const data = await res.json();
      
        if (!res.ok) {
          alert(data.message);
          return;
        }
      
        login(data.user);   // store in context
      
        if (data.user.role === "admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard");
        }
      };
      

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
            >
                <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="border border-gray-300 p-2 rounded w-full mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-300 p-2 rounded w-full mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded font-medium"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
