import { memo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { AdmissionsTrendPoint } from "../../services/mockData";

export interface TrendLineChartProps {
  readonly data: readonly AdmissionsTrendPoint[];
}

function TrendLineChartComponent({ data }: Readonly<TrendLineChartProps>) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis
            dataKey="date"
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
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Line
            type="monotone"
            dataKey="admissions"
            stroke="#0096C7"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5 }}
            name="Admissions"
          />
          <Line
            type="monotone"
            dataKey="discharges"
            stroke="#06D6A0"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5 }}
            name="Discharges"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export const TrendLineChart = memo(TrendLineChartComponent);
