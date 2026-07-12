"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    addressLine1: "",
    addressCity: "",
    addressState: "",
    addressZip: ""
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      addToast("Passwords do not match!", "error");
      return;
    }

    if (form.password.length < 6) {
      addToast("Password must be at least 6 characters!", "error");
      return;
    }

    // validate phone: digits and length 10
    const phoneDigits = (form.phone || "").replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      addToast("Phone number must be 10 digits", "error");
      return;
    }

    // basic email validation: contains @ and domain
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(form.email || "")) {
      addToast("Please enter a valid email address", "error");
      return;
    }

    setLoading(true);
  
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          dob: form.dob,
          phone: form.phone,
          email: form.email,
          password: form.password,
          addressLine1: form.addressLine1,
          addressCity: form.addressCity,
          addressState: form.addressState,
          addressZip: form.addressZip
        })
      });
    
      const data = await res.json();
    
      if (!res.ok) {
        addToast(data.message || "Signup failed. Please try again.", "error");
        setLoading(false);
        return;
      }
    
      // Auto-login after signup
      signup(data);
      addToast("Account created successfully! Redirecting to dashboard...", "success");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      addToast("An error occurred. Please try again.", "error");
      setLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 px-4 py-8">
      <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-slate-200 space-y-4" onSubmit={handleSignup}>
        <div>
          <h1 className="text-3xl font-bold mb-2 text-slate-900">Create Account</h1>
          <p className="text-slate-600 text-sm mb-6">Join PharmaConnect to get started</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input 
            type="text"
            placeholder="First Name *" 
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.firstName}
            onChange={e => setForm({ ...form, firstName: e.target.value })}
            required 
          />
          <input 
            type="text"
            placeholder="Last Name *" 
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.lastName}
            onChange={e => setForm({ ...form, lastName: e.target.value })}
            required 
          />
        </div>

        <input 
          type="email"
          placeholder="Email *" 
          className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required 
        />

        <input 
          type="date"
          placeholder="Date of Birth" 
          className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.dob}
          onChange={e => setForm({ ...form, dob: e.target.value })}
        />

        <input 
          type="tel"
          placeholder="Phone" 
          className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        <div className="grid grid-cols-1 gap-2">
          <input
            type="text"
            placeholder="Address Line 1"
            className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.addressLine1}
            onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
          />
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="City"
              className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.addressCity}
              onChange={(e) => setForm({ ...form, addressCity: e.target.value })}
            />
            <input
              type="text"
              placeholder="State"
              className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.addressState}
              onChange={(e) => setForm({ ...form, addressState: e.target.value })}
            />
            <input
              type="text"
              placeholder="ZIP"
              className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.addressZip}
              onChange={(e) => setForm({ ...form, addressZip: e.target.value })}
            />
          </div>
        </div>

        <input 
          type="password"
          placeholder="Password * (min 6 chars)" 
          className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required 
        />

        <input 
          type="password"
          placeholder="Confirm Password *" 
          className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.confirmPassword}
          onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
          required 
        />

        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full font-medium transition disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-slate-600 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="text-blue-600 hover:text-blue-700 font-semibold transition"
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
