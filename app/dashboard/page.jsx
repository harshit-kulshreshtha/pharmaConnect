"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import ProtectedRoute from "../../components/ProtectedRoute"
export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  const menuItems = [
    { name: "Browse Medicines", route: "/dashboard/medicines", emoji: "💊" },
    { name: "My Cart", route: "/cart", emoji: "🛒" },
    { name: "My Orders", route: "/dashboard/orders", emoji: "📦" },
    { name: "My Profile", route: "/dashboard/profile", emoji: "👤" },
  ];

  return (
    <ProtectedRoute>
    <div className="min-h-[80vh] bg-gray-50 flex justify-center items-center">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-2xl border border-gray-200">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">
          Welcome, {user?.name} 👋
        </h1>
        <p className="text-gray-600 mb-6">Quick access to your pharmacy tools</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.route}
              onClick={() => router.push(item.route)}
              className="bg-white border border-gray-200 p-4 rounded-xl shadow hover:shadow-lg hover:bg-blue-50 transition flex items-center gap-3 text-left"
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="font-medium text-gray-700">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
