import type { ReactNode } from "react";

export interface ChartCardProps {
  readonly title: string;
  readonly subtitle: string;
  readonly children: ReactNode;
  readonly actions?: ReactNode;
  readonly legend?: ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  children,
  actions,
  legend,
}: Readonly<ChartCardProps>) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-primary">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>
        {actions}
      </div>

      <div className="mt-4">{children}</div>
      {legend ? <div className="mt-3">{legend}</div> : null}
    </section>
  );
}
