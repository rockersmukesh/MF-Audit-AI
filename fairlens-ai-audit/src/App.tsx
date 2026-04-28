import React from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { BiasScanner } from './components/BiasScanner';
import { Datasets } from './components/Datasets';
import { AuditReport } from './components/AuditReport';
import { Login } from './components/Login';
import { Landing } from './components/Landing';

function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col relative bg-slate-50">
        <Header />
        <main className="pt-24 p-8 flex-1">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardOverview />} />
        <Route path="/scanner" element={<BiasScanner />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/reports" element={<AuditReport />} />
      </Route>
    </Routes>
  );
}
