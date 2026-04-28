import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Download, 
  AlertTriangle, 
  CheckCircle2,
  Info,
  ShieldAlert,
  BrainCircuit,
  ArrowLeft
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveReportToStorage } from './AuditReport';

export function BiasScanner() {
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state as { report?: any, filename?: string } | null;

  const data = stateData?.report;
  const filename = stateData?.filename || "Unknown Source";
  const policyName = stateData?.policyName;
  const isCombined = stateData?.type === 'combined';

  // Persist report to localStorage so Audit Report page can read it
  useEffect(() => {
    if (data) {
      saveReportToStorage(data, filename, policyName);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
         <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4">
           <BrainCircuit className="w-8 h-8" />
         </div>
         <h3 className="text-xl font-bold text-slate-800 mb-2">Awaiting AI Analysis</h3>
         <p className="text-slate-500 max-w-md text-center bg-slate-50 border border-slate-200 p-4 rounded-lg text-sm mb-6">
           Please upload a document or dataset first to generate a comprehensive Gemini Bias Report.
         </p>
         <button onClick={() => navigate('/datasets')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm flex items-center gap-2">
            <ArrowLeft className="w-4 h-4"/> Go to Upload Zone
         </button>
      </div>
    );
  }

  // Determine styling based on Risk Level natively returned from Gemini
  const isHighRisk = data.risk_level === 'High' || data.risk_level === 'Critical';
  const isBaised = data.biased;

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Title Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
              {isCombined ? 'Policy vs Data Audit' : 'Gemini Bias Report'}
            </span>
            {isBaised ? (
              <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-bold flex items-center gap-1 border border-rose-100 uppercase">
                <AlertTriangle className="w-3.5 h-3.5" /> Compliance Risk Detected
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold flex items-center gap-1 border border-emerald-100 uppercase">
                <CheckCircle2 className="w-3.5 h-3.5" /> Passed Analysis
              </span>
            )}
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight italic">Bias Scan Results</h2>
          <p className="text-slate-500 text-sm mt-1 max-w-2xl font-medium">
            Dataset: <span className="font-bold text-slate-700">{filename}</span>
            {policyName && (
              <span> · Policy: <span className="font-bold text-sky-700">{policyName}</span></span>
            )}
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => window.print()} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition-all text-xs font-bold flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all text-xs font-bold shadow-sm active:scale-95">
             Review Policies
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        {/* Risk Score Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-12 lg:col-span-4 sleek-card p-10 flex flex-col justify-between relative overflow-hidden"
        >
          {isHighRisk ? (
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />
          ) : (
             <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
          )}
          <div className="relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Overall Fairness Score</h3>
               <span className={cn("px-2 py-1 rounded text-[11px] font-black uppercase tracking-wider",
                  data.risk_level === 'Critical' ? "bg-rose-600 text-white" :
                  data.risk_level === 'High' ? "bg-rose-100 text-rose-700" :
                  data.risk_level === 'Moderate' ? "bg-amber-100 text-amber-700" :
                  "bg-emerald-100 text-emerald-700"
               )}>{data.risk_level} RISK</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-black leading-none tracking-tighter text-slate-900">{data.fairness_score}</span>
              <span className="text-xl font-bold text-slate-300">/ 100</span>
            </div>
          </div>
          
          <div className="mt-10 relative">
            <div className="flex justify-between mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Safety Index</span>
              <span className={isBaised ? "text-rose-600" : "text-emerald-600"}>
                Threshold Integrity
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
              <div 
                className={cn("h-full", isBaised ? "bg-rose-500" : "bg-emerald-500")} 
                style={{ width: `${data.fairness_score}%` }} 
              />
            </div>
          </div>
          <p className="mt-6 text-[11px] text-slate-500 font-medium leading-relaxed">
            Proprietary scoring measured by Gemini reasoning across exclusionary phrasing, structural disparity, and minority impact rules.
          </p>
        </motion.div>

        {/* Dynamic Details and Summary */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 gap-6">
           {/* Summary Block */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="sleek-card p-8 flex flex-col justify-between border-l-4 border-l-indigo-500"
          >
            <div className="flex items-center gap-2 mb-4">
               <BrainCircuit className="w-5 h-5 text-indigo-600" />
               <h4 className="text-lg font-bold text-slate-800 tracking-tight">Gemini AI Executive Summary</h4>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium text-[15px]">{data.summary}</p>

            <div className="mt-6 pt-6 border-t border-slate-100">
               <h5 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-3">Identified Imbalance Vectors</h5>
               <div className="flex flex-wrap gap-2">
                  {data.bias_types && data.bias_types.length > 0 ? (
                     data.bias_types.map((type: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg border border-slate-200">
                           {type}
                        </span>
                     ))
                  ) : (
                     <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100">
                        None Detected
                     </span>
                  )}
               </div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="sleek-card p-8 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 mb-6">
               <Info className="w-5 h-5 text-indigo-600" />
               <h4 className="text-lg font-bold text-slate-800 tracking-tight">Smart Recommendations</h4>
            </div>
            <div className="space-y-4">
              {data.recommendations.map((rec: string, i: number) => (
                <div key={i} className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl flex gap-4 items-start">
                   <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0 text-sm">{i+1}</div>
                   <p className="text-sm font-semibold text-slate-700 leading-relaxed pt-1">{rec}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
