import React from 'react';
import LiveMockInterview from './components/LiveMockInterview';
import { GraduationCap } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      
      {/* Sleek, Simple Navigation Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-3xs h-16 shrink-0">
        <div className="max-w-3xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-display font-extrabold text-slate-900 text-sm tracking-tight uppercase">
                MIS Practice Trainer
              </span>
              <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                Executive Trainer
              </span>
            </div>
          </div>
          <div className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
            Linear Flow V2
          </div>
        </div>
      </header>

      {/* Main Single-View Component Center Stage */}
      <main className="flex-1 w-full">
        <LiveMockInterview />
      </main>

      {/* Clean, Simple Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400 font-sans tracking-wide shrink-0">
        <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 MIS Interview Practice Trainer. All rights reserved.</p>
          <div className="flex gap-2">
            <span className="text-slate-500 font-medium">Part 1: Learn</span>
            <span>•</span>
            <span className="text-slate-500 font-medium">Part 2: MCQ Mock</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
