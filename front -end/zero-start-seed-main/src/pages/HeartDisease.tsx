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

  // ✅ SIMPLE VALIDATION
  if (
    !form.age ||
    !form.trestbps ||
    !form.chol ||
    !form.thalach ||
    !form.oldpeak
  ) {
    toast({
      title: "Missing fields",
      description: "Please fill all required fields",
      variant: "destructive"
    });
    setLoading(false);
    return;
  }

  try {
    const res = await fetch("http://127.0.0.1:5000/predict-heart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        age: parseFloat(form.age),
        sex: parseFloat(form.sex),
        cp: parseFloat(form.cp),
        trestbps: parseFloat(form.trestbps),
        chol: parseFloat(form.chol),
        fbs: parseFloat(form.fbs),
        restecg: parseFloat(form.restecg),
        thalach: parseFloat(form.thalach),
        exang: parseFloat(form.exang),
        oldpeak: parseFloat(form.oldpeak),
        slope: parseFloat(form.slope),
        ca: parseFloat(form.ca),
        thal: parseFloat(form.thal)
      })
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    setResult({
      label: data.prediction,
      confidence: data.confidence
    });

  } catch (err: any) {
    console.error(err);
    toast({
      title: "Prediction failed",
      description: err.message,
      variant: "destructive"
    });
  } finally {
    setLoading(false);
  }
};

  // 🔥 COLOR BASED ON RISK
  const getColor = () => {
    if (!result) return "text-primary";
    if (result.label === "Low Risk") return "text-green-600";
    if (result.label === "Medium Risk") return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="rounded-3xl bg-gradient-hero p-8 shadow-card">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-card/70 px-3 py-1 text-xs font-medium text-primary">
              <HeartPulse className="h-3.5 w-3.5" />
              Heart Disease Prediction
            </div>
            <h1 className="text-3xl font-bold">Estimate your heart risk</h1>
            <p className="text-muted-foreground">
              Enter clinical measurements for prediction.
            </p>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* FORM */}
          <form onSubmit={handlePredict} className="lg:col-span-2 space-y-4 bg-card p-6 rounded-2xl shadow">

            <h2 className="font-bold">Patient details</h2>

            <div className="grid sm:grid-cols-2 gap-4">

              <Input type="number" placeholder="Age" value={form.age} onChange={(e) => update("age", e.target.value)} />
              <select value={form.sex} onChange={(e) => update("sex", e.target.value)}>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>

              <select value={form.cp} onChange={(e) => update("cp", e.target.value)}>
                <option value="0">Typical Angina</option>
                <option value="1">Atypical</option>
                <option value="2">Non-anginal</option>
                <option value="3">Asymptomatic</option>
              </select>

              <Input type="number" placeholder="BP" value={form.trestbps} onChange={(e) => update("trestbps", e.target.value)} />

              <Input type="number" placeholder="Cholesterol" value={form.chol} onChange={(e) => update("chol", e.target.value)} />

              <select value={form.fbs} onChange={(e) => update("fbs", e.target.value)}>
                <option value="0">FBS Normal</option>
                <option value="1">FBS High</option>
              </select>

              <select value={form.restecg} onChange={(e) => update("restecg", e.target.value)}>
                <option value="0">Normal ECG</option>
                <option value="1">Abnormal</option>
                <option value="2">Hypertrophy</option>
              </select>

              <Input type="number" placeholder="Max Heart Rate" value={form.thalach} onChange={(e) => update("thalach", e.target.value)} />

              <select value={form.exang} onChange={(e) => update("exang", e.target.value)}>
                <option value="0">No Angina</option>
                <option value="1">Angina</option>
              </select>

              <Input type="number" placeholder="Oldpeak" value={form.oldpeak} onChange={(e) => update("oldpeak", e.target.value)} />

              <select value={form.slope} onChange={(e) => update("slope", e.target.value)}>
                <option value="0">Upsloping</option>
                <option value="1">Flat</option>
                <option value="2">Downsloping</option>
              </select>

              <select value={form.ca} onChange={(e) => update("ca", e.target.value)}>
                <option value="0">0 vessels</option>
                <option value="1">1 vessel</option>
                <option value="2">2 vessels</option>
                <option value="3">3 vessels</option>
              </select>

              <select value={form.thal} onChange={(e) => update("thal", e.target.value)}>
                <option value="1">Normal</option>
                <option value="2">Fixed Defect</option>
                <option value="3">Reversible Defect</option>
              </select>

            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Predict Heart Risk"}
            </Button>
          </form>

          {/* RESULT */}
          <div className="bg-card p-6 rounded-2xl shadow">
            <h2 className="font-bold mb-4">Result</h2>

            {result ? (
              <div className="space-y-3">
                <p className={`text-2xl font-bold ${getColor()}`}>
                  {result.label}
                </p>

                <p>
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground">Fill form to predict</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HeartDisease;