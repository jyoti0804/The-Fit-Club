import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip as ReTooltip,
} from "recharts";

import { ChartContainer, ChartTooltipContent } from "../../components/ui/chart";


export interface Member {
  id: number;
  name: string;
  email: string;
  plan: string;
  workoutsCompleted: number;
  caloriesBurned: number;
  streakDays: number;
  nextPayment: string;
}

interface StatsProps {
  members?: Member[];
}


const KPI = [
  { label: "Total Members", value: 128, hint: "Active users" },
  { label: "Avg Workouts", value: 14, hint: "Avg per member" },
  { label: "Avg Streak", value: "6 days", hint: "Longest avg streak" },
];

const areaData = [
  { month: "Jun", value: 12 },
  { month: "Jul", value: 18 },
  { month: "Aug", value: 22 },
  { month: "Sep", value: 20 },
  { month: "Oct", value: 24 },
  { month: "Nov", value: 26 },
];

const barData = [
  { name: "Alex", calories: 720 },
  { name: "Jordan", calories: 680 },
  { name: "Riley", calories: 630 },
  { name: "Taylor", calories: 590 },
  { name: "Sam", calories: 550 },
];

const donutData = [
  { name: "Basic", value: 44 },
  { name: "Pro", value: 36 },
  { name: "Elite", value: 20 },
];

const radarData = [
  { subject: "Strength", A: 120, fullMark: 150 },
  { subject: "Endurance", A: 110, fullMark: 150 },
  { subject: "Flexibility", A: 95, fullMark: 150 },
  { subject: "Balance", A: 85, fullMark: 150 },
  { subject: "Speed", A: 100, fullMark: 150 },
];

const heatmapMatrix = [
  [2, 5, 1, 0, 3],
  [4, 6, 3, 2, 5],
  [1, 2, 4, 3, 6],
  [0, 1, 2, 5, 4],
  [3, 4, 5, 6, 2],
];

const progressRings = [
  { label: "Goal Completion", value: 78 },
  { label: "Retention", value: 64 },
  { label: "Activation", value: 89 },
];

const COLORS = ["#f97316", "#fb7185", "#06b6d4", "#84cc16"];

const AnimatedCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    style={{
      filter: "drop-shadow(0 0 16px rgba(255, 115, 0, 0.65))",
      transition: "all 0.3s",
    }}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,115,0,0.55)" }}
    className="bg-gradient-to-br from-[#0d0d0d] to-[#111111] border border-[#1a1a1a] rounded-2xl p-6"
  >
    {children}
  </motion.div>
);

const HeatmapGrid: React.FC<{ matrix: number[][] }> = ({ matrix }) => {
  const flat = matrix.flat();
  const min = Math.min(...flat);
  const max = Math.max(...flat);

  const getColor = (v: number) => {
    const t = (v - min) / Math.max(1, max - min);
    const r = Math.round(255 - t * 100);
    const g = Math.round(100 + t * 155);
    const b = Math.round(200 - t * 180);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <div className="grid grid-cols-5 gap-1">
      {matrix.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            className="h-12 w-12 rounded-lg transition-all hover:scale-105"
            style={{ background: getColor(cell) }}
            title={`Value: ${cell}`}
          />
        ))
      )}
    </div>
  );
};

const ProgressRing: React.FC<{ size?: number; stroke?: number; value: number; label?: string }> = ({
  size = 80,
  stroke = 10,
  value,
  label,
}) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size}>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle r={radius} fill="transparent" stroke="#1f2937" strokeWidth={stroke} />
          <circle
            r={radius}
            fill="transparent"
            stroke="#f97316"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90)"
            style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
          />
        </g>
      </svg>
      <div className="text-sm text-gray-200 font-semibold">{label}</div>
      <div className="text-xs text-gray-400">{value}%</div>
    </div>
  );
};

export const Stats: React.FC<StatsProps> = () => {
  const donutConfig = useMemo(
    () =>
      Object.fromEntries(
        donutData.map((d) => [d.name, { label: d.name, color: COLORS[donutData.indexOf(d) % COLORS.length] }])
      ),
    []
  );

  const areaConfig = { value: { label: "Workouts", color: COLORS[0] } };
  const barConfig = { calories: { label: "Calories", color: COLORS[1] } };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-8 space-y-10">
      
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-center justify-between gap-4"
      >
        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-400 tracking-wide">
            Fitness Dashboard
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Track member progress, engagement, and metrics in real-time
          </p>
        </div>
      </motion.div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {KPI.map((k, i) => (
          <AnimatedCard key={i}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-300">{k.label}</div>
                <div className="text-4xl font-bold text-orange-400 mt-2">{k.value}</div>
                <div className="text-xs text-gray-400 mt-1">{k.hint}</div>
              </div>
              <ProgressRing value={Math.floor(Math.random() * 30) + 50} label="Momentum" />
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6 2xl:col-span-3 2xl:col-span-1 w-100">
          <AnimatedCard>
            <h4 className="text-orange-300 font-semibold text-lg">Monthly Avg Workouts</h4>
            <div className="text-xs text-gray-400">Last 6 months</div>
            <div className="h-52 mt-4">
              <ChartContainer config={areaConfig} className="h-full">
                <ResponsiveContainer>
                  <AreaChart data={areaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <ReTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="value" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </AnimatedCard>

          <AnimatedCard>
            <h4 className="text-orange-300 font-semibold text-lg">Member Fitness Profile</h4>
            <div className="h-48 mt-4">
              <ResponsiveContainer>
                <RadarChart data={radarData} outerRadius={90}>
                  <PolarGrid stroke="#444" />
                  <PolarAngleAxis dataKey="subject" stroke="#9ca3af" />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} />
                  <Radar name="Average" dataKey="A" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedCard>
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          <AnimatedCard>
            <h4 className="text-orange-300 font-semibold text-lg">Plan Distribution</h4>
            <div className="h-52 flex items-center justify-center mt-4">
              <ChartContainer config={donutConfig} className="w-full h-full">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={donutData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={4}>
                      {donutData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <ReTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </AnimatedCard>

          <AnimatedCard>
            <h4 className="text-orange-300 font-semibold text-lg">Engagement Heatmap</h4>
            <div className="mt-4">
              <HeatmapGrid matrix={heatmapMatrix} />
            </div>
          </AnimatedCard>
        </div>

        {/* Right Column */}
        <div className="space-y-6 2xl:col-span-3 2xl:col-span-1 w-100">
          <AnimatedCard>
            <h4 className="text-orange-300 font-semibold text-lg">Top Calorie Burners</h4>
            <div className="h-52 mt-4">
              <ChartContainer config={barConfig} className="h-full">
                <ResponsiveContainer>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <ReTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="calories" radius={[6, 6, 0, 0]}>
                      {barData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </AnimatedCard>

          <AnimatedCard>
            <h4 className="text-orange-300 font-semibold text-lg">Product Metrics</h4>
            <div className="flex items-center justify-around mt-4">
              {progressRings.map((p, i) => (
                <ProgressRing key={i} value={p.value} label={p.label} />
              ))}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
};




