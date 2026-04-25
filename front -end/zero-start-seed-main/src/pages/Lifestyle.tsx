import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const tips = [
  {
    title: "Stay Hydrated",
    desc: "Drink at least 8 glasses of water a day to keep your body energized and your skin healthy.",
    color: "info",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
    ),
  },
  {
    title: "Move Daily",
    desc: "30 minutes of walking, cycling or any activity you enjoy keeps your heart and lungs strong.",
    color: "success",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13" cy="4" r="2"/><path d="M14.5 21l-1-7-3-2 2-5 3 4 4 1"/><path d="M9 21l1-5-2-4"/></svg>
    ),
  },
  {
    title: "Sleep Well",
    desc: "7–9 hours of quality sleep each night improves immunity, mood and focus.",
    color: "warning",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    ),
  },
  {
    title: "Eat Balanced",
    desc: "Fill half your plate with vegetables and fruits, and limit processed sugar and salt.",
    color: "success",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
    ),
  },
  {
    title: "Breathe Fresh Air",
    desc: "Avoid smoke and polluted areas. Healthy lungs reduce risk of pneumonia and infections.",
    color: "info",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 12c-1.5 0-3 1-3 3.5S5 21 8 21s5-2 5-5v-9a3 3 0 0 0-6 0"/><path d="M17.5 12c1.5 0 3 1 3 3.5S19 21 16 21s-5-2-5-5"/></svg>
    ),
  },
  {
    title: "Manage Stress",
    desc: "Try meditation, journaling or 5 minutes of deep breathing to reset your mind.",
    color: "warning",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    ),
  },
];

const colorMap: Record<string, string> = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  info: "bg-info-soft text-info",
};

const Lifestyle = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="rounded-3xl bg-gradient-hero p-8 lg:p-12 shadow-card">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-card/70 backdrop-blur px-3 py-1 text-xs font-medium text-success">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>
              Lifestyle Tips
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Small habits, big health</h1>
            <p className="text-base lg:text-lg text-muted-foreground">
              Six everyday practices that protect your body, lungs and mind.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {tips.map((tip) => (
            <article key={tip.title} className="rounded-2xl bg-card p-6 shadow-card border border-border/50 hover:shadow-soft transition-shadow">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl mb-4 ${colorMap[tip.color]}`}>
                {tip.icon}
              </div>
              <h3 className="font-bold text-foreground mb-1">{tip.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
            </article>
          ))}
        </div>

        <section className="rounded-2xl bg-card p-6 lg:p-8 shadow-card border border-border/50">
          <h2 className="text-xl font-bold text-foreground mb-4">Daily Healthy Routine</h2>
          <ol className="space-y-3">
            {[
              "Wake up and drink a glass of water.",
              "Stretch or do 10 minutes of light exercise.",
              "Eat a balanced breakfast with protein and fruit.",
              "Take short breaks every hour while working.",
              "Walk for 20–30 minutes during the day.",
              "Wind down 1 hour before bed — no screens.",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Lifestyle;
