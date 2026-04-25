import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, HeartPulse } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PredictionResult {
  label: string;
  confidence: number;
}

const initialForm = {
  age: "",
  sex: "1",
  cp: "0",
  trestbps: "",
  chol: "",
  fbs: "0",
  restecg: "0",
  thalach: "",
  exang: "0",
  oldpeak: "",
  slope: "0",
  ca: "0",
  thal: "1",
};

const HeartDisease = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const update = (key: keyof typeof initialForm, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      // TODO: Replace with your actual ML API endpoint.
      // Example:
      // const res = await fetch("https://your-ml-api.com/heart", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // const data = await res.json();
      // setResult({ label: data.label, confidence: data.confidence });

      await new Promise((r) => setTimeout(r, 1000));
      setResult({ label: "Awaiting ML API", confidence: 0 });
      toast({ title: "Connect your ML API in src/pages/HeartDisease.tsx" });
    } catch (err: any) {
      toast({ title: "Prediction failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="rounded-3xl bg-gradient-hero p-8 lg:p-12 shadow-card">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-card/70 backdrop-blur px-3 py-1 text-xs font-medium text-primary">
              <HeartPulse className="h-3.5 w-3.5" />
              Heart Disease Prediction
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Estimate your heart risk</h1>
            <p className="text-base lg:text-lg text-muted-foreground">
              Enter clinical measurements and we'll give you an instant prediction.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            onSubmit={handlePredict}
            className="lg:col-span-2 rounded-2xl bg-card p-6 lg:p-8 shadow-card border border-border/50 space-y-5"
          >
            <h2 className="font-bold text-foreground">Patient details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" min="1" max="120" required value={form.age} onChange={(e) => update("age", e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sex">Sex</Label>
                <select id="sex" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.sex} onChange={(e) => update("sex", e.target.value)}>
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cp">Chest Pain Type</Label>
                <select id="cp" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.cp} onChange={(e) => update("cp", e.target.value)}>
                  <option value="0">Typical Angina</option>
                  <option value="1">Atypical Angina</option>
                  <option value="2">Non-anginal Pain</option>
                  <option value="3">Asymptomatic</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="trestbps">Resting BP (mm Hg)</Label>
                <Input id="trestbps" type="number" required value={form.trestbps} onChange={(e) => update("trestbps", e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="chol">Cholesterol (mg/dl)</Label>
                <Input id="chol" type="number" required value={form.chol} onChange={(e) => update("chol", e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fbs">Fasting Blood Sugar &gt; 120 mg/dl</Label>
                <select id="fbs" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.fbs} onChange={(e) => update("fbs", e.target.value)}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="restecg">Resting ECG</Label>
                <select id="restecg" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.restecg} onChange={(e) => update("restecg", e.target.value)}>
                  <option value="0">Normal</option>
                  <option value="1">ST-T Abnormality</option>
                  <option value="2">LV Hypertrophy</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="thalach">Max Heart Rate</Label>
                <Input id="thalach" type="number" required value={form.thalach} onChange={(e) => update("thalach", e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="exang">Exercise Induced Angina</Label>
                <select id="exang" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.exang} onChange={(e) => update("exang", e.target.value)}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="oldpeak">ST Depression (oldpeak)</Label>
                <Input id="oldpeak" type="number" step="0.1" required value={form.oldpeak} onChange={(e) => update("oldpeak", e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="slope">Slope of ST</Label>
                <select id="slope" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.slope} onChange={(e) => update("slope", e.target.value)}>
                  <option value="0">Upsloping</option>
                  <option value="1">Flat</option>
                  <option value="2">Downsloping</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ca">Major Vessels (0-3)</Label>
                <select id="ca" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.ca} onChange={(e) => update("ca", e.target.value)}>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="thal">Thalassemia</Label>
                <select id="thal" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.thal} onChange={(e) => update("thal", e.target.value)}>
                  <option value="1">Normal</option>
                  <option value="2">Fixed Defect</option>
                  <option value="3">Reversible Defect</option>
                </select>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Predicting...</>
              ) : (
                "Predict Heart Risk"
              )}
            </Button>
          </form>

          <div className="rounded-2xl bg-card p-6 lg:p-8 shadow-card border border-border/50">
            <h2 className="font-bold text-foreground mb-4">Result</h2>
            {result ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary-soft p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Prediction</p>
                  <p className="text-2xl font-bold text-primary mt-1">{result.label}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Confidence: {(result.confidence * 100).toFixed(1)}%
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  This is not medical advice. Please consult a doctor for diagnosis.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12 text-muted-foreground">
                <HeartPulse className="h-12 w-12 mb-3 opacity-40" />
                <p className="text-sm">Fill in the form to see your prediction here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HeartDisease;
