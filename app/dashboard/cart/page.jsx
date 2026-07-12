"use client";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const { user, updateDeliveryAddress } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const [address, setAddress] = useState(
    user?.deliveryAddress || (user?.address ? `${user.address.line1}\n${user.address.city}, ${user.address.state} - ${user.address.zip}` : "")
  );
  const [loading, setLoading] = useState(false);

  // ✅ Pre-fill address from user profile on mount
  useEffect(() => {
    if (!address && user) {
      const pre = user.deliveryAddress || (user.address ? `${user.address.line1}\n${user.address.city}, ${user.address.state} - ${user.address.zip}` : "");
      if (pre) setAddress(pre);
    }
  }, [user?.address, address]);

  // ✅ Confirm order button clicked
  const handleConfirm = async () => {
    if (cart.length === 0) {
      addToast("Your cart is empty!", "warning");
      return;
    }
    if (!address) {
      addToast("Please enter a delivery address!", "warning");
      return;
    }

    setLoading(true);

    try {
      // Save order to database
      const orderData = {
        userId: user.id,
        items: cart.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: total,
        deliveryAddress: address,
        status: "CONFIRMED",
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        addToast("Error placing order. Please try again.", "error");
        setLoading(false);
        return;
      }

      const savedOrder = await res.json();

      // Update user context with delivery address
      updateDeliveryAddress(address);

      // Store in localStorage for confirmation page
      const order = {
        id: savedOrder._id,
        items: cart,
        total,
        eta: "2-3 days",
        date: new Date().toLocaleString(),
        deliveryAddress: address,
      };

      localStorage.setItem("lastOrder", JSON.stringify(order));
      clearCart();
      addToast("Order placed successfully! Redirecting...", "success");
      setTimeout(() => router.push("/dashboard/confirmation"), 1000);
    } catch (err) {
      console.error("Error placing order:", err);
      addToast("Error placing order. Please try again.", "error");
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-6 text-blue-700">My Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-white shadow p-4 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-xl font-bold text-blue-600 px-2"
                      >
                        –
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="text-xl font-bold text-blue-600 px-2"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-semibold text-gray-700">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ ADDRESS FIELD */}
            <div className="mt-8">
              <label className="block font-medium text-gray-700 mb-2">
                Delivery Address
              </label>

              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your complete delivery address..."
                className="border w-full p-3 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                rows="4"
              />
            </div>

            {/* TOTAL */}
            <div className="text-right mt-6 font-semibold text-lg">
              Total: ₹{total}
            </div>

            {/* CONFIRM BUTTON */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => router.push("/dashboard/medicines")}
                className="px-6 py-2 rounded-lg font-medium transition bg-gray-600 hover:bg-gray-700 text-white"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="px-6 py-2 rounded-lg font-medium transition bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
              >
                {loading ? "Processing..." : "Confirm Purchase"}
              </button>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
