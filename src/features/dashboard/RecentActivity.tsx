import { memo } from "react";

import type { RecentActivityItem } from "../../services/mockData";

export interface RecentActivityProps {
  readonly items: readonly RecentActivityItem[];
}

function RecentActivityComponent({ items }: Readonly<RecentActivityProps>) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h3 className="font-display text-2xl text-primary">Recent Activity</h3>
        <p className="mt-3 text-sm text-slate-500">
          No activity available right now.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-card">
      <h3 className="font-display text-2xl text-primary">Recent Activity</h3>
      <div className="mt-4 max-h-80 space-y-3 overflow-y-auto pr-1">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              {item.timestamp} • {item.patientId}
            </p>
            <p className="mt-1 text-sm font-medium text-text">
              {item.eventType}
            </p>
            <p className="mt-1 text-xs text-slate-500">{item.staffName}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export const RecentActivity = memo(RecentActivityComponent);
