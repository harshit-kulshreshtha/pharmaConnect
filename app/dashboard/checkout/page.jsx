"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { user, updateDeliveryAddress  } = useAuth();
  const router = useRouter();
  const [address, setAddress] = useState(user?.address || "");

  const placeOrder = () => {
    // Later: create Firestore order doc
    const updatedUser = { ...user, deliveryAddress: address };
    updateDeliveryAddress(address);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Order placed successfully!");
    router.push("/dashboard/confirmation");
  };

  return (
    <div className="p-6">
      <h2 className="font-bold text-lg mb-2">Delivery Address</h2>
      <textarea
        className="border p-2 w-full"
        rows="4"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter delivery address..."
      />

      <button onClick={placeOrder} className="mt-3 bg-green-600 text-white px-4 py-2 rounded">
        Confirm & Order
      </button>
    </div>
  );
}
