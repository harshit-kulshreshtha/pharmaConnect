"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function ProfilePage() {
  const { user, updateAddress } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phone: "",
    addressLine1: "",
    addressCity: "",
    addressState: "",
    addressZip: "",
  });

  // Fetch fresh user data from DB on component mount
  useEffect(() => {
    if (user?.id) {
      fetchUserProfile();
    }
  }, [user?.id]);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`/api/users/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          dob: data.dob || "",
          phone: data.phone || "",
          addressLine1: (data.address && data.address.line1) || "",
          addressCity: (data.address && data.address.city) || "",
          addressState: (data.address && data.address.state) || "",
          addressZip: (data.address && data.address.zip) || "",
        });
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setFetching(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // validate phone and email
      const phoneDigits = (form.phone || "").replace(/\D/g, "");
      if (phoneDigits.length !== 10) {
        addToast("Phone number must be 10 digits", "error");
        setLoading(false);
        return;
      }
      const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailRegex.test(form.email || "")) {
        addToast("Please enter a valid email address", "error");
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dob: form.dob,
          phone: form.phone,
          addressLine1: form.addressLine1,
          addressCity: form.addressCity,
          addressState: form.addressState,
          addressZip: form.addressZip,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        addToast(error.message || "Error updating profile.", "error");
        setLoading(false);
        return;
      }

      const updated = await res.json();
      
      // Update context with new address
      updateAddress(updated.address);

      addToast("Profile updated successfully!", "success");
      setIsEditing(false);
    } catch (err) {
      console.error("Error:", err);
      addToast("Error updating profile. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <ProtectedRoute>
        <div className="p-8 text-center text-slate-600">Loading profile...</div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="p-8 max-w-2xl">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => router.push("/dashboard/orders")}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
            >
              My Orders
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
                className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Address Line 1</label>
              <input
                type="text"
                value={form.addressLine1}
                onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
                placeholder="Street, building, etc."
                className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-3 gap-2 mt-2">
                <input
                  type="text"
                  value={form.addressCity}
                  onChange={(e) => setForm({ ...form, addressCity: e.target.value })}
                  placeholder="City"
                  className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={form.addressState}
                  onChange={(e) => setForm({ ...form, addressState: e.target.value })}
                  placeholder="State"
                  className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={form.addressZip}
                  onChange={(e) => setForm({ ...form, addressZip: e.target.value })}
                  placeholder="ZIP"
                  className="border border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">This address will be pre-filled when you place an order</p>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow border border-slate-200 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">First Name</p>
                <p className="text-lg font-semibold text-slate-900">{form.firstName || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Last Name</p>
                <p className="text-lg font-semibold text-slate-900">{form.lastName || "N/A"}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-600">Email</p>
              <p className="text-lg font-semibold text-slate-900">{form.email || "N/A"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Date of Birth</p>
                <p className="text-lg font-semibold text-slate-900">{form.dob || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Phone Number</p>
                <p className="text-lg font-semibold text-slate-900">{form.phone || "Not provided"}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-600">Address</p>
              <p className="text-lg font-semibold text-slate-900 whitespace-pre-wrap">
                {form.addressLine1 || form.addressCity || form.addressState || form.addressZip
                  ? `${form.addressLine1}\n${form.addressCity}, ${form.addressState} - ${form.addressZip}`
                  : "Not provided"}
              </p>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}