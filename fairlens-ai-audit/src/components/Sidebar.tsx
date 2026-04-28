import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  Plus,
  Database,
  BarChart3,
  CircleDashed,
} from 'lucide-react';
import { cn } from '../lib/utils';

export function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { path: '/scanner', icon: ShieldCheck, label: 'Bias Scanner' },
    { path: '/datasets', icon: Database, label: 'Datasets' },
    { path: '/reports', icon: BarChart3, label: 'Audit Report' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 z-50 border-r border-outline bg-surface-container flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-outline-variant flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">
            <CircleDashed className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 font-sans tracking-tight leading-none">MF Audit</h1>
            <p className="text-[10px] uppercase font-bold text-slate-400 mt-1 tracking-widest">Enterprise Tier</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-indigo-50 text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
              {item.label}
            </Link>
          );
        })}

        <Link
          to="/login"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all mt-4"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Link>
      </nav>

      {/* CTA */}
      <div className="p-4 border-t border-outline-variant">
        <Link to="/scanner" className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2 active:scale-[0.98]">
          <Plus className="w-4 h-4" />
          Run New Audit
        </Link>
      </div>

      {/* Profile */}
      <div className="p-4 bg-slate-50 m-4 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
            <img src="/sundar-pichai.png" alt="Sundar Pichai" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">Sundar Pichai</p>
            <p className="text-[10px] text-slate-500 truncate">CEO, Alphabet</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
