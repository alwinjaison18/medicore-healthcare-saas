import { memo, type ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import type {
  DashboardColor,
  DashboardDeltaType,
} from "../../services/mockData";

export interface KPICardProps {
  readonly title: string;
  readonly value: number;
  readonly delta: number;
  readonly deltaType: DashboardDeltaType;
  readonly icon: ReactNode;
  readonly color: DashboardColor;
}

const colorClasses: Record<DashboardColor, string> = {
  teal: "bg-accent/15 text-accent",
  green: "bg-success/15 text-success",
  amber: "bg-warning/20 text-warning",
  red: "bg-danger/15 text-danger",
};

const deltaClasses: Record<DashboardDeltaType, string> = {
  positive: "text-success",
  negative: "text-danger",
  neutral: "text-slate-500",
};

function KPICardComponent({
  title,
  value,
  delta,
  deltaType,
  icon,
  color,
}: Readonly<KPICardProps>) {
  const DeltaIcon =
    deltaType === "positive"
      ? ArrowUpRight
      : deltaType === "negative"
        ? ArrowDownRight
        : Minus;
  const deltaSign = delta > 0 ? "+" : "";

  return (
    <article className="rounded-2xl bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {title}
          </p>
          <p className="mt-3 font-display text-4xl leading-none text-primary">
            {value}
          </p>
        </div>
        <div className={["rounded-xl p-3", colorClasses[color]].join(" ")}>
          {icon}
        </div>
      </div>

      <div
        className={[
          "mt-4 inline-flex items-center gap-1 text-sm font-semibold",
          deltaClasses[deltaType],
        ].join(" ")}
      >
        <DeltaIcon size={16} />
        <span>
          {deltaSign}
          {delta}%
        </span>
      </div>
    </article>
  );
}

export const KPICard = memo(KPICardComponent);
