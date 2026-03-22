"use client";
import { useState, useEffect } from "react";
import MedicineCard from "../../../components/MedicineCard";

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/medicines");
      const data = await res.json();
      setMedicines(data);
    }
    fetchData();
  }, []);

  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Medicines</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search medicines..."
        className="border rounded p-2 mb-6 w-full"
      />

      {filtered.length === 0 ? (
        <p>No medicines found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <MedicineCard key={m.id} medicine={m} />
          ))}
        </div>
      )}
    </div>
  );
}
