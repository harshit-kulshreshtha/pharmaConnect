"use client";
import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    role: "user",
    address: "",
    deliveryAddress: ""
  });

  const handleSignup = async (e) => {
    e.preventDefault();
  
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      alert(data.message);
      return;
    }
  
    alert("Signup successful. Please login.");
    router.push("/auth/login");
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="space-y-3 w-80" onSubmit={handleSignup}>
        <input placeholder="First Name" onChange={e => setForm({ ...form, firstName: e.target.value })} />
        <input placeholder="Last Name" onChange={e => setForm({ ...form, lastName: e.target.value })} />
        <input type="date" onChange={e => setForm({ ...form, dob: e.target.value })} />
        <input placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <input placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
