import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Insight {
  bmi: number;
  bmiLabel: string;
  hrLabel: string;
  tips: string[];
}

const Insights = () => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [hr, setHr] = useState("");
  const [insight, setInsight] = useState<Insight | null>(null);

  const compute = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const bmi = w / (h * h);
    let bmiLabel = "Normal";
    if (bmi < 18.5) bmiLabel = "Underweight";
    else if (bmi >= 25 && bmi < 30) bmiLabel = "Overweight";
    else if (bmi >= 30) bmiLabel = "Obese";

    const hrNum = parseFloat(hr);
    let hrLabel = "Normal resting heart rate";
    if (hrNum < 60) hrLabel = "Below average — could be athletic or low";
    else if (hrNum > 100) hrLabel = "Above normal — consider rest & hydration";

    const tips: string[] = [];
    if (bmi < 18.5) tips.push("Increase calorie intake with nutritious foods.");
    if (bmi >= 25) tips.push("Add 30 minutes of cardio most days of the week.");
    if (hrNum > 100) tips.push("Practice deep breathing and stay hydrated.");
    tips.push("Sleep 7–9 hours every night.");
    tips.push("Eat plenty of vegetables and limit processed food.");

    setInsight({ bmi: Math.round(bmi * 10) / 10, bmiLabel, hrLabel, tips });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="rounded-3xl bg-gradient-hero p-8 lg:p-12 shadow-card">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Health Insights</h1>
            <p className="text-base lg:text-lg text-muted-foreground">
              Get a quick overview of your health based on your basic info.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form onSubmit={compute} className="rounded-2xl bg-card p-6 lg:p-8 shadow-card border border-border/50 space-y-4">
            <h2 className="font-bold text-foreground mb-2">Your details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" required value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hr">Resting HR (bpm)</Label>
                <Input id="hr" type="number" required value={hr} onChange={(e) => setHr(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" type="number" required value={height} onChange={(e) => setHeight(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" required value={weight} onChange={(e) => setWeight(e.target.value)} />
              </div>
            </div>
            <Button type="submit" className="w-full">Get Insights</Button>
          </form>

          <div className="rounded-2xl bg-card p-6 lg:p-8 shadow-card border border-border/50">
            <h2 className="font-bold text-foreground mb-4">Your results</h2>
            {insight ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-info-soft p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">BMI</p>
                  <p className="text-3xl font-bold text-info">{insight.bmi}</p>
                  <p className="text-sm text-foreground/80 mt-1">{insight.bmiLabel}</p>
                </div>
                <div className="rounded-xl bg-success-soft p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Heart Rate</p>
                  <p className="text-sm text-foreground/80 mt-1">{insight.hrLabel}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Recommendations</p>
                  <ul className="space-y-2">
                    {insight.tips.map((t, i) => (
                      <li key={i} className="flex gap-2 items-start text-sm text-muted-foreground">
                        <svg className="h-4 w-4 mt-0.5 text-success shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Fill in the form to see your insights.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Insights;
