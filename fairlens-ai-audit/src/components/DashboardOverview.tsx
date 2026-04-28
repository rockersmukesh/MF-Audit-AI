import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Target, 
  ShieldCheck, 
  AlertCircle, 
  FileText,
  Calendar,
  Download,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { cn } from '../lib/utils';

const trendData = [
  { name: 'Jan', production: 30, challenger: 25 },
  { name: 'Feb', production: 40, challenger: 35 },
  { name: 'Mar', production: 35, challenger: 45 },
  { name: 'Apr', production: 50, challenger: 40 },
  { name: 'May', production: 70, challenger: 60 },
  { name: 'Jun', production: 65, challenger: 55 },
];

export function DashboardOverview() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-slate-500 text-sm mt-1">Real-time metrics across all monitored AI models.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-all">
            <Calendar className="w-4 h-4" /> Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-indigo-700 transition-all">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Scans" 
          value="12,450" 
          trend="+12%" 
          trendUp={true} 
          icon={Target}
          iconBg="bg-indigo-50 text-indigo-600"
        />
        <StatCard 
          title="Avg Fairness Score" 
          value="94.2" 
          unit="/ 100"
          trend="0%" 
          trendUp={null} 
          icon={ShieldCheck}
          iconBg="bg-emerald-50 text-emerald-600"
        />
        <StatCard 
          title="High Risk Alerts" 
          value="7" 
          trend="-3" 
          trendUp={true} 
          icon={AlertCircle}
          iconBg="bg-rose-50 text-rose-600"
        />
        <StatCard 
          title="Reports Generated" 
          value="142" 
          trend="+24" 
          trendUp={true} 
          icon={FileText}
          iconBg="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-2 sleek-card p-6 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-slate-800 tracking-tight">Bias Trends Over Time</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Aggregate score variance across protected classes.</p>
            </div>
            <button className="p-1 hover:bg-slate-50 rounded transition-colors text-slate-400">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorChal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', 
                    fontSize: '12px' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="production" 
                  stroke="#4f46e5" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorProd)" 
                  name="Production Model"
                />
                <Area 
                  type="monotone" 
                  dataKey="challenger" 
                  stroke="#0891b2" 
                  strokeWidth={3} 
                  strokeDasharray="5 5"
                  fillOpacity={1} 
                  fill="url(#colorChal)" 
                  name="Challenger Model"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <div className="w-3 h-1 bg-indigo-600 rounded-full" /> Production Model
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <div className="w-3 h-1 bg-cyan-600 rounded-full border border-dashed" /> Challenger Model
            </div>
          </div>
        </div>

        {/* Group Disparity */}
        <div className="sleek-card p-6 flex flex-col">
          <h3 className="font-bold text-slate-800 tracking-tight mb-2">Group Disparity</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-8">Approval rates by demographic.</p>
          
          <div className="space-y-6 flex-1">
            <ProgressBar label="Group A" progress={82} color="bg-indigo-600" />
            <ProgressBar label="Group B" progress={76} color="bg-cyan-700" />
            <ProgressBar label="Group C" progress={85} color="bg-indigo-100" />
            <ProgressBar label="Group D" progress={42} color="bg-rose-500" alert={true} />
            <ProgressBar label="Group E" progress={79} color="bg-orange-200" />
          </div>

          <button className="flex items-center justify-center gap-1.5 w-full py-2 mt-auto text-indigo-600 text-xs font-bold hover:bg-indigo-50 rounded-lg transition-all">
            View Detailed Demographics <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, unit, trend, trendUp, icon: Icon, iconBg }: any) {
  return (
    <div className="sleek-card p-6 group hover:border-indigo-200 transition-all">
      <div className="flex justify-between items-start">
        <div className={cn("p-2 rounded-xl transition-transform group-hover:scale-110", iconBg)}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold",
            trendUp === true ? "bg-emerald-50 text-emerald-600" : 
            trendUp === false ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-400"
          )}>
            {trendUp === true ? <ArrowUpRight className="w-3 h-3" /> : 
             trendUp === false ? <ArrowDownRight className="w-3 h-3" /> : null}
            {trend}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-3xl font-black text-slate-900 tracking-tight">{value}</span>
          {unit && <span className="text-sm font-bold text-slate-300">{unit}</span>}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ label, progress, color, alert }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
          {label} {alert && <AlertCircle className="w-3 h-3 text-rose-500" />}
        </label>
        <span className={cn("text-[11px] font-bold", alert ? "text-rose-600" : "text-slate-400")}>{progress}%</span>
      </div>
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-1000", color)} 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </div>
  );
}
