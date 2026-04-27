import { LayoutGrid, List } from "lucide-react";

export type ViewMode = "grid" | "list";

export interface ViewToggleProps {
  readonly mode: ViewMode;
  readonly onChange: (mode: ViewMode) => void;
}

export function ViewToggle({ mode, onChange }: Readonly<ViewToggleProps>) {
  return (
    <div className="inline-flex overflow-hidden rounded-lg bg-white shadow-card">
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={[
          "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition",
          mode === "grid"
            ? "bg-accent text-white"
            : "text-slate-600 hover:bg-slate-100",
        ].join(" ")}
      >
        <LayoutGrid size={16} />
        Grid
      </button>
      <button
        type="button"
        onClick={() => onChange("list")}
        className={[
          "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition",
          mode === "list"
            ? "bg-accent text-white"
            : "text-slate-600 hover:bg-slate-100",
        ].join(" ")}
      >
        <List size={16} />
        List
      </button>
    </div>
  );
}
