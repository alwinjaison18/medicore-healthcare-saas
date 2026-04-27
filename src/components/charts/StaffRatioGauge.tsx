import { memo, useMemo } from "react";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

import type { StaffRatio } from "../../services/mockData";

export interface StaffRatioGaugeProps {
  readonly ratio: StaffRatio;
}

function StaffRatioGaugeComponent({ ratio }: Readonly<StaffRatioGaugeProps>) {
  const compliance = useMemo(() => {
    const value = Math.min(
      100,
      Math.round((ratio.recommended / ratio.current) * 100),
    );
    return Number.isFinite(value) ? value : 0;
  }, [ratio.current, ratio.recommended]);

  const color =
    compliance >= 100 ? "#06D6A0" : compliance >= 85 ? "#FFB703" : "#EF476F";

  return (
    <div className="w-full">
      <div className="h-56 w-full sm:h-64">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="62%"
            innerRadius="60%"
            outerRadius="85%"
            barSize={16}
            data={[{ name: "ratio", value: compliance }]}
            startAngle={210}
            endAngle={-30}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              dataKey="value"
              cornerRadius={8}
              fill={color}
              background={{ fill: "#E2E8F0" }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <div className="-mt-1 text-center sm:-mt-2">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          Current Ratio
        </p>
        <p className="font-display text-3xl text-primary">
          1:{ratio.current.toFixed(1)}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Recommended 1:{ratio.recommended.toFixed(1)}
        </p>
      </div>
    </div>
  );
}

export const StaffRatioGauge = memo(StaffRatioGaugeComponent);
