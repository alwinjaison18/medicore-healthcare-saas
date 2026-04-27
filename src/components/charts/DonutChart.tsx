import { memo, useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import type { BedOccupancy } from "../../services/mockData";

export interface DonutChartProps {
  readonly data: BedOccupancy;
}

function DonutChartComponent({ data }: Readonly<DonutChartProps>) {
  const series = useMemo(
    () => [
      { name: "Occupied", value: data.occupied, color: "#0096C7" },
      { name: "Available", value: data.available, color: "#E2E8F0" },
    ],
    [data.available, data.occupied],
  );

  return (
    <div className="relative h-72 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={series}
            dataKey="value"
            innerRadius={68}
            outerRadius={100}
            paddingAngle={2}
            strokeWidth={0}
          >
            {series.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
          Occupied
        </p>
        <p className="font-display text-4xl text-primary">{data.occupied}%</p>
      </div>
    </div>
  );
}

export const DonutChart = memo(DonutChartComponent);
