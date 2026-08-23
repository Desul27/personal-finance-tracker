"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type MonthlyChartProps = {
  data: {
    month: string;
    income: number;
    expense: number;
  }[];
};

export default function MonthlyChart({
  data,
}: MonthlyChartProps) {
  return (
    <div className="mt-6 rounded-lg border p-6">
      <h2 className="mb-4 text-lg font-semibold">
        Monthly Overview
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e" //mengatur warna garis untuk data income menjadi hijau
              strokeWidth={2}
               dot={{ r: 4 }}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444" //mengatur warna garis untuk data expense menjadi merah
              strokeWidth={2} //mengatur ketebalan garis untuk data expense menjadi 2
               dot={{ r: 4 }} //mengatur ukuran titik pada garis untuk data expense menjadi 4
            />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}