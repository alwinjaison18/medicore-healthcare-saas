import type { AnalyticsDateRange } from "../../services/mockData";

export interface DateRangePickerProps {
  readonly value: AnalyticsDateRange;
  readonly onChange: (value: AnalyticsDateRange) => void;
}

const options: ReadonlyArray<{ label: string; value: AnalyticsDateRange }> = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
];

export function DateRangePicker({
  value,
  onChange,
}: Readonly<DateRangePickerProps>) {
  return (
    <div className="inline-flex rounded-xl bg-white p-1 shadow-card">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={[
            "rounded-lg px-3 py-2 text-sm font-medium transition",
            value === option.value
              ? "bg-primary text-white"
              : "text-slate-600 hover:bg-slate-100",
          ].join(" ")}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
