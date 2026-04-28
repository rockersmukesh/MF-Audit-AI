import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Settings, Search } from 'lucide-react';
import { cn } from '../lib/utils';

export function Header() {
  const location = useLocation();

  const links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/scanner', label: 'Audits' },
    { path: '/datasets', label: 'Datasets' },
    { path: '/models', label: 'Models' },
  ];

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-white border-b border-slate-200 px-8 flex items-center justify-between h-16">
      <div className="flex items-center gap-6 flex-1 h-full">
        <div className="relative w-64 max-w-sm hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search audits..." 
            className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        <nav className="flex items-center gap-6 h-full ml-4">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-semibold tracking-tight h-16 flex items-center px-1 transition-all relative group",
                  isActive 
                    ? "text-indigo-600" 
                    : "text-slate-400 hover:text-slate-900"
                )}
              >
                {link.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[10px] font-bold">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Session Active
        </div>
        <button className="p-2 rounded-full text-slate-400 hover:bg-slate-50 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full text-slate-400 hover:bg-slate-50 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
