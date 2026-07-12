"use client";
import { useState, useEffect } from "react";
import AdminMedicineForm from "../../../components/AdminMedicineForm";

export default function AdminMedicines() {
  const [medicines, setMedicines] = useState([]);

  const fetchMedicines = async () => {
    const res = await fetch("/api/medicines");
    const data = await res.json();
    setMedicines(data);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleDelete = async (id) => {
    await fetch("/api/medicines", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchMedicines();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Manage Medicines</h1>
      <AdminMedicineForm onSave={fetchMedicines} />

      <table className="min-w-full border mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((m) => (
            <tr key={m._id}>
              <td className="border px-4 py-2">{m.name}</td>
              <td className="border px-4 py-2">{m.category}</td>
              <td className="border px-4 py-2">₹{m.price}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(m._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
