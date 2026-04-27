import { memo, useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { DiagnosisDistributionItem } from "../../services/mockData";

export interface DiagnosisDonutChartProps {
  readonly data: readonly DiagnosisDistributionItem[];
  readonly activeDiagnosis: string | null;
  readonly onSelectDiagnosis: (diagnosis: string | null) => void;
}

function DiagnosisDonutChartComponent({
  data,
  activeDiagnosis,
  onSelectDiagnosis,
}: Readonly<DiagnosisDonutChartProps>) {
  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0),
    [data],
  );

  return (
    <div className="w-full">
      <div className="h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={96}
              paddingAngle={2}
              onClick={(entry) => {
                const next =
                  entry.name === activeDiagnosis ? null : String(entry.name);
                onSelectDiagnosis(next);
              }}
            >
              {data.map((entry) => {
                const isActive =
                  !activeDiagnosis || activeDiagnosis === entry.name;

                return (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    fillOpacity={isActive ? 1 : 0.35}
                    stroke={activeDiagnosis === entry.name ? "#0A2540" : "none"}
                    strokeWidth={activeDiagnosis === entry.name ? 2 : 0}
                  />
                );
              })}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          Total Cases
        </p>
        <p className="font-display text-3xl text-primary">{total}</p>
      </div>
    </div>
  );
}

export const DiagnosisDonutChart = memo(DiagnosisDonutChartComponent);
