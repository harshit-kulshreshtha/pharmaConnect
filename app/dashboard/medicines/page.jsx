"use client";
import { useState, useEffect } from "react";
import MedicineCard from "../../../components/MedicineCard";

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/medicines");
      const data = await res.json();
      setMedicines(data);
      const cats = Array.from(new Set(data.map((m) => (m.category || "").trim()).filter(Boolean)));
      setCategories(cats);
    }
    fetchData();
  }, []);

  const filtered = medicines
    .filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))
    .filter((m) => (category ? (m.category || "") === category : true));

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Medicines</h1>

      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search medicines..."
          className="border rounded p-2 mb-3 md:mb-0 flex-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded p-2 w-full md:w-48"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No medicines found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <MedicineCard key={m._id} medicine={m} />
          ))}
        </div>
      )}
    </div>
  );
}
