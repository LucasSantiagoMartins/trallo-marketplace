import { SalesPerformance } from "@/dtos/sales-summary.dto";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface PerformanceCardProps {
  data?: {
    weekly: SalesPerformance[];
    monthly: SalesPerformance[];
  };
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ data }) => {
  const [period, setPeriod] = useState<"semana" | "mes">("semana");

  const chartData = React.useMemo(() => {
    if (!data) return [];

    if (period === "semana") {
      return data.weekly.map((item) => ({
        name: item.day,
        valor: item.value,
      }));
    }

    return data.monthly.map((item) => ({
      name: item.week,
      valor: item.value,
    }));
  }, [data, period]);

  return (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 rounded-[2.5rem] p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-black tracking-tight dark:text-white">
            Desempenho
          </h3>
          <p className="text-xs text-gray-400 font-medium">
            Fluxo de caixa da {period}
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-900 p-1 rounded-xl flex gap-1">
          <button
            onClick={() => setPeriod("semana")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              period === "semana"
                ? "bg-white dark:bg-gray-700 shadow-sm text-primary"
                : "text-gray-500"
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setPeriod("mes")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              period === "mes"
                ? "bg-white dark:bg-gray-700 shadow-sm text-primary"
                : "text-gray-500"
            }`}
          >
            Mês
          </button>
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#88888820"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#888" }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ color: "#7C3AED", fontWeight: "bold" }}
            />
            <Area
              type="monotone"
              dataKey="valor"
              stroke="#7C3AED"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceCard;
