import { ArrowRight, Stethoscope, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import heroLungs from "@/assets/hero-lungs.png";

export const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 lg:p-12 shadow-card">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div className="space-y-6 z-10">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Smart Health<br />Risk Predictor
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground">
              AI-Powered Disease Prediction &<br />Pneumonia Detection
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/pneumonia"
              className="inline-flex items-center gap-3 rounded-2xl bg-card px-6 py-4 shadow-soft hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <Stethoscope className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Pneumonia Detection</span>
              <ArrowRight className="h-4 w-4 text-primary" />
            </Link>

            <Link
              to="/heart-disease"
              className="inline-flex items-center gap-3 rounded-2xl bg-card px-6 py-4 shadow-soft hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <HeartPulse className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Heart Disease</span>
              <ArrowRight className="h-4 w-4 text-primary" />
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <img
            src={heroLungs}
            alt="Lungs health illustration"
            width={420}
            height={350}
            className="w-full max-w-sm lg:max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  );
};
