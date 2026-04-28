import React, { useState, useRef } from 'react';
import {
  Upload, FileText, Database, ArrowRight, Loader2,
  ShieldAlert, CheckCircle2, X, BrainCircuit
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

interface StagedFile {
  file: File;
  name: string;
  size: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function FileDropZone({
  label,
  sublabel,
  description,
  accept,
  acceptLabel,
  icon: Icon,
  accentClass,
  stagedFile,
  onFile,
  onClear,
  disabled,
}: {
  label: string;
  sublabel: string;
  description: string;
  accept: string;
  acceptLabel: string;
  icon: React.ElementType;
  accentClass: string;
  stagedFile: StagedFile | null;
  onFile: (file: File) => void;
  onClear: () => void;
  disabled: boolean;
}) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className={cn("w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-black", accentClass)}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <div>
          <span className="font-bold text-slate-800 text-sm">{label}</span>
          <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">{sublabel}</span>
        </div>
      </div>

      {stagedFile ? (
        /* Staged file preview */
        <div className={cn("sleek-card p-5 flex items-center gap-4 border-l-4", accentClass.includes('indigo') ? 'border-l-indigo-500' : 'border-l-sky-500')}>
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", accentClass.includes('indigo') ? 'bg-indigo-50' : 'bg-sky-50')}>
            <Icon className={cn("w-5 h-5", accentClass.includes('indigo') ? 'text-indigo-500' : 'text-sky-500')} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-800 text-sm truncate">{stagedFile.name}</p>
            <p className="text-xs text-slate-400">{stagedFile.size}</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            {!disabled && (
              <button
                onClick={onClear}
                className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <X className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => { if (!disabled) inputRef.current?.click(); }}
          className={cn(
            "border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all group",
            disabled ? "border-slate-100 bg-slate-50/50 cursor-not-allowed" :
            dragActive ? "border-indigo-400 bg-indigo-50/30 scale-[1.01]" :
            "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 cursor-pointer"
          )}
        >
          <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={e => { if (e.target.files?.[0]) onFile(e.target.files[0]); }} />
          <Upload className={cn("w-7 h-7 mb-3 transition-colors", disabled ? "text-slate-200" : dragActive ? "text-indigo-500" : "text-slate-300 group-hover:text-slate-400")} />
          <p className={cn("text-sm font-bold", disabled ? "text-slate-300" : "text-slate-600")}>{description}</p>
          <span className={cn("mt-3 px-3 py-1 rounded-lg text-[11px] font-bold border",
            disabled ? "border-slate-100 text-slate-300 bg-white" :
            "border-slate-200 text-slate-500 bg-white"
          )}>{acceptLabel}</span>
        </div>
      )}
    </div>
  );
}

export function Datasets() {
  const [datasetFile, setDatasetFile] = useState<StagedFile | null>(null);
  const [policyFile, setPolicyFile] = useState<StagedFile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const stageFile = (file: File, type: 'dataset' | 'policy') => {
    const staged: StagedFile = { file, name: file.name, size: formatBytes(file.size) };
    if (type === 'dataset') setDatasetFile(staged);
    else setPolicyFile(staged);
  };

  const canAnalyze = datasetFile !== null && !isAnalyzing;

  const handleAnalyze = async () => {
    if (!datasetFile) return;
    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append('dataset', datasetFile.file);
    if (policyFile) {
      formData.append('policy', policyFile.file);
    }

    try {
      const endpoint = policyFile ? '/combined-analyze' : '/upload-analyze';
      // For /upload-analyze, use the original single-file key 'file'
      if (!policyFile) {
        formData.append('file', datasetFile.file);
        formData.append('context', 'dataset');
      }

      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed.');

      navigate('/scanner', {
        state: {
          report: data,
          filename: datasetFile.name,
          policyName: policyFile?.name,
          type: policyFile ? 'combined' : 'dataset'
        }
      });
    } catch (err: any) {
      setError(err.message);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Data Integration</h2>
        <p className="text-slate-500 text-sm mt-1 max-w-2xl">
          Upload your dataset and optionally attach your company's policy document. Gemini will check whether the data <strong>violates your own stated policies</strong>.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm font-semibold flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
          <div><span className="font-black block mb-0.5">Analysis Error</span>{error}</div>
        </div>
      )}

      <div className="sleek-card p-8 space-y-6">
        {/* Step 1: Dataset */}
        <FileDropZone
          label="Dataset"
          sublabel="Required"
          description="Drop your dataset here to begin"
          accept=".csv,.xlsx,.xls"
          acceptLabel="CSV · XLSX · XLS"
          icon={Database}
          accentClass="bg-indigo-600"
          stagedFile={datasetFile}
          onFile={(f) => stageFile(f, 'dataset')}
          onClear={() => setDatasetFile(null)}
          disabled={isAnalyzing}
        />

        {/* Visual connector */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">+ Optionally attach policy</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {/* Step 2: Policy */}
        <FileDropZone
          label="Company Policy Document"
          sublabel="Optional — enables policy-vs-data audit"
          description="Drop your HR policy, loan rules, or screening guidelines"
          accept=".pdf,.docx,.txt"
          acceptLabel="PDF · DOCX · TXT"
          icon={FileText}
          accentClass="bg-sky-600"
          stagedFile={policyFile}
          onFile={(f) => stageFile(f, 'policy')}
          onClear={() => setPolicyFile(null)}
          disabled={isAnalyzing}
        />

        {/* Analysis mode indicator */}
        {policyFile && datasetFile && (
          <div className="flex items-center gap-3 p-4 bg-indigo-50 border border-indigo-100 rounded-xl animate-in fade-in duration-300">
            <BrainCircuit className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-indigo-800">Policy-vs-Data Mode Active</p>
              <p className="text-xs text-indigo-600 mt-0.5">
                Gemini will check if <strong>{datasetFile.name}</strong> violates the rules stated in <strong>{policyFile.name}</strong>
              </p>
            </div>
          </div>
        )}
        {datasetFile && !policyFile && (
          <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <Database className="w-5 h-5 text-slate-400 shrink-0" />
            <p className="text-xs text-slate-500">
              <strong>Dataset-only mode</strong> — Gemini will analyze the dataset for general demographic bias patterns.
              Attach a policy document above for a more targeted compliance audit.
            </p>
          </div>
        )}

        {/* Run Button */}
        <button
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          className={cn(
            "w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all",
            canAnalyze
              ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-[0.99]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          )}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing document with AI...
            </>
          ) : (
            <>
              <BrainCircuit className="w-4 h-4" />
              {policyFile ? 'Run Policy-vs-Data Audit' : 'Run Bias Analysis'}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
