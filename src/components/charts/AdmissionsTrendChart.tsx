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

export interface AdmissionsTrendChartProps {
  readonly data: readonly AdmissionsTrendPoint[];
}

function AdmissionsTrendChartComponent({
  data,
}: Readonly<AdmissionsTrendChartProps>) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
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
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="admissions"
            name="Admissions"
            stroke="#0096C7"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="discharges"
            name="Discharges"
            stroke="#06D6A0"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export const AdmissionsTrendChart = memo(AdmissionsTrendChartComponent);
