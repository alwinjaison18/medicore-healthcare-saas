import { memo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { WardOccupancyItem } from "../../services/mockData";

export interface WardOccupancyChartProps {
  readonly data: readonly WardOccupancyItem[];
}

function occupancyColor(value: number): string {
  if (value < 70) {
    return "#06D6A0";
  }

  if (value <= 85) {
    return "#FFB703";
  }

  return "#EF476F";
}

function WardOccupancyChartComponent({
  data,
}: Readonly<WardOccupancyChartProps>) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
          <XAxis
            dataKey="ward"
            stroke="#64748B"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#64748B"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={32}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar
            dataKey="occupied"
            name="Occupied"
            stackId="beds"
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry) => (
              <Cell key={entry.ward} fill={occupancyColor(entry.occupied)} />
            ))}
          </Bar>
          <Bar
            dataKey="available"
            name="Available"
            stackId="beds"
            fill="#CBD5E1"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export const WardOccupancyChart = memo(WardOccupancyChartComponent);
