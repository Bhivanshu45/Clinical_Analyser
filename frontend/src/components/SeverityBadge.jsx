import {
  CheckCircle2,
  AlertTriangle,
  CircleAlert,
  HelpCircle,
} from "lucide-react";


const severityConfig = {
  critical: {
    label: "Critical",
    className: "bg-red-100 text-red-700 border-red-200",
    icon: CircleAlert,
  },

  warning: {
    label: "Warning",
    className: "bg-amber-100 text-amber-700 border-amber-200",
    icon: AlertTriangle,
  },

  normal: {
    label: "Normal",
    className: "bg-green-100 text-green-700 border-green-200",
    icon: CheckCircle2,
  },

  unknown: {
    label: "Unknown",
    className: "bg-slate-100 text-slate-600 border-slate-200",
    icon: HelpCircle,
  },
};


function SeverityBadge({ status }) {
  const config =
    severityConfig[status?.toLowerCase()] ||
    severityConfig.unknown;

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      <Icon size={14} />
      {config.label}
    </span>
  );
}

export default SeverityBadge;