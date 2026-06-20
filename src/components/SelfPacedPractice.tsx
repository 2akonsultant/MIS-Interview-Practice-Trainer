import React, { useState } from 'react';
import { SCENARIOS } from '../data';
import { Scenario, PracticeState } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, AlertCircle, Sparkles, HelpCircle, Eye, CornerDownRight, Check, RefreshCw } from 'lucide-react';

interface SelfPacedPracticeProps {
  state: PracticeState;
  onChangeState: (newState: PracticeState | ((prev: PracticeState) => PracticeState)) => void;
  onReset: () => void;
}

const STARF_TEMPLATE = `Situation: \n\nTask: \n\nAction: \n\nResult: \n\nFollow-up: `;

export default function SelfPacedPractice({ state, onChangeState, onReset }: SelfPacedPracticeProps) {
  const currentScenario = SCENARIOS.find(s => s.id === state.currentScenarioId) || SCENARIOS[0];
  const totalScenarios = SCENARIOS.length;
  
  // Local state for the current scene in view
  const currentAnswer = state.userAnswers[currentScenario.id] || "";
  const isRevealed = state.revealedIds.includes(currentScenario.id);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    onChangeState(prev => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [currentScenario.id]: val
      }
    }));
  };

  const insertTemplate = () => {
    if (!currentAnswer.trim() || window.confirm("This will replace your current text with the STAR+F blank template. Continue?")) {
      onChangeState(prev => ({
        ...prev,
        userAnswers: {
          ...prev.userAnswers,
          [currentScenario.id]: STARF_TEMPLATE
        }
      }));
    }
  };

  const revealModelAnswer = () => {
    if (!state.revealedIds.includes(currentScenario.id)) {
      onChangeState(prev => {
        const nextRevealed = [...prev.revealedIds, currentScenario.id];
        const nextPracticed = prev.practicedIds.includes(currentScenario.id) 
          ? prev.practicedIds 
          : [...prev.practicedIds, currentScenario.id];
        return {
          ...prev,
          revealedIds: nextRevealed,
          practicedIds: nextPracticed
        };
      });
    }
  };

  const handleNext = () => {
    const currentIndex = SCENARIOS.findIndex(s => s.id === state.currentScenarioId);
    if (currentIndex < totalScenarios - 1) {
      onChangeState(prev => ({
        ...prev,
        currentScenarioId: SCENARIOS[currentIndex + 1].id
      }));
    }
  };

  const handlePrev = () => {
    const currentIndex = SCENARIOS.findIndex(s => s.id === state.currentScenarioId);
    if (currentIndex > 0) {
      onChangeState(prev => ({
        ...prev,
        currentScenarioId: SCENARIOS[currentIndex - 1].id
      }));
    }
  };

  const jumpToScenario = (id: number) => {
    onChangeState(prev => ({
      ...prev,
      currentScenarioId: id
    }));
  };

  // Check if everything has been completed/revealed
  const allCompleted = state.practicedIds.length === totalScenarios;
  const progressPercent = Math.round((state.practicedIds.length / totalScenarios) * 100);

  if (allCompleted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border border-slate-200 shadow-xl rounded-2xl p-8 sm:p-12 mb-8"
        >
          <div className="w-20 h-20 bg-blue-50 border border-blue-200 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>
          
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mb-4 tracking-tight uppercase">
            Congratulations!
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto mb-8 font-sans leading-relaxed">
            You have successfully completed and practiced all <strong>{totalScenarios} scenario cases</strong>! You have examined the professional model responses and tested your reflexes on key financial variables.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 text-left max-w-xl mx-auto">
            <h3 className="font-display font-bold text-slate-800 text-sm tracking-wide uppercase mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600 fill-blue-600" />
              STAR+F Core Reflection
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-sans">
              <li>• <strong className="text-slate-800">Situation:</strong> Always start with a precise description of the mismatch or cash/variance variance details.</li>
              <li>• <strong className="text-slate-800">Task:</strong> Acknowledge your specific commercial fiduciary duty within the finance team.</li>
              <li>• <strong className="text-slate-800">Action:</strong> Outline Excel verification checklists, source validation, and stakeholder diplomacy.</li>
              <li>• <strong className="text-slate-800">Result:</strong> Target quantifiable recovery steps or reconciliation schedules.</li>
              <li>• <strong className="text-slate-800">Follow-up (+F):</strong> Enforce defensive checks (like standard checklists or pipeline scripts) so issues do not recur.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-sm transition-all text-sm cursor-pointer"
              id="congrats_restart_btn"
            >
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
              <span>Reset & Practice Again</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 grid lg:grid-cols-12 gap-6 items-stretch">
      
      {/* 1. LEFT PANEL: Scenario Navigator (3 Columns) */}
      <aside className="lg:col-span-3 bg-white rounded-xl shadow-xs border border-slate-200 flex flex-col justify-between h-[640px] sticky top-20">
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          {/* Progress Header */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 rounded-t-xl shrink-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Scenarios</h3>
              <span className="text-[11px] font-bold text-blue-600">
                {state.practicedIds.length} of {totalScenarios} Practiced
              </span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Scenarios Scrollable List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {SCENARIOS.map((scen) => {
              const isActive = scen.id === state.currentScenarioId;
              const isCompleted = state.practicedIds.includes(scen.id);

              return (
                <button
                  key={scen.id}
                  onClick={() => jumpToScenario(scen.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors cursor-pointer group ${
                    isActive
                      ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-500/10'
                      : 'bg-white border-transparent hover:bg-slate-50'
                  }`}
                  id={`practice_nav_item_${scen.id}`}
                >
                  {isCompleted ? (
                    <span className="w-6 h-6 shrink-0 flex items-center justify-center bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                      ✓
                    </span>
                  ) : (
                    <span className={`w-6 h-6 shrink-0 flex items-center justify-center text-xs font-bold rounded-full border ${
                      isActive 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-slate-100 text-slate-500 border-slate-200 group-hover:bg-slate-200'
                    }`}>
                      {scen.id < 10 ? `0${scen.id}` : scen.id}
                    </span>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold truncate ${
                      isActive 
                        ? 'text-blue-900 font-bold' 
                        : isCompleted 
                          ? 'text-slate-400 italic line-through' 
                          : 'text-slate-700'
                    }`}>
                      {scen.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Localized Reset progress button */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/20 rounded-b-xl shrink-0">
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset all of your writing progress across all cases?")) {
                onReset();
              }
            }}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 text-xs font-bold uppercase tracking-widest rounded-md border border-slate-200 transition-colors cursor-pointer"
            id="reset_session_progress_btn"
          >
            Reset Progress
          </button>
        </div>
      </aside>

      {/* 2. CENTER PANEL: Workspace (6 Columns) */}
      <section className="lg:col-span-6 flex flex-col gap-5 justify-between">
        {/* Scenario Card */}
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-xs border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-blue-600 font-bold text-xs tracking-widest uppercase">
              Scenario {currentScenario.id < 10 ? `0${currentScenario.id}` : currentScenario.id}
            </span>
            <div className="h-[1px] flex-1 bg-slate-100"></div>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 uppercase tracking-tight">
            {currentScenario.title}
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            {currentScenario.scenario}
          </p>
        </div>

        {/* Response Area */}
        <div className="flex-1 bg-white rounded-xl shadow-xs border border-slate-200 flex flex-col overflow-hidden min-h-[420px]">
          {/* Workspace Tabs Header */}
          <div className="flex bg-slate-50 border-b border-slate-200 shrink-0">
            <button
              className="px-5 py-3 border-r border-slate-200 bg-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 text-slate-800"
              disabled
            >
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              Your Draft Response
            </button>
            <button
              onClick={revealModelAnswer}
              className="px-5 py-3 text-slate-400 hover:text-blue-600 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer ml-auto"
              id="tabs_ai_preview_btn"
            >
              {isRevealed ? "Model Answer Active" : "Reveal Model Approach"}
            </button>
          </div>

          {/* Live Draft Station Form */}
          <div className="flex-1 p-5 relative flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                Write in Markdown / Bullet points:
              </span>

              <button
                onClick={insertTemplate}
                className="text-[10px] text-blue-700 hover:text-blue-900 font-bold uppercase tracking-wide cursor-pointer"
                id="workspace_template_trigger"
              >
                [ Use STAR+F Template ]
              </button>
            </div>

            <textarea
              value={currentAnswer}
              onChange={handleTextChange}
              placeholder="Situation: Explain the context... &#10;Task: Identify your specific goal... &#10;Action: Detail your investigation steps... &#10;Result: State the outcome... &#10;Follow-up: How will you prevent this?"
              className="flex-1 w-full resize-none text-slate-700 focus:outline-hidden leading-relaxed placeholder:text-slate-300 font-mono text-sm border-0 focus:ring-0 p-0"
              id={`workspace_textarea_case_${currentScenario.id}`}
            />

            {/* Bottom Floating Action Row inside panel */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  if (window.confirm("Clear typed response draft?")) {
                    onChangeState(prev => ({
                      ...prev,
                      userAnswers: { ...prev.userAnswers, [currentScenario.id]: "" }
                    }));
                  }
                }}
                className="flex items-center gap-1 text-slate-405 hover:text-red-650 text-xs font-semibold transition-colors cursor-pointer"
                id="workspace_clear_btn"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Block</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={revealModelAnswer}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-md border border-slate-200 transition-colors cursor-pointer"
                  id="workspace_reveal_btn"
                >
                  {isRevealed ? "Approach Displayed" : "Reveal Model"}
                </button>
                <button
                  onClick={() => {
                    revealModelAnswer(); // Ensure marked practiced
                    handleNext();
                  }}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-md shadow-sm select-none transition-colors cursor-pointer"
                  id="workspace_save_next_btn"
                >
                  Save & Next Scenario
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Prev/Next footer bar */}
        <div className="flex justify-between items-center bg-white border border-slate-200 rounded-lg p-2 shrink-0">
          <button
            onClick={handlePrev}
            disabled={SCENARIOS.findIndex(s => s.id === state.currentScenarioId) === 0}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
            id="panel_prev_btn"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>
          
          <span className="text-xs font-mono font-semibold text-slate-450 uppercase">
            Case {currentScenario.id} of {totalScenarios}
          </span>
          
          <button
            onClick={handleNext}
            disabled={SCENARIOS.findIndex(s => s.id === state.currentScenarioId) === totalScenarios - 1}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-605 hover:text-slate-900 hover:bg-slate-50 rounded-md disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
            id="panel_next_btn"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. RIGHT PANEL: Framework Guide & Model Response (3 Columns) */}
      <aside className="lg:col-span-3 flex flex-col gap-5 justify-between">
        
        {/* Framework Reference details */}
        <div className="bg-indigo-950 text-slate-50 p-5 rounded-xl shadow-xs shrink-0 border border-indigo-900">
          <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-305 mb-3.5">
            STAR+F Reference
          </h4>
          <div className="space-y-3">
            <div className="flex gap-2.5 items-start">
              <span className="text-[11px] font-black w-4 h-4 rounded bg-indigo-900 border border-indigo-800 text-indigo-300 inline-flex items-center justify-center shrink-0">S</span>
              <p className="text-[11px] leading-relaxed text-indigo-100">Describe the financial mismatch precisely.</p>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="text-[11px] font-black w-4 h-4 rounded bg-indigo-900 border border-indigo-800 text-indigo-300 inline-flex items-center justify-center shrink-0">T</span>
              <p className="text-[11px] leading-relaxed text-indigo-100">Identify your clear partner responsibility.</p>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="text-[11px] font-black w-4 h-4 rounded bg-indigo-900 border border-indigo-800 text-indigo-300 inline-flex items-center justify-center shrink-0">A</span>
              <p className="text-[11px] leading-relaxed text-indigo-100">Step-by-step formula checks & raw comparisons.</p>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="text-[11px] font-black w-4 h-4 rounded bg-indigo-900 border border-indigo-800 text-indigo-300 inline-flex items-center justify-center shrink-0">R</span>
              <p className="text-[11px] leading-relaxed text-indigo-100">Quantifiable correction summary ledger.</p>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="text-[11px] font-black w-4 h-4 rounded bg-indigo-905 border border-indigo-800 text-indigo-305 inline-flex items-center justify-center shrink-0">+F</span>
              <p className="text-[11px] leading-relaxed text-indigo-100">Deploy proactive checkpoints to avoid recursion.</p>
            </div>
          </div>
        </div>

        {/* Model Solution Box / Expert Insights Area */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 mb-3 text-slate-800">
              <Sparkles className="w-4 h-4 text-blue-600 fill-blue-50" />
              <h5 className="font-display font-semibold text-xs uppercase tracking-wider">
                Expert Guidelines
              </h5>
            </div>

            <AnimatePresence mode="wait">
              {isRevealed ? (
                <motion.div
                  key="model-active"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <p className="text-[11px] text-slate-400 italic">
                    How high-performing analysts present this:
                  </p>
                  
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {currentScenario.modelApproach.map((item, idx) => (
                      <div key={idx} className="flex gap-1.5 items-start">
                        <span className="text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-100 w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="model-locked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-2.5">
                    <Eye className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-slate-405 leading-relaxed max-w-[170px] mx-auto">
                    Toggle <strong className="text-slate-600">Reveal Model Answer</strong> to contrast with strategic analytical standards.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-amber-50 border border-amber-250/65 rounded-lg p-3 text-amber-900 mt-4">
            <h6 className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-amber-700" /> Executive Tip
            </h6>
            <p className="text-[11px] leading-relaxed italic">
              "In MIS validation, speed combined with verifiable audit trails builds immediate institutional trust."
            </p>
          </div>
        </div>

      </aside>

    </div>
  );
}
