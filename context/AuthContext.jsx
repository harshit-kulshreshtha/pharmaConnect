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
  

  // ✅ SIGNUP FUNCTION
  const signup = (data) => {
    const newUser = {
      uid: "LOCAL-" + Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob,
      phone: data.phone,
      email: data.email,
      role: "user", // ✅ always user signup (admin created manually)
      address: data.address || "",
      deliveryAddress: "",
    };

    setUser(newUser);
    localStorage.setItem("pharmaUser", JSON.stringify(newUser));
    localStorage.setItem("pharmaLoginTime", Date.now());

    return newUser;
  };

  // ✅ UPDATE ADDRESS (for profile edit or signup)
  const updateAddress = (address) => {
    const updated = { ...user, address };
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
