import {
  BrainCircuit,
  ClipboardList,
  Lightbulb,
  AlertCircle,
} from "lucide-react";

import SeverityBadge from "./SeverityBadge";


function ResultsDisplay({ analysis }) {
  if (!analysis) {
    return null;
  }

  return (
    <section className="mt-8 space-y-6">
      {/* Summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
            <ClipboardList size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Analysis Summary
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {analysis.summary}
            </p>
          </div>
        </div>
      </div>


      {/* Results */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Laboratory Results
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Results are ordered by severity.
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {analysis.processed_results.map(
            (result, index) => (
              <div
                key={`${result.test_name}-${index}`}
                className="p-6"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-semibold text-slate-900">
                        {result.test_name}
                      </h3>

                      <SeverityBadge
                        status={result.status}
                      />
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <p className="text-slate-500">
                        Result:{" "}
                        <span className="font-semibold text-slate-800">
                          {result.result} {result.unit}
                        </span>
                      </p>

                      {result.reference_range && (
                        <p className="text-slate-500">
                          Reference range:{" "}
                          <span className="font-medium text-slate-700">
                            {result.reference_range}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>


                {/* AI Explanation */}
                {result.explanation && (
                  <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex gap-3">
                      <BrainCircuit
                        size={19}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <div>
                        <p className="text-sm font-semibold text-blue-900">
                          AI Explanation
                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-700">
                          {result.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>


      {/* Recommendations */}
      {analysis.recommendations?.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex gap-3">
            <Lightbulb
              size={21}
              className="mt-0.5 shrink-0 text-amber-600"
            />

            <div>
              <h2 className="font-semibold text-amber-900">
                Suggested Next Steps
              </h2>

              <ul className="mt-3 space-y-2">
                {analysis.recommendations.map(
                  (recommendation, index) => (
                    <li
                      key={index}
                      className="text-sm leading-6 text-amber-900"
                    >
                      • {recommendation}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}


      {/* Disclaimer */}
      {analysis.disclaimer && (
        <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-100 p-4">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0 text-slate-500"
          />

          <p className="text-xs leading-5 text-slate-600">
            {analysis.disclaimer}
          </p>
        </div>
      )}
    </section>
  );
}

export default ResultsDisplay;