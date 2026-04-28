import React from 'react';
import { Network, Search, MoreHorizontal, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function Models() {
  const models = [
    { name: 'Credit Decision Engine v2', type: 'Classification', status: 'Healthy', biasRisk: 'Low', parity: '98.2%', lastAssessed: '2 hours ago', style: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { name: 'Candidate Resume Screener', type: 'NLP / Ranking', status: 'Warning', biasRisk: 'Medium', parity: '84.5%', lastAssessed: '5 hours ago', style: 'bg-amber-50 text-amber-600 border-amber-100' },
    { name: 'Fraud Detection Network', type: 'Anomaly Detection', status: 'Healthy', biasRisk: 'Low', parity: '96.1%', lastAssessed: '1 day ago', style: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { name: 'Facial Recognition Beta', type: 'Computer Vision', status: 'Critical', biasRisk: 'High', parity: '62.4%', lastAssessed: '2 days ago', style: 'bg-rose-50 text-rose-600 border-rose-100' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Active Models</h2>
          <p className="text-slate-500 text-sm mt-1">Monitor deployed AI models for drift, parity, and emerging bias risks.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95">
          <Network className="w-4 h-4" /> Register Model
        </button>
      </div>

      {/* Models Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {models.map((model) => (
          <div key={model.name} className="sleek-card p-6 flex flex-col group hover:border-indigo-200 transition-all cursor-pointer relative overflow-hidden">
             <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-slate-50 to-transparent -z-10 group-hover:from-indigo-50 transition-colors" />
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <Activity className="w-5 h-5" />
                 </div>
                 <div>
                   <h3 className="font-bold text-slate-900 leading-tight">{model.name}</h3>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{model.type}</span>
                 </div>
              </div>
              <button className="text-slate-400 hover:text-slate-600 p-1">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Status</p>
                <div className="flex items-center gap-1.5">
                  {model.status === 'Healthy' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {model.status === 'Warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                  {model.status === 'Critical' && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                  <span className="text-sm font-bold text-slate-700">{model.status}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Bias Risk</p>
                <span className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border",
                    model.style
                )}>
                  {model.biasRisk}
                </span>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Parity</p>
                <span className={cn(
                  "text-sm font-bold", 
                  parseFloat(model.parity) > 90 ? "text-emerald-600" : parseFloat(model.parity) > 80 ? "text-amber-600" : "text-rose-600"
                )}>
                  {model.parity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
