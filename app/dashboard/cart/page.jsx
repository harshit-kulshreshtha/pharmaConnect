"use client";
import { useCart } from "../../../context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const [address, setAddress] = useState("");

  // ✅ Confirm order button clicked
  const handleConfirm = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    const order = {
      id: Date.now(),
      items: cart,
      total,
      eta: "2-3 days",
      date: new Date().toLocaleString(),
      deliveryAddress: address,
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));
    clearCart();
    router.push("/dashboard/confirmation");
  };

  return (
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
                key={item.id}
                className="flex justify-between items-center bg-white shadow p-4 rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
                    <button
                      onClick={() => removeFromCart(item.id)}
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

            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Search your address..."
              className="border w-full p-3 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>

          {/* TOTAL */}
          <div className="text-right mt-6 font-semibold text-lg">
            Total: ₹{total}
          </div>

          {/* CONFIRM BUTTON */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleConfirm}
              className={"px-6 py-2 rounded-lg font-medium transition bg-green-600 hover:bg-green-700 text-white"
              }
            >
              Confirm Purchase
            </button>
          </div>
        </>
      )}
    </div>
  );
}
