"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 🔄 Persist cart in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pharmaCart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("pharmaCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (medicine) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === medicine.id);
      if (existing) {
        return prev.map((i) =>
          i.id === medicine.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...medicine, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const getItemQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getItemQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
