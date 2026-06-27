import React from 'react';
import { motion } from 'motion/react';
import { Play, ClipboardCheck, ArrowRight, BookOpen, Star, HelpCircle, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

interface FrameworkIntroProps {
  onStartPractice: () => void;
  onStartMock: () => void;
}

export default function FrameworkIntro({ onStartPractice, onStartMock }: FrameworkIntroProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const starFramework = [
    {
      letter: 'S',
      title: 'Situation',
      desc: 'Understand and clearly summarize the business problem or context. (e.g. unexpected 30% department expense jump).',
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      letter: 'T',
      title: 'Task',
      desc: 'Identify your precise mandate, accountability, or regulatory responsibility as an analytical partner.',
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      letter: 'A',
      title: 'Action',
      desc: 'Detail your exact investigatory steps (e.g., verifying ERP entries, audit calculations, operational talks).',
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      letter: 'R',
      title: 'Result',
      desc: 'Describe the quantifiable business outcome, resolution metrics, or correction ledger.',
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      letter: '+F',
      title: 'Follow-Up',
      desc: 'Enforce preventive measures (peer reviews, validation scripts, standardized Excel files) to secure long-term accuracy.',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-705 shadow-xs'
    }
  ];

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 py-8 sm:py-14"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Editorial Title Section */}
      <div className="text-center mb-12">
        <motion.div 
          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded border border-blue-200/80 mb-4"
          variants={itemVariants}
        >
          <Star className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
          <span className="text-blue-900 text-[11px] font-bold tracking-wider uppercase">
            Finance & FP&A Expert Series
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight uppercase"
          variants={itemVariants}
        >
          Online Assessment with <span className="text-blue-700">2AKonsultant</span>
        </motion.h1>
        
        <motion.p 
          className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans"
          variants={itemVariants}
        >
          Master scenario-based finance analyst questions using the <strong className="text-blue-700 font-bold uppercase">STAR+F framework</strong>. Contrast your custom answers side-by-side with official expert structures.
        </motion.p>
      </div>

      {/* Modes Selection Grid */}
      <motion.div 
        className="grid md:grid-cols-2 gap-6 mb-12"
        variants={itemVariants}
      >
        {/* Mode 1: Self-Paced Practice */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="w-10 h-10 rounded bg-blue-50 border border-blue-105 flex items-center justify-center text-blue-700 mb-4 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 font-bold" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 mb-2">Self-Paced Case Prep</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
              Review and answer 12 high-frequency financial scenario challenges. Input your STAR+F draft, toggle model answers, and chart your progress logs offline.
            </p>
          </div>
          <button
            onClick={onStartPractice}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors cursor-pointer group"
            id="start_practice_mode_btn"
          >
            <span>Activate Practice Mode</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mode 2: Live AI Mock Interview */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="w-10 h-10 rounded bg-blue-50 border border-blue-105 flex items-center justify-center text-blue-700 mb-4 group-hover:scale-105 transition-transform">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 mb-2">Live AI Mock Interview</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
              Roleplay with our interactive simulated interviewer. Provide free-text responses, encounter sudden follow-ups, and get detailed evaluation points with strict out-of-5 scoring.
            </p>
          </div>
          <button
            onClick={onStartMock}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-blue-850 hover:bg-blue-900 rounded-lg shadow-sm transition-colors cursor-pointer group"
            id="start_mock_mode_btn"
          >
            <span>Launch Mock Interview</span>
            <Play className="w-3.5 h-3.5 fill-white group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* STAR+F Framework Breakdown Section */}
      <motion.div 
        className="bg-slate-55 border border-slate-200 rounded-xl p-6 sm:p-8"
        variants={itemVariants}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-blue-700 font-bold text-xs sm:text-sm tracking-widest uppercase">STAR+F Framework Breakdown</span>
          <div className="h-[1px] flex-1 bg-slate-200"></div>
        </div>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
          Senior directors assess candidates on structured analytical thinking and error prevention. The augmented STAR structure introduces high-standard **Follow-Up (+F)** protocols to model continuous operational improvement:
        </p>

        {/* Framework Steps Stack */}
        <div className="space-y-3">
          {starFramework.map((step, index) => (
            <div key={index} className="flex gap-4 p-3.5 bg-white border border-slate-200 rounded-lg">
              <div className={`w-8 h-8 shrink-0 font-display font-black text-xs flex items-center justify-center rounded border ${step.color}`}>
                {step.letter}
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-800 text-sm leading-none mb-1">
                  {step.title}
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Corporate Disclaimer footnote */}
      <motion.div 
        className="text-center mt-10 text-xs text-slate-400 font-medium"
        variants={itemVariants}
      >
        Designed to simulate standard Corporate Finance, FP&A Controller, and MIS Executive level assessments.
      </motion.div>
    </motion.div>
  );
}
