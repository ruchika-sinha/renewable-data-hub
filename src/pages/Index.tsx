import { EnergyDashboard } from "@/components/dashboard/EnergyDashboard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const Index = () => {
  return (
    <ProtectedRoute>
      <EnergyDashboard />
    </ProtectedRoute>
  );
};

export default Index;
