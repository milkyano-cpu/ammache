"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

const TYPE_COLORS = ["#111827", "#6b7280", "#d1d5db", "#9ca3af"]

const TYPE_LABELS: Record<string, string> = {
  AMMACHE: "Ammache",
  COLLABORATION: "Collaboration",
  COMMISSION: "Commission",
  OTHER: "Other",
}

export default function DashboardCharts({
  categoryData,
  typeData,
}: {
  categoryData: { name: string; count: number }[]
  typeData: { type: string; count: number }[]
}) {
  const pieData = typeData.map((d) => ({
    name: TYPE_LABELS[d.type] ?? d.type,
    value: d.count,
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* BAR — by category */}
      <div className="border rounded-xl p-5 bg-white space-y-3">
        <p className="text-sm font-semibold text-gray-700">Projects by Category</p>
        {categoryData.length === 0 ? (
          <p className="text-sm text-gray-400 py-8 text-center">No data</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={categoryData}
              layout="vertical"
              margin={{ left: 8, right: 16, top: 4, bottom: 4 }}
            >
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="name"
                width={130}
                tick={{ fontSize: 11 }}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "#f3f4f6" }}
                contentStyle={{ fontSize: 12, borderRadius: 6 }}
              />
              <Bar dataKey="count" name="Projects" fill="#111827" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* DONUT — by type */}
      <div className="border rounded-xl p-5 bg-white space-y-3">
        <p className="text-sm font-semibold text-gray-700">Projects by Type</p>
        {pieData.length === 0 ? (
          <p className="text-sm text-gray-400 py-8 text-center">No data</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={TYPE_COLORS[i % TYPE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  )
}
