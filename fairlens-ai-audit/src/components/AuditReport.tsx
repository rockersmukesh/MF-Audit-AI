import React, { useEffect, useRef, useState } from 'react';
import {
  FileText, Download, Share2, AlertTriangle, CheckCircle2,
  ShieldCheck, Info, BrainCircuit, ArrowLeft, Calendar, Hash
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const REPORT_STORAGE_KEY = 'fairlens_last_report';

// Called from BiasScanner after a successful scan to persist the report
export function saveReportToStorage(report: any, filename: string, policyName?: string) {
  const payload = {
    report,
    filename,
    policyName,
    scannedAt: new Date().toISOString(),
    reportId: `FL-${Math.floor(Math.random() * 90000 + 10000)}`,
  };
  localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(payload));
}

export function AuditReport() {
  const [stored, setStored] = useState<any>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem(REPORT_STORAGE_KEY);
    if (raw) setStored(JSON.parse(raw));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!stored) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center">
          <FileText className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">No Report Generated Yet</h3>
        <p className="text-slate-500 text-sm text-center max-w-sm">
          Run a bias scan first. Your last scan results will automatically appear here as a downloadable audit report.
        </p>
        <button
          onClick={() => navigate('/datasets')}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Start a New Scan
        </button>
      </div>
    );
  }

  const { report, filename, policyName, scannedAt, reportId } = stored;
  const scanDate = new Date(scannedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const scanTime = new Date(scannedAt).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  });

  const riskColor = {
    Critical: { bg: 'bg-rose-600', light: 'bg-rose-50 text-rose-700 border-rose-200', text: 'text-rose-600' },
    High: { bg: 'bg-rose-500', light: 'bg-rose-50 text-rose-600 border-rose-100', text: 'text-rose-500' },
    Moderate: { bg: 'bg-amber-500', light: 'bg-amber-50 text-amber-700 border-amber-200', text: 'text-amber-600' },
    Low: { bg: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: 'text-emerald-600' },
  }[report.risk_level as string] ?? { bg: 'bg-slate-400', light: 'bg-slate-50 text-slate-600 border-slate-100', text: 'text-slate-600' };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Audit Report</h2>
          <p className="text-slate-500 text-sm mt-1">
            Generated from the last bias scan. Download as PDF for compliance documentation.
          </p>
        </div>
        <div className="flex gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm active:scale-[0.98]"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button
            onClick={() => navigate('/datasets')}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
          >
            New Scan
          </button>
        </div>
      </div>

      {/* Printable Report */}
      <div ref={printRef} id="audit-report-content" className="sleek-card overflow-hidden">
        {/* Report Header */}
        <div className="bg-indigo-600 p-10 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-8 h-8 text-indigo-200" />
                <div>
                  <h1 className="text-2xl font-black tracking-tight">MF Audits</h1>
                  <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Official Fairness Audit Report</p>
                </div>
              </div>
              <div className="mt-4 h-0.5 w-24 bg-indigo-400 rounded-full" />
            </div>
            <div className={cn("px-4 py-2 rounded-xl text-white font-black text-sm uppercase tracking-wider", riskColor.bg)}>
              {report.risk_level} RISK
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <ReportMeta icon={<Hash className="w-3.5 h-3.5" />} label="Report ID" value={reportId} />
            <ReportMeta icon={<Calendar className="w-3.5 h-3.5" />} label="Scan Date" value={scanDate} />
            <ReportMeta icon={<FileText className="w-3.5 h-3.5" />} label="Dataset" value={filename} />
            {policyName && <ReportMeta icon={<FileText className="w-3.5 h-3.5" />} label="Policy File" value={policyName} />}
          </div>
        </div>

        {/* Fairness Score Bar */}
        <div className="px-10 py-6 bg-slate-50 border-b border-slate-100 flex items-center gap-8">
          <div className="shrink-0">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Overall Fairness Score</p>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">{report.fairness_score}</span>
              <span className="text-lg font-bold text-slate-300">/ 100</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-1.5">
              <span>Fairness Index</span>
              <span className={riskColor.text}>{report.risk_level}</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all", riskColor.bg)}
                style={{ width: `${report.fairness_score}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] font-bold text-slate-300 mt-1">
              <span>0 — Critical</span>
              <span>100 — Fully Fair</span>
            </div>
          </div>
          <div className="shrink-0">
            {report.biased ? (
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <AlertTriangle className="w-5 h-5" /> Bias Detected
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" /> No Bias Found
              </div>
            )}
          </div>
        </div>

        <div className="p-10 space-y-8">
          {/* AI Summary */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-800">Executive Summary</h3>
              <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">Gemini AI</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm font-medium bg-slate-50 p-5 rounded-xl border border-slate-100">
              {report.summary}
            </p>
          </section>

          {/* Bias Types */}
          {report.bias_types && report.bias_types.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <h3 className="text-base font-bold text-slate-800">Detected Bias Vectors</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {report.bias_types.map((type: string, i: number) => (
                  <span
                    key={i}
                    className={cn("px-4 py-2 rounded-lg text-sm font-bold border", riskColor.light)}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Recommendations */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-800">Remediation Recommendations</h3>
            </div>
            <div className="space-y-3">
              {report.recommendations.map((rec: string, i: number) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm text-slate-700 font-semibold leading-relaxed pt-0.5">{rec}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>Generated by MF Audits · {scanDate} at {scanTime}</span>
            <span className="font-mono">Report ID: {reportId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportMeta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-indigo-300 mb-1">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-white font-bold text-sm truncate max-w-[140px]" title={value}>{value}</p>
    </div>
  );
}
