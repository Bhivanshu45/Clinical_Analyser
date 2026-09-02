import { Activity } from "lucide-react";

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
          <Activity size={22} />
        </div>

        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Clinical Lab Analyzer
          </h1>

          <p className="text-sm text-slate-500">
            AI-powered laboratory result analysis
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;