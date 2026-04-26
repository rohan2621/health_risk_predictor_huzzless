import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PredictionResult {
  label: string;
  confidence: number;
}

const Pneumonia = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleFile = (f: File | null) => {
    if (!f) return;
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({ title: "Please upload an X-ray image first", variant: "destructive" });
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("http://127.0.0.1:5000/predict-xray", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Prediction failed");
      }

      setResult({
        label: data.prediction,
        confidence: data.confidence
      });

    } catch (err: any) {
      console.error(err);
      toast({
        title: "Analysis failed",
        description: err.message,
        variant: "destructive"
      });
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
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>
              Pneumonia Detection
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Upload a chest X-ray</h1>
            <p className="text-base lg:text-lg text-muted-foreground">
              We'll analyze the image and give you a quick prediction.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-card p-6 lg:p-8 shadow-card border border-border/50">
            <h2 className="font-bold text-foreground mb-4">1. Upload X-ray</h2>
            <label className="block">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0] || null)}
              />
              <div className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border rounded-2xl p-10 cursor-pointer hover:bg-muted/40 transition">
                {preview ? (
                  <img src={preview} alt="X-ray preview" className="max-h-64 rounded-xl object-contain" />
                ) : (
                  <>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                      <Upload className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-foreground">Click to upload</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                    </div>
                  </>
                )}
              </div>
            </label>

            <Button onClick={handleAnalyze} disabled={!file || loading} className="w-full mt-4">
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...</> : "Analyze X-ray"}
            </Button>
          </div>

          <div className="rounded-2xl bg-card p-6 lg:p-8 shadow-card border border-border/50">
            <h2 className="font-bold text-foreground mb-4">2. Result</h2>
            {result ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary-soft p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Prediction</p>
                  <p className="text-2xl font-bold text-primary mt-1">{result.label}</p>
                  <p className="text-sm text-muted-foreground mt-2">Confidence: {(result.confidence * 100).toFixed(1)}%</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  This is not medical advice. Please consult a doctor for diagnosis.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12 text-muted-foreground">
                <svg className="h-12 w-12 mb-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <p className="text-sm">Upload an X-ray to see your result here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Pneumonia;
