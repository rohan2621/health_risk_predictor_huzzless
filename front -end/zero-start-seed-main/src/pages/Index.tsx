import { Stethoscope, ShieldPlus, Users } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { HeroBanner } from "@/components/dashboard/HeroBanner";
import { StatCard } from "@/components/dashboard/StatCard";
import { HealthTipCard } from "@/components/dashboard/HealthTipCard";

const Index = () => {
  return (
    <DashboardLayout>
      <HeroBanner />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <StatCard icon={Stethoscope} label="Pneumonia Scans" value={0} sublabel="Total Scans" iconColor="success" />
        <StatCard icon={ShieldPlus} label="High Risk Detected" value={0} sublabel="This Month" iconColor="warning" />
        <StatCard icon={Users} label="Active Users" value={0} sublabel="This Month" iconColor="info" />
      </div>

      <HealthTipCard />
    </DashboardLayout>
  );
};

export default Index;
