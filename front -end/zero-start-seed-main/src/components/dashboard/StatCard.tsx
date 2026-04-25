import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sublabel: string;
  iconColor: "success" | "warning" | "info";
}

const colorMap = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  info: "bg-info-soft text-info",
};

export const StatCard = ({ icon: Icon, label, value, sublabel, iconColor }: StatCardProps) => {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-card border border-border/50 hover:shadow-soft transition-shadow">
      <div className="flex items-center gap-5">
        <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl shrink-0", colorMap[iconColor])}>
          <Icon className="h-7 w-7" />
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{sublabel}</p>
        </div>
      </div>
    </div>
  );
};
