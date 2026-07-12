"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const SESSION_DURATION = 30 * 60 * 1000; // 30 mins

  const [user, setUser] = useState(null);

  // Load session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("pharmaUser");
    const loginTime = localStorage.getItem("pharmaLoginTime");

    if (savedUser && loginTime) {
      const now = Date.now();
      if (now - loginTime > SESSION_DURATION) {
        logout();
      } else {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  // ✅ LOGIN FUNCTION (must receive role or infer based on email)
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("pharmaUser", JSON.stringify(userData));
    localStorage.setItem("pharmaLoginTime", Date.now());
  };
  

  // ✅ SIGNUP FUNCTION - saves MongoDB user data
  const signup = (data) => {
    // Save the actual MongoDB user data from API response
    const newUser = {
      id: data.id, // MongoDB ObjectId from API
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      dob: data.dob || "",
      phone: data.phone || "",
      address: data.address || { line1: "", city: "", state: "", zip: "" },
      role: data.role || "user",
      // keep a stringified deliveryAddress for compatibility
      deliveryAddress:
        data.address && typeof data.address === "object"
          ? `${data.address.line1}\n${data.address.city}, ${data.address.state} - ${data.address.zip}`
          : data.address || "",
    };

    setUser(newUser);
    localStorage.setItem("pharmaUser", JSON.stringify(newUser));
    localStorage.setItem("pharmaLoginTime", Date.now());

    return newUser;
  };

  // ✅ UPDATE ADDRESS (for profile edit or signup)
  const updateAddress = (address) => {
    const updated = {
      ...user,
      address: address || { line1: "", city: "", state: "", zip: "" },
      deliveryAddress:
        address && typeof address === "object"
          ? `${address.line1}\n${address.city}, ${address.state} - ${address.zip}`
          : address || "",
    };
    setUser(updated);
    localStorage.setItem("pharmaUser", JSON.stringify(updated));
  };

  // ✅ UPDATE DELIVERY ADDRESS (during checkout)
  const updateDeliveryAddress = (deliveryAddress) => {
    const updated = { ...user, deliveryAddress };
    setUser(updated);
    localStorage.setItem("pharmaUser", JSON.stringify(updated));
  };

  // ✅ LOGOUT FUNCTION
  const logout = () => {
    setUser(null);
    localStorage.removeItem("pharmaUser");
    localStorage.removeItem("pharmaLoginTime");
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateAddress,
        updateDeliveryAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
