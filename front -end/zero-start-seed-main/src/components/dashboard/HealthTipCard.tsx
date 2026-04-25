import { Apple } from "lucide-react";
import healthTip from "@/assets/health-tip.png";

export const HealthTipCard = () => {
  return (
    <div className="rounded-2xl bg-card p-6 lg:p-8 shadow-card border border-border/50">
      <div className="flex items-center gap-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-success-soft">
          <Apple className="h-8 w-8 text-success" />
        </div>

        <div className="flex-1 space-y-1">
          <h3 className="text-lg font-bold text-foreground">Health Tip</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Eat a balanced diet, stay active and get enough sleep to keep your body and mind healthy.
          </p>
        </div>

        <img
          src={healthTip}
          alt="Healthy food"
          width={140}
          height={140}
          loading="lazy"
          className="hidden md:block w-32 h-32 object-contain"
        />
      </div>
    </div>
  );
};
