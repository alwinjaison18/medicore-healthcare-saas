import { AlertTriangle, FileText, UserPlus } from "lucide-react";
import { memo, type ReactNode } from "react";

interface ActionItem {
  readonly id: string;
  readonly label: string;
  readonly icon: ReactNode;
}

const actions: readonly ActionItem[] = [
  { id: "add-patient", label: "Add Patient", icon: <UserPlus size={18} /> },
  {
    id: "view-critical",
    label: "View Critical Cases",
    icon: <AlertTriangle size={18} />,
  },
  {
    id: "generate-report",
    label: "Generate Report",
    icon: <FileText size={18} />,
  },
];

function QuickActionsComponent() {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-card">
      <h3 className="font-display text-2xl text-primary">Quick Actions</h3>
      <div className="mt-4 grid gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-left text-sm font-medium text-text transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="rounded-lg bg-primary/10 p-2 text-primary">
              {action.icon}
            </span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export const QuickActions = memo(QuickActionsComponent);
