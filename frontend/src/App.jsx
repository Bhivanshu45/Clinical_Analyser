import { useState } from "react";

import Header from "./components/Header";
import LabInput from "./components/LabInput";
import ResultsDisplay from "./components/ResultsDisplay";

import { analyzeLabs } from "./api/labApi";


function App() {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const handleAnalyze = async (payload) => {
    setIsLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await analyzeLabs(payload);

      setAnalysis(response);
    } catch (err) {
      console.error("Analysis failed:", err);

      const message =
        err.response?.data?.detail ||
        "Unable to analyze the laboratory results. Please check your data and try again.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Analyze Clinical Laboratory Results
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Submit laboratory values with their reference ranges.
            Results are classified by severity and explained using AI.
          </p>
        </div>


        <LabInput
          onAnalyze={handleAnalyze}
          loading={isLoading}
        />


        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}


        <ResultsDisplay analysis={analysis} />


        {!analysis && !error && (
          <p className="mx-auto mt-6 max-w-4xl text-center text-xs leading-5 text-slate-400">
            This tool is for educational purposes only and does not
            provide medical diagnosis or replace professional medical
            advice.
          </p>
        )}
      </main>
    </div>
  );
}

export default App;