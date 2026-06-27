import React from 'react';
import { BookOpen, User, Home, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  currentMode: 'landing' | 'practice' | 'mock';
  setMode: (mode: 'landing' | 'practice' | 'mock') => void;
  practiceProgress: string;
}

export default function Header({ currentMode, setMode, practiceProgress }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs h-16 shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Logo Section */}
        <button
          onClick={() => setMode('landing')}
          className="flex items-center gap-3 text-left focus:outline-hidden group"
          id="nav_logo_btn"
        >
          <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center text-white font-bold transition-all group-hover:scale-105">
            <span className="font-display text-xs">2A</span>
          </div>
          <div>
            <span className="block font-display font-bold text-slate-900 text-sm sm:text-base leading-none">
              Online Assessment
            </span>
            <span className="block text-[10px] text-slate-450 font-bold tracking-wider mt-0.5 uppercase">
              with 2AKonsultant
            </span>
          </div>
        </button>

        {/* STAR+F Legend & Action Buttons */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* STAR+F Legend Hidden on small mobiles */}
          <div className="hidden md:flex gap-1 items-center">
            <span className="px-2 py-0.5 bg-blue-55 text-blue-900 text-[10px] font-bold rounded border border-blue-200">S</span>
            <span className="px-2 py-0.5 bg-blue-55 text-blue-900 text-[10px] font-bold rounded border border-blue-200">T</span>
            <span className="px-2 py-0.5 bg-blue-55 text-blue-900 text-[10px] font-bold rounded border border-blue-200">A</span>
            <span className="px-2 py-0.5 bg-blue-55 text-blue-900 text-[10px] font-bold rounded border border-blue-200">R</span>
            <span className="text-slate-400 text-[10px] font-bold px-0.5">+</span>
            <span className="px-2 py-0.5 bg-indigo-55 text-indigo-900 text-[10px] font-bold rounded border border-indigo-200">F</span>
          </div>

          <div className="h-6 w-[1px] bg-slate-200 hidden md:block"></div>

          <div className="flex items-center gap-2">
            {currentMode !== 'landing' && (
              <button
                onClick={() => setMode('landing')}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-md border border-slate-200 transition-all cursor-pointer"
                id="back_home_btn"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Menu</span>
              </button>
            )}

            <button
              onClick={() => setMode('practice')}
              className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm transition-all cursor-pointer rounded-md ${
                currentMode === 'practice'
                  ? 'bg-blue-700 text-white font-bold shadow-sm'
                  : 'font-medium text-slate-600 hover:bg-slate-50 border border-transparent'
              }`}
              id="nav_mode_practice_btn"
            >
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Practice Mode</span>
                {practiceProgress && (
                  <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${currentMode === 'practice' ? 'bg-blue-800 text-blue-105' : 'bg-slate-100 text-slate-600'}`}>
                    {practiceProgress}
                  </span>
                )}
              </span>
            </button>

            <button
              onClick={() => setMode('mock')}
              className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm transition-all cursor-pointer rounded-md ${
                currentMode === 'mock'
                  ? 'bg-blue-750 text-white font-bold shadow-sm ring-1 ring-blue-600/30'
                  : 'font-medium text-slate-600 hover:bg-slate-50'
              }`}
              id="nav_mode_mock_btn"
            >
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>Mock Interview</span>
              </span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
