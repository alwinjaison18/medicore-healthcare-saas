import { Suspense, lazy, useMemo } from "react";
import { AlertTriangle, CheckCircle2, Clock3, Users } from "lucide-react";

import { KPICard } from "./KPICard";
import { QuickActions } from "./QuickActions";
import { RecentActivity } from "./RecentActivity";
import {
  useAdmissionsTrend,
  useBedOccupancy,
  useDashboardKPIs,
  useRecentActivity,
} from "./useDashboardQueries";

const TrendLineChart = lazy(() =>
  import("../../components/charts/TrendLineChart").then((module) => ({
    default: module.TrendLineChart,
  })),
);
const DonutChart = lazy(() =>
  import("../../components/charts/DonutChart").then((module) => ({
    default: module.DonutChart,
  })),
);

function SkeletonBlock({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <div
      className={["animate-pulse rounded-xl bg-slate-200/70", className].join(
        " ",
      )}
    />
  );
}

function ErrorState({ message }: Readonly<{ message: string }>) {
  return (
    <section className="rounded-2xl bg-danger/10 p-6 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-danger">
        Dashboard error
      </p>
      <h2 className="mt-2 font-display text-3xl text-primary">
        Unable to load dashboard data
      </h2>
      <p className="mt-2 text-sm text-slate-700">{message}</p>
    </section>
  );
}

function EmptyState() {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        Dashboard
      </p>
      <h2 className="mt-2 font-display text-3xl text-primary">
        No operational data yet
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        As data starts flowing, KPI cards and charts will appear here.
      </p>
    </section>
  );
}

export function DashboardPage() {
  const kpisQuery = useDashboardKPIs();
  const trendQuery = useAdmissionsTrend();
  const occupancyQuery = useBedOccupancy();
  const activityQuery = useRecentActivity();

  const kpiIcons = useMemo(
    () => ({
      patients: <Users size={20} />,
      alerts: <AlertTriangle size={20} />,
      waitTime: <Clock3 size={20} />,
      discharges: <CheckCircle2 size={20} />,
    }),
    [],
  );

  const errorMessage =
    (kpisQuery.error as Error | null)?.message ??
    (trendQuery.error as Error | null)?.message ??
    (occupancyQuery.error as Error | null)?.message ??
    (activityQuery.error as Error | null)?.message;

  if (errorMessage) {
    return <ErrorState message={errorMessage} />;
  }

  const hasEmptyData =
    !kpisQuery.isLoading &&
    !trendQuery.isLoading &&
    !occupancyQuery.isLoading &&
    !activityQuery.isLoading &&
    (kpisQuery.data?.length ?? 0) === 0 &&
    (trendQuery.data?.length ?? 0) === 0 &&
    (activityQuery.data?.length ?? 0) === 0;

  if (hasEmptyData) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Dashboard
        </p>
        <h1 className="mt-2 font-display text-4xl text-primary">
          Clinical Operations Command
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Live oversight of patient flow, utilization, and care team activity.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpisQuery.isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonBlock key={index} className="h-36" />
            ))
          : kpisQuery.data?.map((kpi) => (
              <KPICard
                key={kpi.id}
                title={kpi.title}
                value={kpi.value}
                delta={kpi.delta}
                deltaType={kpi.deltaType}
                color={kpi.color}
                icon={kpiIcons[kpi.iconKey]}
              />
            ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl bg-white p-6 shadow-card lg:col-span-2">
          <h2 className="font-display text-2xl text-primary">
            Admissions Trend
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Admissions vs discharges for the latest operational window.
          </p>

          {trendQuery.isLoading ? (
            <SkeletonBlock className="mt-5 h-72" />
          ) : (
            <Suspense fallback={<SkeletonBlock className="mt-5 h-72" />}>
              <div className="mt-5">
                <TrendLineChart data={trendQuery.data ?? []} />
              </div>
            </Suspense>
          )}
        </article>

        <article className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="font-display text-2xl text-primary">Bed Occupancy</h2>
          <p className="mt-1 text-sm text-slate-600">
            Current occupied vs available bed capacity.
          </p>

          {occupancyQuery.isLoading ? (
            <SkeletonBlock className="mt-5 h-72" />
          ) : (
            <Suspense fallback={<SkeletonBlock className="mt-5 h-72" />}>
              <div className="mt-5">
                <DonutChart
                  data={occupancyQuery.data ?? { occupied: 0, available: 100 }}
                />
              </div>
            </Suspense>
          )}
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {activityQuery.isLoading ? (
            <SkeletonBlock className="h-96" />
          ) : (
            <RecentActivity items={activityQuery.data ?? []} />
          )}
        </div>
        <QuickActions />
      </section>
    </div>
  );
}
