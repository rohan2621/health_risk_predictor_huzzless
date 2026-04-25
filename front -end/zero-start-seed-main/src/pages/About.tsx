import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const About = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Hero */}
        <section className="rounded-3xl bg-gradient-hero p-8 lg:p-12 shadow-card">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-card/70 backdrop-blur px-3 py-1 text-xs font-medium text-primary">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              About this project
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">HealthGuard AI</h1>
            <p className="text-base lg:text-lg text-muted-foreground">
              A simple health-based web application that helps users understand their health in a basic way —
              detecting pneumonia from chest X-ray images and giving general health insights.
            </p>
          </div>
        </section>

        {/* About + Purpose */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-card p-6 lg:p-8 shadow-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-info-soft text-info">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <h2 className="text-xl font-bold text-foreground">About This Project</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This project is a simple health-based web application that helps users understand their health in a basic way.
              It focuses on detecting pneumonia from chest X-ray images and giving general health insights based on user input.
              The system is designed to be easy to use, so anyone can interact with it and get quick results in a clear and simple format.
            </p>
          </div>

          <div className="rounded-2xl bg-card p-6 lg:p-8 shadow-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-soft text-success">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <h2 className="text-xl font-bold text-foreground">Purpose</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The main purpose of this project is to explore how artificial intelligence can be used in a real-world situation.
              It also aims to show how simple systems can provide useful information without being complicated.
              This project is mainly built for learning and practical understanding.
            </p>
          </div>
        </div>

        {/* Features */}
        <section className="rounded-2xl bg-card p-6 lg:p-8 shadow-card border border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
            <h2 className="text-xl font-bold text-foreground">Features</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Pneumonia Detection", desc: "Upload a chest X-ray and get a result." },
              { title: "Health Insights", desc: "Basic health insights based on user data." },
              { title: "Clean Interface", desc: "Easy-to-use, modern dashboard." },
              { title: "Quick Results", desc: "Simple, fast feedback in plain language." },
            ].map((f) => (
              <li key={f.title} className="flex gap-3 items-start rounded-xl bg-muted/40 p-4">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-success text-primary-foreground shrink-0">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Developers */}
        <section className="rounded-2xl bg-card p-6 lg:p-8 shadow-card border border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning-soft text-warning">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h2 className="text-xl font-bold text-foreground">About the Developers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Joel Saru Magar", role: "Full Stack Developer", desc: "Worked on both the frontend and backend, connecting the interface with the system." },
              { name: "Samuyal Dahal", role: "Frontend & UI/UX Designer", desc: "Designed the layout and overall look of the website." },
              { name: "Rohan Timalsina", role: "Data Scientist", desc: "Worked on data handling and building the models used in the project." },
            ].map((d) => (
              <div key={d.name} className="rounded-xl border border-border/50 p-5 bg-muted/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground font-bold mb-3">
                  {d.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <p className="font-semibold text-foreground">{d.name}</p>
                <p className="text-xs text-primary font-medium mb-2">{d.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="rounded-2xl bg-warning-soft border border-warning/30 p-6 lg:p-8">
          <div className="flex gap-4 items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning text-primary-foreground">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">Disclaimer</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                This project is created for educational purposes only. It should not be used for medical advice,
                diagnosis, or treatment. Always consult a professional for health-related concerns.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default About;
