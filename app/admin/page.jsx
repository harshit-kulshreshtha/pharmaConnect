import ProtectedRoute from "../../components/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute role="admin">
      <h1>Admin Dashboard</h1>
    </ProtectedRoute>
  );
}
