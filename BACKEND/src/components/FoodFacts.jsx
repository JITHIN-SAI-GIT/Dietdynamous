import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Lightbulb, AlertCircle } from "lucide-react";
import { foodFacts } from "../data/mockData";

export default function FoodFacts() {
  const [activeTab, setActiveTab] = useState("all");
  const location = useLocation();

  // Optional safety: if someone hits this route without layout/auth
  if (location.pathname.startsWith("/dashboard") && !foodFacts) {
    return <Navigate to="/dashboard" replace />;
  }

  const filteredFacts =
    activeTab === "all"
      ? foodFacts
      : activeTab === "myths"
      ? foodFacts.filter((f) => f.isMythBuster)
      : foodFacts.filter((f) => !f.isMythBuster);

  return (
    <div className="w-full animate-fade-in">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6 animate-fade-in-up delay-100">
        <Lightbulb className="w-8 h-8 text-green-600" />
        <h2 className="text-3xl font-bold text-gray-900">
          Food Facts & Myth Buster
        </h2>
      </div>

      {/* TABS */}
      <div className="bg-white rounded-lg shadow-lg p-1 mb-6 inline-flex border-2 border-gray-200 animate-fade-in-up delay-200">
        {["all", "myths", "facts"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold rounded transition-all ${
              activeTab === tab
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab === "all"
              ? "All"
              : tab === "myths"
              ? "Myth Busters"
              : "Nutrition Facts"}
          </button>
        ))}
      </div>

      {/* FACT CARDS */}
      <div className="space-y-4 animate-fade-in-up delay-300">
        {filteredFacts.map((fact, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-md overflow-hidden border-l-4 transition-all hover:shadow-lg ${
              fact.isMythBuster
                ? "border-l-red-500 bg-red-50"
                : "border-l-green-500 bg-green-50"
            }`}
          >
            <div className="p-6">
              <div className="flex items-start gap-3 mb-3">
                {fact.isMythBuster ? (
                  <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
                ) : (
                  <Lightbulb className="w-6 h-6 text-green-600 mt-1" />
                )}

                <h3
                  className={`text-lg font-bold ${
                    fact.isMythBuster
                      ? "text-red-900"
                      : "text-green-900"
                  }`}
                >
                  {fact.title}
                </h3>
              </div>

              <p
                className={`leading-relaxed ${
                  fact.isMythBuster
                    ? "text-red-900"
                    : "text-green-900"
                }`}
              >
                {fact.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK TIPS */}
      <div className="mt-8 bg-white rounded-lg shadow-lg border-2 border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Quick Nutrition Tips
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            ["🥗", "Eat Whole Foods", "Choose natural foods over processed ones"],
            ["⚖️", "Balance is Key", "Include proteins, carbs & healthy fats"],
            ["💧", "Stay Hydrated", "Drink water throughout the day"],
            ["😴", "Quality Sleep", "7–9 hours helps regulate hunger"],
            ["🏃", "Stay Active", "Exercise improves diet results"],
            ["📊", "Track Progress", "Consistency beats perfection"],
          ].map(([icon, title, desc], i) => (
            <div key={i} className="flex gap-3">
              <span className="text-2xl">{icon}</span>
              <div>
                <h4 className="font-semibold text-gray-900">{title}</h4>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
