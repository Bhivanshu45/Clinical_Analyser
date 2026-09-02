import { Trash2 } from "lucide-react";

function LabRow({
  index,
  lab,
  onChange,
  onRemove,
  canRemove,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    onChange(index, {
      ...lab,
      [name]: value,
    });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">
          Test {index + 1}
        </h3>

        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="rounded-md p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            title="Remove test"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            Test Name
          </label>

          <input
            type="text"
            name="test_name"
            value={lab.test_name}
            onChange={handleChange}
            placeholder="e.g. Hemoglobin"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            Result
          </label>

          <input
            type="number"
            name="result"
            value={lab.result}
            onChange={handleChange}
            placeholder="Value"
            step="any"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            Unit
          </label>

          <input
            type="text"
            name="unit"
            value={lab.unit}
            onChange={handleChange}
            placeholder="e.g. g/dL"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            Minimum
          </label>

          <input
            type="number"
            name="min_reference"
            value={lab.min_reference}
            onChange={handleChange}
            placeholder="Min range"
            step="any"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            Maximum
          </label>

          <input
            type="number"
            name="max_reference"
            value={lab.max_reference}
            onChange={handleChange}
            placeholder="Max range"
            step="any"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
    </div>
  );
}

export default LabRow;