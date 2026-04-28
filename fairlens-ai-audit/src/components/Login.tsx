import React from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github, Chrome, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-[900px] flex rounded-3xl overflow-hidden shadow-2xl bg-white min-h-[550px]">
        {/* Brand Side */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-50 to-indigo-100 p-12 flex-col justify-between relative">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-2xl" />
          <div className="relative z-10">
            <h1 className="text-4xl font-black text-indigo-600 italic tracking-tighter">MF Audit</h1>
            <p className="text-slate-600 mt-6 font-medium text-lg leading-relaxed max-w-sm">
              Enterprise-grade bias detection and drift analysis for responsible AI.
            </p>
          </div>

          <div className="relative z-10 p-6 bg-white rounded-2xl border border-indigo-100 shadow-xl shadow-indigo-200/20">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <ShieldCheck className="w-5 h-5" />
               </div>
               <span className="text-sm font-bold text-slate-800">Secure & Compliant</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Your models and datasets are analyzed with strict privacy controls and industry-standard encryption protocols.
            </p>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-8 bg-slate-50 p-1 rounded-xl">
               <button className="flex-1 py-2 text-sm font-bold bg-white text-indigo-600 rounded-lg shadow-sm">Log In</button>
               <button className="flex-1 py-2 text-sm font-bold text-slate-400 hover:text-slate-600">Sign Up</button>
            </div>

            <div className="mb-10 text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
              <p className="text-sm text-slate-500 mt-1 font-medium">Enter your details to access your dashboard.</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">Work Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline pl-1 pr-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                  <button className="text-[10px] font-bold text-indigo-600 hover:underline">Forgot Password?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                  />
                  <button className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors">
                    <Eye className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              <button className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl mt-4 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                Log In <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase font-bold text-slate-300">
                  <span className="bg-white px-4 tracking-widest">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  <Chrome className="w-4 h-4" /> Google
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  <Github className="w-4 h-4" /> GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
