"use client";
import { useState } from "react";

export default function AdminMedicineForm({ onSave }) {
  const [form, setForm] = useState({ name: "", price: "", category: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };
    await fetch("/api/medicines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setForm({ name: "", price: "", category: "" });
    onSave();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow w-full md:w-1/2"
    >
      <h3 className="text-lg font-semibold mb-3">Add Medicine</h3>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Medicine Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-3"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        className="border p-2 w-full mb-3"
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Medicine
      </button>
    </form>
  );
}
