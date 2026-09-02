import { useRef, useState } from "react";
import {
  Upload,
  Plus,
  Trash2,
  FileSpreadsheet,
  Stethoscope,
} from "lucide-react";

const createEmptyTest = () => ({
  test_name: "",
  result: "",
  unit: "",
  min_reference: "",
  max_reference: "",
});

function LabInput({ onAnalyze, loading }) {
  const [inputMode, setInputMode] = useState("manual");

  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");

  const [tests, setTests] = useState([
    createEmptyTest(),
  ]);

  const [csvFileName, setCsvFileName] = useState("");
  const [csvError, setCsvError] = useState("");

  const fileInputRef = useRef(null);

  const handleTestChange = (index, field, value) => {
    const updatedTests = [...tests];

    updatedTests[index] = {
      ...updatedTests[index],
      [field]: value,
    };

    setTests(updatedTests);
  };

  const addTest = () => {
    setTests([
      ...tests,
      createEmptyTest(),
    ]);
  };

  const removeTest = (index) => {
    if (tests.length === 1) {
      return;
    }

    setTests(
      tests.filter((_, testIndex) => testIndex !== index)
    );
  };

  const parseCsv = (text) => {
    const lines = text
      .split(/\r?\n/)
      .filter((line) => line.trim() !== "");

    if (lines.length < 2) {
      throw new Error(
        "CSV must contain a header and at least one test."
      );
    }

    const headers = lines[0]
      .split(",")
      .map((header) =>
        header.trim().toLowerCase()
      );

    const requiredColumns = [
      "test_name",
      "result",
      "unit",
      "min_reference",
      "max_reference",
    ];

    const missingColumns = requiredColumns.filter(
      (column) => !headers.includes(column)
    );

    if (missingColumns.length > 0) {
      throw new Error(
        `Missing required columns: ${missingColumns.join(", ")}`
      );
    }

    const columnIndex = {};

    headers.forEach((header, index) => {
      columnIndex[header] = index;
    });

    const parsedTests = lines.slice(1).map(
      (line, index) => {
        const values = line
          .split(",")
          .map((value) => value.trim());

        const testName =
          values[columnIndex.test_name];

        const result =
          values[columnIndex.result];

        const unit =
          values[columnIndex.unit];

        const minReference =
          values[columnIndex.min_reference];

        const maxReference =
          values[columnIndex.max_reference];

        if (
          !testName ||
          result === undefined ||
          result === "" ||
          !unit ||
          minReference === undefined ||
          minReference === "" ||
          maxReference === undefined ||
          maxReference === ""
        ) {
          throw new Error(
            `Missing data in row ${index + 2}.`
          );
        }

        if (
          Number.isNaN(Number(result)) ||
          Number.isNaN(Number(minReference)) ||
          Number.isNaN(Number(maxReference))
        ) {
          throw new Error(
            `Invalid numeric value in row ${index + 2}.`
          );
        }

        return {
          test_name: testName,
          result: Number(result),
          unit,
          min_reference: Number(minReference),
          max_reference: Number(maxReference),
        };
      }
    );

    return parsedTests;
  };

  const handleCsvUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setCsvError("");

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setCsvError(
        "Please upload a valid CSV file."
      );

      return;
    }

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
      try {
        const csvText = loadEvent.target.result;

        const parsedTests = parseCsv(csvText);

        setTests(parsedTests);
        setCsvFileName(file.name);
      } catch (error) {
        setCsvError(error.message);
        setCsvFileName("");
      }
    };

    reader.onerror = () => {
      setCsvError(
        "Unable to read the selected file."
      );
    };

    reader.readAsText(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const invalidTest = tests.some(
      (test) =>
        !test.test_name ||
        test.result === "" ||
        !test.unit ||
        test.min_reference === "" ||
        test.max_reference === ""
    );

    if (invalidTest) {
      setCsvError(
        "Please complete all laboratory test fields."
      );

      return;
    }

    const testResults = tests.map((test) => ({
      test_name: test.test_name,
      result: Number(test.result),
      unit: test.unit,
      min_reference: Number(test.min_reference),
      max_reference: Number(test.max_reference),
      reference_range:
        `${test.min_reference}-${test.max_reference}`,
    }));

    onAnalyze({
      patient_age:
        patientAge === ""
          ? null
          : Number(patientAge),

      patient_gender:
        patientGender || null,

      test_results: testResults,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Input Mode */}
      <div className="flex rounded-lg border border-slate-200 p-1">
        <button
          type="button"
          onClick={() =>
            setInputMode("manual")
          }
          className={`flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition ${
            inputMode === "manual"
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Manual Entry
        </button>

        <button
          type="button"
          onClick={() =>
            setInputMode("csv")
          }
          className={`flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition ${
            inputMode === "csv"
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          CSV Upload
        </button>
      </div>

      {/* Patient Information */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Stethoscope
            size={20}
            className="text-blue-600"
          />

          <h2 className="text-lg font-semibold text-slate-800">
            Patient Information
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Age
            </label>

            <input
              type="number"
              min="0"
              max="120"
              value={patientAge}
              onChange={(event) =>
                setPatientAge(event.target.value)
              }
              placeholder="Enter age"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Gender
            </label>

            <select
              value={patientGender}
              onChange={(event) =>
                setPatientGender(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              <option value="">
                Select gender
              </option>

              <option value="male">
                Male
              </option>

              <option value="female">
                Female
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </div>
        </div>
      </section>

      {/* Manual Input */}
      {inputMode === "manual" && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Laboratory Tests
              </h2>

              <p className="text-sm text-slate-500">
                Enter the result and provided reference range.
              </p>
            </div>

            <button
              type="button"
              onClick={addTest}
              className="flex items-center gap-2 rounded-lg border border-blue-200 px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
            >
              <Plus size={18} />
              Add Test
            </button>
          </div>

          <div className="space-y-4">
            {tests.map((test, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-medium text-slate-700">
                    Test {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      removeTest(index)
                    }
                    disabled={tests.length === 1}
                    className="text-slate-400 transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-600">
                      Test Name
                    </label>

                    <input
                      value={test.test_name}
                      onChange={(event) =>
                        handleTestChange(
                          index,
                          "test_name",
                          event.target.value
                        )
                      }
                      placeholder="Hemoglobin"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-600">
                      Result
                    </label>

                    <input
                      type="number"
                      step="any"
                      value={test.result}
                      onChange={(event) =>
                        handleTestChange(
                          index,
                          "result",
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-600">
                      Unit
                    </label>

                    <input
                      value={test.unit}
                      onChange={(event) =>
                        handleTestChange(
                          index,
                          "unit",
                          event.target.value
                        )
                      }
                      placeholder="g/dL"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-600">
                      Minimum
                    </label>

                    <input
                      type="number"
                      step="any"
                      value={test.min_reference}
                      onChange={(event) =>
                        handleTestChange(
                          index,
                          "min_reference",
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-600">
                      Maximum
                    </label>

                    <input
                      type="number"
                      step="any"
                      value={test.max_reference}
                      onChange={(event) =>
                        handleTestChange(
                          index,
                          "max_reference",
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CSV Upload */}
      {inputMode === "csv" && (
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Upload Laboratory Results
            </h2>

            <p className="text-sm text-slate-500">
              Upload a CSV containing your laboratory test results.
            </p>
          </div>

          <div
            onClick={() =>
              fileInputRef.current?.click()
            }
            className="cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-10 text-center transition hover:border-blue-400 hover:bg-blue-50/30"
          >
            <FileSpreadsheet
              size={40}
              className="mx-auto mb-3 text-blue-600"
            />

            <p className="font-medium text-slate-700">
              {csvFileName ||
                "Click to upload a CSV file"}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Required columns: test_name, result,
              unit, min_reference, max_reference
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleCsvUpload}
              className="hidden"
            />
          </div>

          {csvFileName && (
            <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
              Successfully loaded {tests.length} laboratory
              test(s) from {csvFileName}.
            </div>
          )}
        </section>
      )}

      {/* Error */}
      {csvError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {csvError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Upload size={20} />

        {loading
          ? "Analyzing Results..."
          : "Analyze Results"}
      </button>
    </form>
  );
}

export default LabInput;