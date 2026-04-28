import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';

interface ChartProps {
  data: any[];
}

export function AccuracyChart({ data }: ChartProps) {
  // Translate the backend "Group" and "Selected_Rate" structure to generic chart structure
  const formattedData = data.map((d) => ({
    name: d.Group,
    accuracy: d.Selected_Rate,
    color: d.Selected_Rate < 50 ? '#e11d48' : '#4f46e5' // Red if low selection rate
  }));

  if (!formattedData || formattedData.length === 0) return <div className="text-slate-400 text-xs">No data</div>;

  return (
    <div className="w-full h-64 flex pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }}
            domain={[0, 100]}
            ticks={[50, 75, 100]}
          />
          <Tooltip 
            cursor={{ fill: '#f1f5f9' }}
            contentStyle={{ 
              backgroundColor: '#1e293b', 
              border: 'none', 
              borderRadius: '6px',
              fontSize: '11px',
              color: '#f8fafc',
              padding: '8px 12px'
            }}
          />
          <Bar dataKey="accuracy" radius={[2, 2, 0, 0]} barSize={40}>
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.15} stroke={entry.color} strokeWidth={2} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Keep the old DistributionChart placeholder for aesthetics if no complex area tracking is returned from backend yet.
const defaultDistributionData = [
  { x: 0, actual: 18, ideal: 15 },
  { x: 20, actual: 18, ideal: 15 },
  { x: 40, actual: 8, ideal: 10 },
  { x: 60, actual: 12, ideal: 12 },
  { x: 80, actual: 16, ideal: 15 },
  { x: 100, actual: 18, ideal: 18 },
];

export function DistributionChart() {
  return (
    <div className="w-full h-64 flex pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={defaultDistributionData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis hide />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e2e8f0', 
              borderRadius: '6px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="ideal" 
            stroke="#94a3b8" 
            strokeDasharray="4 4" 
            fill="transparent" 
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="actual" 
            stroke="#0891b2" 
            fill="#0891b2" 
            fillOpacity={0.05}
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
