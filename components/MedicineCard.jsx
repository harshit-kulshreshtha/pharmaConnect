"use client";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function MedicineCard({ medicine }) {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const router = useRouter();

  const count = getItemQuantity(medicine.id);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{medicine.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{medicine.category}</p>
      <p className="text-blue-600 font-semibold mb-4">₹{medicine.price}</p>

      {count === 0 ? (
        <button
          onClick={() => addToCart(medicine)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <button
              onClick={() => removeFromCart(medicine.id)}
              className="text-xl font-bold text-blue-600 px-2"
            >
              –
            </button>
            <span className="text-gray-800 mx-2 w-6 text-center">{count}</span>
            <button
              onClick={() => addToCart(medicine)}
              className="text-xl font-bold text-blue-600 px-2"
            >
              +
            </button>
          </div>

          <button
            onClick={() => router.push("/dashboard/cart")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Go to Cart
          </button>
        </div>
      )}
    </div>
  );
}
