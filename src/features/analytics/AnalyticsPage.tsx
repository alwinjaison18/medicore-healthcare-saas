import { Download, Filter } from "lucide-react";
import { Suspense, lazy, useMemo, useState } from "react";

import { ChartCard } from "../../components/charts/ChartCard";
import type { AnalyticsDateRange } from "../../services/mockData";
import { DateRangePicker } from "./DateRangePicker";
import { useAnalyticsData } from "./useAnalyticsData";

const AdmissionsTrendChart = lazy(() =>
  import("../../components/charts/AdmissionsTrendChart").then((module) => ({
    default: module.AdmissionsTrendChart,
  })),
);
const DiagnosisDonutChart = lazy(() =>
  import("../../components/charts/DiagnosisDonutChart").then((module) => ({
    default: module.DiagnosisDonutChart,
  })),
);
const WardOccupancyChart = lazy(() =>
  import("../../components/charts/WardOccupancyChart").then((module) => ({
    default: module.WardOccupancyChart,
  })),
);
const ReadmissionAreaChart = lazy(() =>
  import("../../components/charts/ReadmissionAreaChart").then((module) => ({
    default: module.ReadmissionAreaChart,
  })),
);
const StaffRatioGauge = lazy(() =>
  import("../../components/charts/StaffRatioGauge").then((module) => ({
    default: module.StaffRatioGauge,
  })),
);

function SkeletonCard() {
  return (
    <div className="h-[26rem] animate-pulse rounded-2xl bg-slate-200/70" />
  );
}

function AnalyticsErrorState({ message }: Readonly<{ message: string }>) {
  return (
    <section className="rounded-2xl bg-danger/10 p-6 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-danger">
        Analytics error
      </p>
      <h2 className="mt-2 font-display text-3xl text-primary">
        Unable to load analytics data
      </h2>
      <p className="mt-2 text-sm text-slate-700">{message}</p>
    </section>
  );
}

function exportAction() {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200"
    >
      <Download size={14} />
      Export
    </button>
  );
}

export function AnalyticsPage() {
  const [range, setRange] = useState<AnalyticsDateRange>("30d");
  const [activeDiagnosis, setActiveDiagnosis] = useState<string | null>(null);
  const analyticsQuery = useAnalyticsData(range);

  const diagnosisLegend = useMemo(() => {
    if (!analyticsQuery.data) {
      return null;
    }

    return (
      <div className="flex flex-wrap gap-2">
        {analyticsQuery.data.diagnosisDistribution.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() =>
              setActiveDiagnosis((current) =>
                current === item.name ? null : item.name,
              )
            }
            className={[
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition",
              activeDiagnosis === item.name || !activeDiagnosis
                ? "bg-slate-100 text-slate-700"
                : "bg-slate-50 text-slate-400",
            ].join(" ")}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </button>
        ))}
      </div>
    );
  }, [activeDiagnosis, analyticsQuery.data]);

  const admissionsLegend = (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
        <span className="h-2 w-2 rounded-full bg-accent" /> Admissions
      </span>
      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
        <span className="h-2 w-2 rounded-full bg-success" /> Discharges
      </span>
    </div>
  );

  const wardLegend = (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
        <span className="h-2 w-2 rounded-full bg-success" /> Below 70%
      </span>
      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
        <span className="h-2 w-2 rounded-full bg-warning" /> 70-85%
      </span>
      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
        <span className="h-2 w-2 rounded-full bg-danger" /> Above 85%
      </span>
    </div>
  );

  const readmissionLegend = (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
        <span className="h-2 w-2 rounded-full bg-accent" /> Readmission Rate
      </span>
      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
        <span className="h-2 w-2 rounded-full bg-danger" /> 15% Benchmark
      </span>
    </div>
  );

  const staffLegend = (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
        Gauge reflects current staffing burden against recommended baseline.
      </span>
    </div>
  );

  if (analyticsQuery.error) {
    return (
      <AnalyticsErrorState message={(analyticsQuery.error as Error).message} />
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-highlight">
            Analytics
          </p>
          <h1 className="mt-2 font-display text-4xl text-primary">
            Clinical Intelligence Hub
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Operational patterns, capacity pressure, and quality metrics in one
            view.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DateRangePicker value={range} onChange={setRange} />
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white"
          >
            <Filter size={15} />
            Export Report
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {analyticsQuery.isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          <>
            <ChartCard
              title="Admissions Trend"
              subtitle="Admissions and discharges over selected range"
              actions={exportAction()}
              legend={admissionsLegend}
            >
              <Suspense fallback={<SkeletonCard />}>
                <AdmissionsTrendChart
                  data={analyticsQuery.data?.admissionsTrend ?? []}
                />
              </Suspense>
            </ChartCard>

            <ChartCard
              title="Diagnosis Distribution"
              subtitle={
                activeDiagnosis
                  ? `Focused on ${activeDiagnosis}`
                  : "Top diagnosis categories"
              }
              actions={exportAction()}
              legend={diagnosisLegend}
            >
              <Suspense fallback={<SkeletonCard />}>
                <DiagnosisDonutChart
                  data={analyticsQuery.data?.diagnosisDistribution ?? []}
                  activeDiagnosis={activeDiagnosis}
                  onSelectDiagnosis={setActiveDiagnosis}
                />
              </Suspense>
            </ChartCard>

            <ChartCard
              title="Bed Occupancy by Ward"
              subtitle="Occupied vs available capacity by ward"
              actions={exportAction()}
              legend={wardLegend}
            >
              <Suspense fallback={<SkeletonCard />}>
                <WardOccupancyChart
                  data={analyticsQuery.data?.wardOccupancy ?? []}
                />
              </Suspense>
            </ChartCard>

            <ChartCard
              title="Readmission Rate"
              subtitle="12-month trend with 15% benchmark"
              actions={exportAction()}
              legend={readmissionLegend}
            >
              <Suspense fallback={<SkeletonCard />}>
                <ReadmissionAreaChart
                  data={analyticsQuery.data?.readmissionRate ?? []}
                />
              </Suspense>
            </ChartCard>

            <div className="xl:col-span-2">
              <ChartCard
                title="Staff-to-Patient Ratio"
                subtitle="Current ratio compared with recommended baseline"
                actions={exportAction()}
                legend={staffLegend}
              >
                <Suspense fallback={<SkeletonCard />}>
                  <StaffRatioGauge
                    ratio={
                      analyticsQuery.data?.staffRatio ?? {
                        current: 0,
                        recommended: 1,
                      }
                    }
                  />
                </Suspense>
              </ChartCard>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
