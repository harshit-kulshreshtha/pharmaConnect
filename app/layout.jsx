import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "../context/ToastContext";
import Navbar from "../components/navbar";
import ToastContainer from "../components/ToastContainer";

export const metadata = {
  title: "PharmaConnect",
  description: "Digital pharmacy demo project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body className="min-h-screen bg-slate-50 text-slate-900">
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <Navbar />
              <ToastContainer />
              <main className="px-4 py-4 sm:px-6 lg:px-8">{children}</main>
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
