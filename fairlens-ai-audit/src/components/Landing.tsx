import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, BarChart3, Database, Network, CircleDashed, CheckCircle2
} from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">
              <CircleDashed className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">MF Audit</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#solutions" className="hover:text-slate-900 transition-colors">Solutions</a>
            <a href="#ethics" className="hover:text-slate-900 transition-colors">Ethics</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900">Sign In</Link>
          <Link to="/dashboard" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm shadow-indigo-600/20 transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 pt-20 pb-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold tracking-wide uppercase">
            Beta Access Available
          </div>
          <h1 className="text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
            Build Trustworthy AI Before AI Makes Decisions
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
            A platform that helps companies detect hidden bias and discrimination in datasets and AI models before using them in hiring, loans, healthcare, insurance, or admissions.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95 flex items-center gap-2">
              Start Free Audit <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition-all active:scale-95">
              Book Demo
            </button>
          </div>
        </div>

        {/* Abstract Dashboard Graphic */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-rose-50 rounded-3xl blur-3xl opacity-50" />
          <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-2 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col transform lg:rotate-1 hover:rotate-0 transition-all duration-500">
            <div className="flex gap-2 p-3 border-b border-slate-800">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex-1 p-6 grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-4">
                <div className="h-24 bg-slate-800 rounded-lg animate-pulse" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-slate-800/80 rounded-lg" />
                  <div className="h-32 bg-slate-800/60 rounded-lg" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-16 bg-slate-800/90 rounded-lg" />
                <div className="h-40 bg-slate-800/50 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-8 py-10">
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">
            Trusted By Global Leaders in AI Ethics
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-xl font-black text-slate-700 tracking-tight">Acme Corp</span>
            <span className="text-xl font-black text-slate-700 tracking-tight">GlobalBank</span>
            <span className="text-xl font-black text-slate-700 tracking-tight">NexusHealth</span>
            <span className="text-xl font-black text-slate-700 tracking-tight">VertexInsure</span>
            <span className="text-xl font-black text-slate-700 tracking-tight">UnityEdu</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
            Sophisticated Bias Intelligence
          </h2>
          <p className="text-slate-500">
            Enterprise-grade tools to ensure your artificial intelligence remains human-centric and regulatory compliant.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Card 1: Scanning */}
          <div className="md:col-span-2 bg-slate-50 rounded-3xl p-8 lg:p-12 border border-slate-100 overflow-hidden relative group">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-indigo-600/20">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Continuous Bias Scanning</h3>
            <p className="text-slate-500 max-w-md mb-8">
              Real-time monitoring of live models to detect drift and emerging biases as your data evolves over time. Automated triggers alert your engineering team before production impacts.
            </p>
            <div className="absolute -right-12 -bottom-24 w-[120%] aspect-[2/1] rounded-t-3xl bg-slate-900 shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Abstract soundwave/data visual */}
              <div className="flex items-center justify-center gap-1 opacity-80 mix-blend-screen px-24">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="w-1.5 bg-cyan-400 rounded-full"
                    style={{ height: `${Math.random() * 100 + 10}px`, opacity: Math.random() * 0.5 + 0.3 }} />
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Parity */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 lg:p-10 flex flex-col">
            <div className="w-12 h-12 bg-indigo-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Demographic Parity</h3>
            <p className="text-indigo-900/60 text-sm mb-auto">
              Ensure fair outcomes across all protected classes with institutional-grade statistical analysis and parity scorecards.
            </p>
            <div className="mt-8 bg-white rounded-xl p-4 shadow-sm border border-indigo-50/50">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 w-[94%]" />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2">
                <span>Parity Score</span>
                <span className="text-indigo-600">94.2%</span>
              </div>
            </div>
          </div>

          {/* Card 3: Reports */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Audit Reports</h3>
            <p className="text-slate-500 text-sm">
              Generated PDF/CSV compliance documentation ready for legal, board members, or regulatory bodies.
            </p>
            <Link to="/reports" className="inline-flex items-center text-sm font-bold text-indigo-600 mt-6 hover:underline">
              View Sample Report <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Card 4: Infrastructure */}
          <div className="md:col-span-2 bg-slate-900 rounded-3xl p-8 lg:p-10 border border-slate-800 text-white flex flex-col justify-end relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-300 via-slate-900 to-slate-900" />

            <div className="relative z-10 mt-32">
              <h3 className="text-xl font-bold text-white mb-2">Institutional-Grade Infrastructure</h3>
              <p className="text-slate-400 text-sm max-w-md">
                Built on the principles of explainable AI and mathematical rigor.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Metrics Strip */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-8 flex justify-between divide-x divide-slate-800">
          <div className="flex-1 text-center">
            <div className="text-4xl md:text-5xl font-black text-cyan-400 tracking-tight mb-2">10M+</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Rows Scanned</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-4xl md:text-5xl font-black text-cyan-400 tracking-tight mb-2">99%</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Bias Detection Accuracy</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-4xl md:text-5xl font-black text-cyan-400 tracking-tight mb-2">500+</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Models Monitored</div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-8 relative">
          <div className="text-[120px] font-black text-slate-200 absolute -top-8 -left-4 leading-none opacity-50">"</div>
          <blockquote className="relative z-10 text-2xl md:text-3xl font-medium text-slate-800 leading-snug tracking-tight mb-8">
            MF Audit has transformed how we approach model deployment. We no longer wonder if there's hidden bias—we know exactly where it is and how to fix it before it affects a single customer.
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=128&h=128&auto=format&fit=crop" alt="Sarah Chen" className="w-full h-full object-cover grayscale" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Sarah Chen</div>
              <div className="text-sm text-slate-500">Chief Technology Officer, GlobalBank</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-8 py-24">
        <div className="bg-indigo-700 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/50" />

          <div className="relative z-10 min-h-[300px] flex flex-col justify-center items-center">
            <h2 className="text-4xl font-black text-white mb-6">Ready to lead with trustworthy AI?</h2>
            <p className="text-indigo-200 text-lg max-w-xl mx-auto mb-10">
              Join the movement towards responsible artificial intelligence. Start your first audit in under 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-700 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">
                Start Free Audit
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 border-2 border-indigo-400 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all active:scale-95">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-sm font-medium text-slate-400">
          <div>
            <span className="font-bold text-slate-900 block mb-1">MF Audit</span>
            <p>&copy; {new Date().getFullYear()} MF Audit. Engineering Trust in Artificial Intelligence.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
            <a href="#" className="hover:text-slate-900">AI Ethics Framework</a>
            <a href="#" className="hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
