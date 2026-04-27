import { memo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ReadmissionRatePoint } from "../../services/mockData";

export interface ReadmissionAreaChartProps {
  readonly data: readonly ReadmissionRatePoint[];
}

function ReadmissionAreaChartComponent({
  data,
}: Readonly<ReadmissionAreaChartProps>) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="readmissionFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0096C7" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#0096C7" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
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
            width={34}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
            }}
          />
          <ReferenceLine
            y={15}
            stroke="#EF476F"
            strokeDasharray="4 4"
            label="15% benchmark"
          />
          <Area
            type="monotone"
            dataKey="rate"
            stroke="#0096C7"
            strokeWidth={3}
            fill="url(#readmissionFill)"
            dot={{ r: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export const ReadmissionAreaChart = memo(ReadmissionAreaChartComponent);
