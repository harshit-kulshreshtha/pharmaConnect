import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/navbar";

export const metadata = {
  title: "PharmaConnect",
  description: "Digital pharmacy demo project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
