import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function About() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* HERO */}
        <section className="rounded-3xl p-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-3">
            HealthGuard AI
          </h1>
          <p className="text-white/80 max-w-2xl">
            Smart AI system for predicting heart disease risk and detecting pneumonia from X-rays instantly.
          </p>

          {/* STATS */}
          <div className="flex gap-6 mt-6">
            <div>
              <p className="text-2xl font-bold">84%</p>
              <p className="text-xs text-white/70">Heart Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold">0.87</p>
              <p className="text-xs text-white/70">AUC Score</p>
            </div>
            <div>
              <p className="text-2xl font-bold">~73%</p>
              <p className="text-xs text-white/70">X-ray Accuracy</p>
            </div>
          </div>
        </section>

        {/* PROBLEM + SOLUTION */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-red-50 border border-red-200">
            <h2 className="text-lg font-bold text-red-600 mb-2">🚨 Problem</h2>
            <p className="text-sm text-gray-600">
              Early detection of heart disease and pneumonia requires medical expertise and time,
              which many people lack access to.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-green-50 border border-green-200">
            <h2 className="text-lg font-bold text-green-600 mb-2">💡 Solution</h2>
            <p className="text-sm text-gray-600">
              HealthGuard AI provides instant AI-powered predictions using medical data and X-rays.
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section className="grid md:grid-cols-3 gap-4">
          {[
            "❤️ Heart Risk Prediction",
            "🫁 Pneumonia Detection",
            "⚡ Real-time Results",
            "📊 Confidence Scores",
            "🧠 AI Powered",
            "🌐 Easy to Use"
          ].map((f, i) => (
            <div key={i} className="p-4 rounded-xl bg-white shadow border text-sm font-medium">
              {f}
            </div>
          ))}
        </section>

        {/* MODELS & PERFORMANCE */}
        <section className="grid md:grid-cols-2 gap-6">

          {/* HEART MODEL */}
          <div className="p-6 rounded-2xl bg-white shadow border">
            <h3 className="font-bold mb-2">❤️ Heart Disease Model</h3>
            <p className="text-sm text-gray-500 mb-4">
              XGBoost model trained on clinical data
            </p>

            <div className="space-y-3 text-sm">

              {/* Accuracy */}
              <div>
                <p className="flex justify-between">
                  <span>Accuracy</span>
                  <span>84%</span>
                </p>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-blue-500 rounded w-[84%]"></div>
                </div>
              </div>

              {/* Precision */}
              <div>
                <p className="flex justify-between">
                  <span>Precision</span>
                  <span>83%</span>
                </p>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-green-500 rounded w-[83%]"></div>
                </div>
              </div>

              {/* Recall */}
              <div>
                <p className="flex justify-between">
                  <span>Recall</span>
                  <span>82%</span>
                </p>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-purple-500 rounded w-[82%]"></div>
                </div>
              </div>

              {/* AUC */}
              <div>
                <p className="flex justify-between">
                  <span>AUC</span>
                  <span>0.87</span>
                </p>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-pink-500 rounded w-[87%]"></div>
                </div>
              </div>

            </div>
          </div>

          {/* XRAY MODEL */}
          <div className="p-6 rounded-2xl bg-white shadow border">
            <h3 className="font-bold mb-2">🫁 X-ray Model</h3>
            <p className="text-sm text-gray-500 mb-4">
              CNN model for pneumonia detection
            </p>

            <div className="space-y-3 text-sm">

              {/* Accuracy */}
              <div>
                <p className="flex justify-between">
                  <span>Accuracy</span>
                  <span>73%</span>
                </p>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-blue-500 rounded w-[73%]"></div>
                </div>
              </div>

              {/* Precision */}
              <div>
                <p className="flex justify-between">
                  <span>Precision</span>
                  <span>90%</span>
                </p>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-green-500 rounded w-[90%]"></div>
                </div>
              </div>

              {/* Recall */}
              <div>
                <p className="flex justify-between">
                  <span>Recall</span>
                  <span>90%</span>
                </p>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-purple-500 rounded w-[90%]"></div>
                </div>
              </div>

              {/* F1 */}
              <div>
                <p className="flex justify-between">
                  <span>F1 Score</span>
                  <span>0.90</span>
                </p>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-pink-500 rounded w-[90%]"></div>
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* HOW IT WORKS (UPGRADED) */}
<section className="p-6 rounded-2xl bg-white shadow border">
  <h2 className="font-bold text-lg mb-6">⚙️ How it works</h2>

  <div className="grid md:grid-cols-4 gap-6">

    {/* STEP 1 */}
    <div className="p-4 rounded-xl bg-gray-50 border">
      <div className="text-2xl mb-2">📥</div>
      <h3 className="font-semibold text-sm mb-1">Input Data</h3>
      <p className="text-xs text-gray-500">
        User enters health data or uploads an X-ray image.
      </p>
    </div>

    {/* STEP 2 */}
    <div className="p-4 rounded-xl bg-gray-50 border">
      <div className="text-2xl mb-2">🧠</div>
      <h3 className="font-semibold text-sm mb-1">AI Processing</h3>
      <p className="text-xs text-gray-500">
        Data is cleaned, normalized, and fed into trained AI models.
      </p>
    </div>

    {/* STEP 3 */}
    <div className="p-4 rounded-xl bg-gray-50 border">
      <div className="text-2xl mb-2">🔍</div>
      <h3 className="font-semibold text-sm mb-1">Prediction</h3>
      <p className="text-xs text-gray-500">
        Model analyzes patterns to detect risk or disease probability.
      </p>
    </div>

    {/* STEP 4 */}
    <div className="p-4 rounded-xl bg-gray-50 border">
      <div className="text-2xl mb-2">📊</div>
      <h3 className="font-semibold text-sm mb-1">Result Output</h3>
      <p className="text-xs text-gray-500">
        System displays prediction with confidence score instantly.
      </p>
    </div>

  </div>
</section>

        {/* DISCLAIMER */}
        <section className="p-5 rounded-xl bg-yellow-50 border border-yellow-300">
          <p className="text-sm text-gray-700">
            ⚠️ This is not medical advice. Always consult a doctor.
          </p>
        </section>
        {/* TEAM */}
<section className="p-6 rounded-2xl bg-white shadow border">
  <h2 className="text-lg font-bold mb-4">🚀 Built by Group Huzzless</h2>

  <p className="text-sm text-gray-500 mb-6">
    A team passionate about building AI solutions for real-world healthcare problems.
  </p>

  <div className="grid md:grid-cols-3 gap-4">

    {/* MEMBER */}
    <div className="p-4 rounded-xl bg-gray-50 border text-center">
      <p className="font-semibold text-gray-800">Rohan Timalsina</p>
      <p className="text-xs text-gray-500 mt-1">Team Member</p>
    </div>

    {/* MEMBER */}
    <div className="p-4 rounded-xl bg-gray-50 border text-center">
      <p className="font-semibold text-gray-800">Joel Saru Magar</p>
      <p className="text-xs text-gray-500 mt-1">Team Member</p>
    </div>

    {/* MEMBER */}
    <div className="p-4 rounded-xl bg-gray-50 border text-center">
      <p className="font-semibold text-gray-800">Samyul Dahal</p>
      <p className="text-xs text-gray-500 mt-1">Team Member</p>
    </div>

  </div>
</section>

      </div>
    </DashboardLayout>
  );
}