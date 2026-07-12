"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { user, updateDeliveryAddress  } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [address, setAddress] = useState(
    user?.deliveryAddress || (user?.address ? `${user.address.line1}\n${user.address.city}, ${user.address.state} - ${user.address.zip}` : "")
  );

  const placeOrder = () => {
    // Later: create Firestore order doc
    const updatedUser = { ...user, deliveryAddress: address };
    updateDeliveryAddress(address);
    localStorage.setItem("pharmaUser", JSON.stringify(updatedUser));
    addToast("Order placed successfully!", "success");
    setTimeout(() => router.push("/dashboard/confirmation"), 500);
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
