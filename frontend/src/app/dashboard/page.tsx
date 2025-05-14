import ProtectedRoute from "@/components/auth/protected-route";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="mt-4 text-lg">Welcome to your dashboard!</p>
      </div>
    </ProtectedRoute>
  );
}
