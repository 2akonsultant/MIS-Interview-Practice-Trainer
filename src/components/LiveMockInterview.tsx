import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Award, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  RotateCcw, 
  HelpCircle,
  GraduationCap,
  Users,
  Briefcase,
  Database,
  Sliders,
  Lightbulb,
  Search,
  Filter,
  Lock,
  Shield,
  Trash2,
  Download,
  LogOut,
  Calendar,
  ArrowUpDown,
  User
} from 'lucide-react';
import { SCENARIOS, Scenario, Option } from '../data/scenarios';

// Category meta details for presentation
interface CategoryMeta {
  id: number;
  name: string;
  scenariosRange: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

const CATEGORIES_META: Record<number, CategoryMeta> = {
  1: {
    id: 1,
    name: "MIS & Finance",
    scenariosRange: "1–12",
    icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-50/70",
    borderColor: "border-blue-200",
    description: "Focuses on financial reporting, data mismatches, budget overruns, cost variance, and confidential metrics."
  },
  2: {
    id: 2,
    name: "Requirement Gathering & Stakeholder Management",
    scenariosRange: "13–22",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50/70",
    borderColor: "border-purple-200",
    description: "Deals with elicitation techniques, mid-project changes, unavailable sponsors, and aligning stakeholder expectations."
  },
  3: {
    id: 3,
    name: "Banking & Financial Services",
    scenariosRange: "23–32",
    icon: Award,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50/70",
    borderColor: "border-emerald-200",
    description: "Covers core banking transaction flows, failed fund routing, regulatory adjustments, and fraud containment audits."
  },
  4: {
    id: 4,
    name: "Data Analysis",
    scenariosRange: "33–42",
    icon: Database,
    color: "text-amber-600",
    bgColor: "bg-amber-50/70",
    borderColor: "border-amber-200",
    description: "Addresses multi-source inconsistencies, customer satisfaction analysis, missing records, and exploratory insights."
  },
  5: {
    id: 5,
    name: "Process Improvement",
    scenariosRange: "43–52",
    icon: Sliders,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50/70",
    borderColor: "border-indigo-200",
    description: "Explores workflow optimization, reducing turnaround times, system automation, and error containment."
  },
  6: {
    id: 6,
    name: "Problem Solving & Decision Making",
    scenariosRange: "53–62",
    icon: Lightbulb,
    color: "text-rose-600",
    bgColor: "bg-rose-50/70",
    borderColor: "border-rose-200",
    description: "Navigates last-minute project critical issues, technical blockers, stakeholder demands, and staff replacements."
  }
};

function shuffleOptions(options: Option[]): Option[] {
  const result = [...options];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function formatDate(date: Date): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minStr = minutes < 10 ? "0" + minutes : minutes;
  
  return `${day} ${month} ${year} ${hours}:${minStr} ${ampm}`;
}

function saveAttemptToLocalStorage(attempt: any) {
  try {
    const existingScoresJson = localStorage.getItem("mis_scores");
    const existingScores = existingScoresJson ? JSON.parse(existingScoresJson) : [];
    if (Array.isArray(existingScores)) {
      existingScores.push(attempt);
      localStorage.setItem("mis_scores", JSON.stringify(existingScores));
    } else {
      localStorage.setItem("mis_scores", JSON.stringify([attempt]));
    }
  } catch (error) {
    console.error("localStorage not available or blocked:", error);
  }
}

function getCategoryForScenario(scenarioNumber: number): number {
  const sc = SCENARIOS.find(s => s.id === scenarioNumber);
  return sc ? sc.category : 0;
}

export default function LiveMockInterview() {
  const [currentStep, setCurrentStep] = useState<'landing' | 'learn-intro' | 'learning' | 'quiz' | 'results' | 'category-learn-completed'>('landing');
  
  // Role & Login State
  const [role, setRole] = useState<'login' | 'candidate' | 'admin'>('login');
  const [candidateName, setCandidateName] = useState<string>('');
  
  // Login fields
  const [inputName, setInputName] = useState<string>('');
  const [inputPin, setInputPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);

  // Global keyboard shortcut: Ctrl + Shift + A to open Admin modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (role === 'login' && e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setShowAdminModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [role]);
  
  // Storage availability
  const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState<boolean>(true);
  
  // Admin dashboard states
  const [allAttempts, setAllAttempts] = useState<any[]>([]);
  const [selectedAttempt, setSelectedAttempt] = useState<any | null>(null);
  const [adminSearchName, setAdminSearchName] = useState<string>('');
  const [adminFilterCategory, setAdminFilterCategory] = useState<string>('All');
  const [adminFilterMode, setAdminFilterMode] = useState<string>('All');
  const [adminSortKey, setAdminSortKey] = useState<string>('date');
  const [adminSortDirection, setAdminSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  // Check localStorage availability on mount
  useEffect(() => {
    try {
      localStorage.setItem('__test_ls__', '1');
      localStorage.removeItem('__test_ls__');
      setIsLocalStorageAvailable(true);
    } catch (e) {
      setIsLocalStorageAvailable(false);
    }
  }, []);

  // Reload all attempts for Admin when role becomes admin
  useEffect(() => {
    if (role === 'admin') {
      try {
        const existingScoresJson = localStorage.getItem('mis_scores');
        setAllAttempts(existingScoresJson ? JSON.parse(existingScoresJson) : []);
      } catch (error) {
        console.error("Failed to read mis_scores", error);
      }
    }
  }, [role]);

  // Progress indexes
  const [learningIndex, setLearningIndex] = useState<number>(0);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  
  // Shuffled options for current quiz scenario
  const [activeQuizOptions, setActiveQuizOptions] = useState<Option[]>([]);
  const [selectedOptionText, setSelectedOptionText] = useState<string>('');
  
  // Results log state
  const [userSelections, setUserSelections] = useState<{
    scenarioId: number;
    scenarioTitle: string;
    scenarioText: string;
    category: number;
    categoryName: string;
    selectedText: string;
    correctText: string;
    isCorrect: boolean;
  }[]>([]);

  // Results display state (filtering and searching)
  const [selectedResultCategoryFilter, setSelectedResultCategoryFilter] = useState<number | 'all'>('all');
  const [resultsSearchQuery, setResultsSearchQuery] = useState<string>('');

  // Mode and Category selection
  const [mode, setMode] = useState<'full' | 'category'>('full');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // In-memory score persistence per session
  const [completedAssessments, setCompletedAssessments] = useState<Record<string | number, {
    correct: number;
    total: number;
    accuracy: number;
    date: string;
  }>>({});

  // Scenarios list scoped by mode
  const activeScenarios = selectedCategory
    ? SCENARIOS.filter(s => s.category === selectedCategory)
    : SCENARIOS;

  // When current step is quiz and index changes, prepare shuffled options
  useEffect(() => {
    if (currentStep === 'quiz' && activeScenarios[quizIndex]) {
      const originalOptions = activeScenarios[quizIndex].options;
      setActiveQuizOptions(shuffleOptions(originalOptions));
      setSelectedOptionText('');
    }
  }, [quizIndex, currentStep, selectedCategory]);

  const handleRestart = () => {
    setLearningIndex(0);
    setQuizIndex(0);
    setSelectedOptionText('');
    setUserSelections([]);
    setSelectedResultCategoryFilter('all');
    setResultsSearchQuery('');
    setMode('full');
    setSelectedCategory(null);
    setCurrentStep('landing');
  };

  const handleStartLearning = () => {
    setMode('full');
    setSelectedCategory(null);
    setLearningIndex(0);
    // Go to category introduction screen first
    setCurrentStep('learn-intro');
  };

  const handleStartFullMock = () => {
    setMode('full');
    setSelectedCategory(null);
    setQuizIndex(0);
    setUserSelections([]);
    setCurrentStep('quiz');
  };

  const handleStartCategoryLearn = (categoryId: number) => {
    setMode('category');
    setSelectedCategory(categoryId);
    setLearningIndex(0);
    setCurrentStep('learning');
  };

  const handleStartCategoryMock = (categoryId: number) => {
    setMode('category');
    setSelectedCategory(categoryId);
    setQuizIndex(0);
    setUserSelections([]);
    setCurrentStep('quiz');
  };

  const handleNextLearn = () => {
    const currentScenario = activeScenarios[learningIndex];
    const nextScenario = activeScenarios[learningIndex + 1];

    if (nextScenario) {
      if (mode === 'full' && currentScenario.category !== nextScenario.category) {
        // We crossed a category boundary! Show the category transition intro page first.
        setLearningIndex(prev => prev + 1);
        setCurrentStep('learn-intro');
      } else {
        // Same category (or in category mode), proceed card-by-card
        setLearningIndex(prev => prev + 1);
      }
    } else {
      // Done learning
      if (mode === 'category') {
        setCurrentStep('category-learn-completed');
      } else {
        // Done learning full -> start the 62-question MCQ Mock Interview
        setQuizIndex(0);
        setUserSelections([]);
        setCurrentStep('quiz');
      }
    }
  };

  const handleSkipIntro = () => {
    setCurrentStep('learning');
  };

  const handleSelectOption = (text: string) => {
    setSelectedOptionText(text);
  };

  const handleSubmitQuizAnswer = () => {
    if (!selectedOptionText) return;

    const currentScenario = activeScenarios[quizIndex];
    const correctOption = currentScenario.options.find(opt => opt.isCorrect);
    const correctText = correctOption ? correctOption.text : '';
    const isCorrect = selectedOptionText === correctText;

    const selectionItem = {
      scenarioId: currentScenario.id,
      scenarioTitle: currentScenario.title,
      scenarioText: currentScenario.scenario,
      category: currentScenario.category,
      categoryName: currentScenario.categoryName,
      selectedText: selectedOptionText,
      correctText: correctText,
      isCorrect: isCorrect
    };

    const updatedSelections = [...userSelections, selectionItem];
    setUserSelections(updatedSelections);

    if (quizIndex < activeScenarios.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      // Quiz finished! Save the score in session memory
      const correctCount = updatedSelections.filter(sel => sel.isCorrect).length;
      const totalCount = activeScenarios.length;
      const accuracy = Math.round((correctCount / totalCount) * 100);
      
      const sessionKey = mode === 'category' ? selectedCategory! : 'full';
      setCompletedAssessments(prev => ({
        ...prev,
        [sessionKey]: {
          correct: correctCount,
          total: totalCount,
          accuracy: accuracy,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      }));

      // Silently save attempt to localStorage
      const attemptDate = formatDate(new Date());
      const attemptCategoryName = mode === 'category' && selectedCategory
        ? CATEGORIES_META[selectedCategory].name
        : "All Categories";

      const attemptRecord = {
        name: candidateName || "Candidate",
        date: attemptDate,
        mode: mode === 'category' ? 'Category' : 'Full',
        category: attemptCategoryName,
        score: correctCount,
        total: totalCount,
        percentage: accuracy,
        breakdown: updatedSelections.map(sel => ({
          scenarioNumber: sel.scenarioId,
          title: sel.scenarioTitle,
          selectedAnswer: sel.selectedText,
          correct: sel.isCorrect,
          correctAnswer: sel.correctText
        }))
      };

      saveAttemptToLocalStorage(attemptRecord);

      setCurrentStep('results');
    }
  };

  const handleCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    setCandidateName(inputName.trim());
    setRole('candidate');
    setCurrentStep('landing');
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPin === '2025') {
      setRole('admin');
      setPinError('');
      setShowAdminModal(false);
    } else {
      setPinError('Incorrect PIN. Try again.');
    }
  };

  const handleLogout = () => {
    setRole('login');
    setInputName('');
    setInputPin('');
    setPinError('');
    setShowAdminModal(false);
    setCandidateName('');
    setSelectedAttempt(null);
  };

  const handleSortClick = (key: string) => {
    if (adminSortKey === key) {
      setAdminSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setAdminSortKey(key);
      setAdminSortDirection('desc');
    }
  };

  const renderSortIndicator = (key: string) => {
    if (adminSortKey !== key) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 ml-1.5 inline" />;
    }
    return adminSortDirection === 'asc' 
      ? <span className="text-blue-500 font-bold ml-1.5 text-xs">▲</span> 
      : <span className="text-blue-500 font-bold ml-1.5 text-xs">▼</span>;
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Date", "Mode", "Category", "Score", "Total", "Percentage"];
    const rows = sortedAttempts.map(a => [
      `"${(a.name || '').replace(/"/g, '""')}"`,
      `"${a.date || ''}"`,
      `"${a.mode || ''}"`,
      `"${(a.category || '').replace(/"/g, '""')}"`,
      a.score,
      a.total,
      `"${a.percentage}%"`
    ]);
    
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `candidate_scores_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryPerformance = (attempt: any) => {
    const performance: Record<number, { correct: number; total: number }> = {};
    if (!attempt || !attempt.breakdown) return performance;
    
    attempt.breakdown.forEach((item: any) => {
      const catId = getCategoryForScenario(item.scenarioNumber);
      if (catId) {
        if (!performance[catId]) {
          performance[catId] = { correct: 0, total: 0 };
        }
        performance[catId].total += 1;
        if (item.correct) {
          performance[catId].correct += 1;
        }
      }
    });
    return performance;
  };

  // Formatted categories for admin filter
  const adminCategoriesList = [
    "All", 
    "MIS & Finance", 
    "Requirement Gathering & Stakeholder Management", 
    "Banking & Financial Services", 
    "Data Analysis", 
    "Process Improvement", 
    "Problem Solving & Decision Making"
  ];

  // Helper to parse custom formatted date
  const parseCustomDate = (dateStr: string) => {
    try {
      return new Date(dateStr).getTime() || 0;
    } catch (e) {
      return 0;
    }
  };

  // Filter and search results for Admin view
  const filteredAttempts = allAttempts.filter(attempt => {
    const matchesName = (attempt.name || '').toLowerCase().includes(adminSearchName.toLowerCase());
    const matchesCategory = adminFilterCategory === 'All' || attempt.category === adminFilterCategory;
    const matchesMode = adminFilterMode === 'All' || attempt.mode === adminFilterMode;
    return matchesName && matchesCategory && matchesMode;
  });

  const sortedAttempts = [...filteredAttempts].sort((a, b) => {
    let valA: any = a[adminSortKey];
    let valB: any = b[adminSortKey];
    
    if (adminSortKey === 'date') {
      valA = parseCustomDate(a.date);
      valB = parseCustomDate(b.date);
    } else if (adminSortKey === 'percentage' || adminSortKey === 'score') {
      valA = Number(a[adminSortKey]) || 0;
      valB = Number(b[adminSortKey]) || 0;
    } else {
      valA = String(a[adminSortKey] || '').toLowerCase();
      valB = String(b[adminSortKey] || '').toLowerCase();
    }
    
    if (valA < valB) return adminSortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return adminSortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Calculate stats
  const uniqueCandidatesCount = new Set(allAttempts.map(a => (a.name || '').trim().toLowerCase())).size;
  const totalAttemptsCount = allAttempts.length;
  const avgPercentage = totalAttemptsCount > 0 
    ? Math.round(allAttempts.reduce((sum, a) => sum + (a.percentage || 0), 0) / totalAttemptsCount) 
    : 0;

  let highestScoreAttempt: any = null;
  if (allAttempts.length > 0) {
    highestScoreAttempt = allAttempts.reduce((max, a) => {
      if (!max) return a;
      if ((a.percentage || 0) > (max.percentage || 0)) return a;
      if ((a.percentage || 0) === (max.percentage || 0) && (a.score || 0) > (max.score || 0)) return a;
      return max;
    }, null);
  }

  // Filter and search results for Candidate Results step
  const filteredSelections = userSelections.filter(sel => {
    const matchesCategory = selectedResultCategoryFilter === 'all' || sel.category === selectedResultCategoryFilter;
    const matchesSearch = sel.scenarioTitle.toLowerCase().includes(resultsSearchQuery.toLowerCase()) || 
                          sel.scenarioText.toLowerCase().includes(resultsSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (role === 'login') {
    return (
      <div className="bg-slate-50 min-h-screen py-8 sm:py-16 px-4 flex flex-col items-center justify-center transition-all duration-300 animate-fade-in relative">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
          {/* Header section */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-slate-800 text-blue-400 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display uppercase">
                MIS Interview Practice Trainer
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
                Securely manage, practice, and evaluate real-world MIS corporate scenarios.
              </p>
            </div>
          </div>
          
          {/* Form */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 font-display text-center">
                Candidate Entry Portal
              </h2>
              <p className="text-xs text-slate-500 text-center leading-relaxed">
                Start your training process. Solve scenario dilemmas, learn expected corporate strategies, and test your knowledge.
              </p>
            </div>
            
            <form onSubmit={handleCandidateSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="candidate_name_input" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Your Full Name
                </label>
                <input
                  id="candidate_name_input"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium text-slate-800"
                />
              </div>
              
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-3xs uppercase tracking-wider select-none cursor-pointer"
                id="candidate_submit_btn"
              >
                <span>Start as Candidate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
          
          {/* Footer note */}
          <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 text-center flex flex-col items-center justify-center gap-1.5">
            <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider block">
              Authorized Corporate Training Portal • Version 2026.1
            </span>
            <button 
              onClick={() => setShowAdminModal(true)}
              className="text-[9px] text-slate-300 hover:text-slate-400 font-mono transition-colors cursor-pointer select-none border-none bg-transparent"
              title="Admin access panel link"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Hidden Admin Entry Modal Overlay */}
        {showAdminModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-sm w-full text-center space-y-4 shadow-xl animate-scale-up animate-fade-in">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-slate-900">Admin Console Access</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enter authorized PIN to view candidates' performance statistics.
                </p>
              </div>

              <form onSubmit={handleAdminSubmit} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label htmlFor="admin_pin_input" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Admin Access PIN
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="admin_pin_input"
                      type="password"
                      placeholder="Enter Admin PIN"
                      value={inputPin}
                      onChange={(e) => {
                        setInputPin(e.target.value);
                        if (pinError) setPinError('');
                      }}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-mono font-medium text-slate-800"
                    />
                  </div>
                  {pinError && (
                    <span className="text-xs font-semibold text-rose-600 flex items-center gap-1 mt-1" id="admin_pin_error">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{pinError}</span>
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-3xs uppercase tracking-wider select-none cursor-pointer"
                    id="admin_submit_btn"
                  >
                    <span>Access</span>
                    <Shield className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminModal(false);
                      setInputPin('');
                      setPinError('');
                    }}
                    className="w-full px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (role === 'admin') {
    return (
      <div className="bg-slate-50 min-h-screen py-8 sm:py-12 px-4 transition-all duration-300 animate-fade-in">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-5 rounded-2xl shadow-3xs">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 text-blue-400 rounded-xl">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">Operations Center</span>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight font-display uppercase">Admin Audit Console</h1>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all uppercase tracking-wider cursor-pointer"
              id="admin_logout_btn"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Logout</span>
            </button>
          </div>

          {/* LocalStorage warning if unavailable */}
          {!isLocalStorageAvailable && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 shadow-3xs">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800 font-semibold">
                Note: localStorage unavailable in this browser — scores may not persist.
              </div>
            </div>
          )}

          {/* SUMMARY STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1: Unique Candidates */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block truncate">Total Candidates</span>
                <span className="text-2xl font-black text-slate-800 font-mono block">{uniqueCandidatesCount}</span>
              </div>
            </div>

            {/* Stat 2: Total Attempts */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block truncate">Total Attempts</span>
                <span className="text-2xl font-black text-slate-800 font-mono block">{totalAttemptsCount}</span>
              </div>
            </div>

            {/* Stat 3: Avg score */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block truncate">Average Score</span>
                <span className="text-2xl font-black text-slate-800 font-mono block">{avgPercentage}%</span>
              </div>
            </div>

            {/* Stat 4: Highest score */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block truncate">Highest Score</span>
                {highestScoreAttempt ? (
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-800 truncate block">
                      {highestScoreAttempt.name}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-blue-600 block">
                      {highestScoreAttempt.score}/{highestScoreAttempt.total} ({highestScoreAttempt.percentage}%)
                    </span>
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-slate-400 block mt-1">No scores yet</span>
                )}
              </div>
            </div>
          </div>

          {/* FILTER / SEARCH BAR */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filters & Controls
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by candidate name..."
                  value={adminSearchName}
                  onChange={(e) => setAdminSearchName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <select
                  value={adminFilterCategory}
                  onChange={(e) => setAdminFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                >
                  {adminCategoriesList.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === "All" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mode Dropdown */}
              <div>
                <select
                  value={adminFilterMode}
                  onChange={(e) => setAdminFilterMode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                >
                  <option value="All">All Modes</option>
                  <option value="Category">Category Mode</option>
                  <option value="Full">Full Mode</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setAdminSearchName('');
                    setAdminFilterCategory('All');
                    setAdminFilterMode('All');
                  }}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-all cursor-pointer uppercase tracking-wider"
                  title="Clear all active filters"
                >
                  Clear Filters
                </button>
                <button
                  onClick={handleExportCSV}
                  disabled={sortedAttempts.length === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white text-xs font-bold rounded-lg transition-all cursor-pointer uppercase tracking-wider"
                  title="Download matching scores as CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>
          </div>

          {/* DATA TABLE CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-3xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-[10px] uppercase tracking-wider">
                    <th 
                      onClick={() => handleSortClick('name')}
                      className="px-5 py-3.5 cursor-pointer select-none hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center">
                        <span>Name</span>
                        {renderSortIndicator('name')}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSortClick('date')}
                      className="px-5 py-3.5 cursor-pointer select-none hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center">
                        <span>Date</span>
                        {renderSortIndicator('date')}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSortClick('mode')}
                      className="px-5 py-3.5 cursor-pointer select-none hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center">
                        <span>Mode</span>
                        {renderSortIndicator('mode')}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSortClick('category')}
                      className="px-5 py-3.5 cursor-pointer select-none hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center">
                        <span>Category</span>
                        {renderSortIndicator('category')}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSortClick('score')}
                      className="px-5 py-3.5 cursor-pointer select-none hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center">
                        <span>Score</span>
                        {renderSortIndicator('score')}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSortClick('percentage')}
                      className="px-5 py-3.5 cursor-pointer select-none hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center">
                        <span>Percentage</span>
                        {renderSortIndicator('percentage')}
                      </div>
                    </th>
                    <th className="px-5 py-3.5 select-none">
                      <span>Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {sortedAttempts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center text-slate-400 italic">
                        No historical attempts matched your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    sortedAttempts.map((attempt, index) => (
                      <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 font-bold text-slate-800 whitespace-nowrap">
                          {attempt.name}
                        </td>
                        <td className="px-5 py-3.5 text-slate-500 font-mono whitespace-nowrap">
                          {attempt.date}
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                            attempt.mode === 'Full' 
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-150' 
                              : 'bg-blue-50 text-blue-700 border border-blue-150'
                          }`}>
                            {attempt.mode}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 truncate max-w-[200px]" title={attempt.category}>
                          {attempt.category}
                        </td>
                        <td className="px-5 py-3.5 font-mono">
                          {attempt.score} / {attempt.total}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold font-mono">{attempt.percentage}%</span>
                            <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200 shrink-0">
                              <div 
                                className={`h-full ${
                                  attempt.percentage >= 90 ? 'bg-emerald-500' :
                                  attempt.percentage >= 70 ? 'bg-blue-500' : 'bg-amber-500'
                                }`}
                                style={{ width: `${attempt.percentage}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <button
                            onClick={() => setSelectedAttempt(attempt)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-bold uppercase text-[10px] transition-all cursor-pointer"
                          >
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* DANGER AREA ROW (CLEAR ALL DATA) */}
          <div className="flex justify-end pt-4">
            <button
              onClick={() => setShowClearConfirm(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl transition-all uppercase tracking-wider cursor-pointer"
              id="clear_all_scores_btn"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Data</span>
            </button>
          </div>
        </div>

        {/* Audit Details Modal Overlays */}
        {selectedAttempt && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full max-h-[85vh] flex flex-col shadow-xl animate-scale-up">
              {/* Header */}
              <div className="bg-slate-900 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between shrink-0">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-400 block uppercase">Candidate Attempt Audit</span>
                  <h3 className="font-display font-bold text-base">{selectedAttempt.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedAttempt(null)}
                  className="text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
              </div>
              
              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Metadata Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Date Completed</span>
                    <span className="text-xs font-mono font-semibold text-slate-800 block">{selectedAttempt.date}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Practice Mode</span>
                    <span className="text-xs font-semibold text-slate-800 block">{selectedAttempt.mode}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Category Context</span>
                    <span className="text-xs font-semibold text-slate-800 block truncate" title={selectedAttempt.category}>
                      {selectedAttempt.category}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Final Score</span>
                    <span className="text-xs font-mono font-bold text-blue-600 block">
                      {selectedAttempt.score} / {selectedAttempt.total} ({selectedAttempt.percentage}% Accuracy)
                    </span>
                  </div>
                </div>

                {/* Category-wise Breakdown (only shown for Full mode) */}
                {selectedAttempt.mode === 'Full' && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Sliders className="w-3.5 h-3.5" /> Category-Wise Performance
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.keys(CATEGORIES_META).map(key => {
                        const catId = Number(key);
                        const perf = getCategoryPerformance(selectedAttempt)[catId];
                        const meta = CATEGORIES_META[catId];
                        return perf ? (
                          <div key={catId} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                            <div className="flex items-center gap-2">
                              <div className={`p-1.5 rounded bg-white ${meta.color}`}>
                                {React.createElement(meta.icon, { className: "w-3.5 h-3.5" })}
                              </div>
                              <span className="text-xs font-semibold text-slate-700 truncate max-w-[150px]">{meta.name}</span>
                            </div>
                            <span className="text-xs font-mono font-bold text-slate-800">
                              {perf.correct} / {perf.total} ({Math.round((perf.correct / perf.total) * 100)}%)
                            </span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {/* Scenario-by-Scenario Log */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Question-By-Question Audit Breakdown
                  </h4>
                  
                  <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                    {selectedAttempt.breakdown && selectedAttempt.breakdown.map((item: any, index: number) => (
                      <div key={index} className="p-4 space-y-2.5 bg-white hover:bg-slate-50/40 transition-colors">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">
                              Scenario {item.scenarioNumber}
                            </span>
                            <h5 className="font-display font-bold text-xs sm:text-sm text-slate-800">{item.title}</h5>
                          </div>
                          {item.correct ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase font-mono tracking-wide shrink-0">
                              ✓ Correct
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-100 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase font-mono tracking-wide shrink-0">
                              ✗ Incorrect
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 gap-2.5 pt-1 text-xs">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Chosen Option:</span>
                            <p className={`p-2.5 rounded-lg border leading-relaxed text-slate-700 font-medium ${item.correct ? 'bg-emerald-50/25 border-emerald-100 text-emerald-800' : 'bg-rose-50/25 border-rose-100 text-rose-800'}`}>
                              {item.selectedAnswer}
                            </p>
                          </div>
                          {!item.correct && (
                            <div>
                              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Correct Answer:</span>
                              <p className="p-2.5 bg-emerald-50/25 border border-emerald-100 rounded-lg leading-relaxed text-emerald-800 font-medium">
                                {item.correctAnswer}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer actions */}
              <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end shrink-0">
                <button
                  onClick={() => setSelectedAttempt(null)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                >
                  Close Audit Log
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Clear Database Confirm Dialog */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-sm w-full text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-base text-slate-900">Clear Candidate Database?</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This will permanently delete all candidate scores and historical attempts. Are you sure?
                </p>
              </div>
              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    try {
                      localStorage.removeItem('mis_scores');
                      setAllAttempts([]);
                      setSelectedAttempt(null);
                    } catch (e) {
                      console.error("Failed to clear", e);
                    }
                    setShowClearConfirm(false);
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                >
                  Yes, Clear All
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Filter and search results for original candidate results view (leaving existing logic intact)

  return (
    <div className="bg-slate-50 min-h-full py-8 sm:py-12 px-4 transition-all duration-300 animate-fade-in">
      <div className="max-w-3xl mx-auto">

        {/* TOP-BAR NAVIGATION (Shown when not on landing screen) */}
        {currentStep !== 'landing' && (
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-3xs">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider cursor-pointer select-none"
              id="back_to_home_nav_btn"
            >
              <ChevronRight className="w-4 h-4 rotate-180 text-slate-400" />
              <span>Back to Home</span>
            </button>
            
            {mode === 'category' && selectedCategory && (
              <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded border border-blue-100 max-w-xs truncate">
                Category {selectedCategory}: {CATEGORIES_META[selectedCategory].name}
              </span>
            )}
            {mode === 'full' && (
              <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded border border-indigo-100 uppercase tracking-wider">
                Full Curriculum Mode (All 62 Scenarios)
              </span>
            )}
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* VIEW 1: LANDING PAGE */}
          {currentStep === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs text-center space-y-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
                  <GraduationCap className="w-10 h-10" />
                </div>
                
                {candidateName && (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-bold text-slate-700 font-mono shadow-3xs uppercase tracking-wide">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>Candidate: {candidateName}</span>
                  </div>
                )}
                
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display uppercase">
                    MIS Interview Practice Trainer
                  </h1>
                  <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                    Master key Management Information Systems (MIS) and Financial Planning & Analysis (FP&A) scenario dilemmas. Learn the industry-standard expected approaches for <strong>62 critical corporate cases</strong> across <strong>6 professional categories</strong>, and then test your knowledge in a timed, direct mock interview simulation.
                  </p>
                </div>

                {completedAssessments['full'] && (
                  <div className="max-w-md mx-auto inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 border border-indigo-100 rounded-xl text-xs font-mono font-bold text-indigo-700 shadow-3xs">
                    <CheckCircle className="w-4 h-4" />
                    <span>Full Curriculum Score: {completedAssessments['full'].correct} / {completedAssessments['full'].total} ({completedAssessments['full'].accuracy}% Accuracy)</span>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleStartLearning}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer uppercase tracking-wider select-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    id="start_learning_btn"
                  >
                    <span>Start Full Practice (All 62)</span>
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleStartFullMock}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer uppercase tracking-wider select-none focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                    id="start_full_mock_btn"
                  >
                    <span>Full Mock Interview (All 62)</span>
                    <Award className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Grid of Categories Info */}
              <div className="space-y-4">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  6 Professional Curriculum Categories (62 Scenarios)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.values(CATEGORIES_META).map((cat) => {
                    const CatIcon = cat.icon;
                    const catScenarios = SCENARIOS.filter(s => s.category === cat.id);
                    const scenarioCount = catScenarios.length;
                    const lastAttempt = completedAssessments[cat.id];

                    return (
                      <div 
                        key={cat.id} 
                        onClick={() => handleStartCategoryLearn(cat.id)}
                        className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4 hover:border-blue-400 hover:shadow-2xs transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${cat.bgColor} ${cat.color} group-hover:scale-105 transition-transform duration-200`}>
                                <CatIcon className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">
                                  Category {cat.id} • {scenarioCount} Scenarios
                                </span>
                                <h3 className="font-display font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                                  {cat.name}
                                </h3>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {cat.description}
                          </p>

                          {lastAttempt && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded text-[10px] font-mono font-bold text-emerald-700">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Last Attempt: {lastAttempt.correct}/{lastAttempt.total} ({lastAttempt.accuracy}%)</span>
                            </div>
                          )}
                        </div>

                        {/* Interactive Buttons for Study and Quiz */}
                        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleStartCategoryLearn(cat.id)}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-200 hover:border-blue-500 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 text-[11px] font-bold transition-all uppercase tracking-wider cursor-pointer select-none"
                            id={`learn_cat_btn_${cat.id}`}
                          >
                            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                            <span>Learn</span>
                          </button>
                          <button
                            onClick={() => handleStartCategoryMock(cat.id)}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-200 hover:border-amber-500 rounded-lg text-slate-700 hover:text-amber-600 hover:bg-amber-50/50 text-[11px] font-bold transition-all uppercase tracking-wider cursor-pointer select-none"
                            id={`mock_cat_btn_${cat.id}`}
                          >
                            <Award className="w-3.5 h-3.5 text-amber-500" />
                            <span>Mock</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* VIEW 2: CATEGORY INTRO (SECTION HEADER) */}
          {currentStep === 'learn-intro' && (() => {
            const currentScenario = activeScenarios[learningIndex];
            const catMeta = CATEGORIES_META[currentScenario.category];
            const CatIcon = catMeta.icon;

            return (
              <motion.div
                key={`cat-intro-${currentScenario.category}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs text-center space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">
                    SECTION BOUNDARY TRANSITION
                  </span>
                  <div className={`w-20 h-20 ${catMeta.bgColor} ${catMeta.color} ${catMeta.borderColor} border rounded-3xl flex items-center justify-center mx-auto shadow-2xs`}>
                    <CatIcon className="w-10 h-10" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xs font-mono font-extrabold text-blue-600 uppercase tracking-wider">
                    Category {catMeta.id} of 6
                  </h2>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display max-w-lg mx-auto">
                    {catMeta.name}
                  </h1>
                  <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    {catMeta.description}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 max-w-md mx-auto text-left space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">
                    What we cover in this part:
                  </span>
                  <ul className="text-xs text-slate-600 list-disc pl-5 space-y-1">
                    <li>Comprehensive framework logic explanations.</li>
                    <li>SOP and corporate alignment policies.</li>
                    <li>Expected decision workflows for scenarios {catMeta.scenariosRange}.</li>
                  </ul>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleSkipIntro}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer uppercase tracking-wider select-none"
                    id="enter_category_btn"
                  >
                    <span>Begin Category Scenarios</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })()}

          {/* VIEW 3: PART 1 — LEARNING COMPONENT */}
          {currentStep === 'learning' && (() => {
            const currentScenario = activeScenarios[learningIndex];
            const isLastLearn = learningIndex === activeScenarios.length - 1;
            const progressPercent = ((learningIndex + 1) / activeScenarios.length) * 100;
            const catMeta = CATEGORIES_META[currentScenario.category];
            const CatIcon = catMeta.icon;

            return (
              <motion.div
                key={`learn-${learningIndex}`}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
              >
                {/* Header section with category name as a section header */}
                <div className="pb-4 border-b border-slate-100 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-md ${catMeta.bgColor} ${catMeta.color}`}>
                      <CatIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-extrabold tracking-wider text-slate-500 uppercase">
                      Category {catMeta.id}: {catMeta.name}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600 uppercase bg-blue-50 px-2.5 py-1 rounded">
                        PART 1: LEARN THE SCENARIOS
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 font-display">
                        Scenario {currentScenario.id}. {currentScenario.title}
                      </h2>
                    </div>
                    
                    <div className="text-right shrink-0">
                      <span className="text-xs font-semibold text-slate-500 font-mono">
                        Scenario {learningIndex + 1} of {activeScenarios.length}
                      </span>
                      <div className="w-28 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1 md:ml-auto border border-slate-200">
                        <div 
                          className="bg-blue-600 h-full transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scenario details card */}
                <div className="space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      The Challenge Dilemma
                    </h3>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5 text-slate-850 text-sm sm:text-base leading-relaxed font-semibold">
                      &ldquo;{currentScenario.scenario}&rdquo;
                    </div>
                  </div>

                  {/* Expected approach bullet points */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Expected Corporate Approach
                    </h3>
                    <ul className="space-y-2.5 pl-5 list-disc text-slate-700 text-xs sm:text-sm leading-relaxed">
                      {currentScenario.expectedApproach.map((item, idx) => (
                        <li key={idx} className="text-slate-750">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Navigation actions */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                  <span className="text-xs text-slate-400 font-sans italic text-center sm:text-left">
                    Review and understand the optimal operational strategy.
                  </span>
                  
                  <button
                    onClick={handleNextLearn}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm cursor-pointer uppercase tracking-wider select-none"
                    id="next_learning_step_btn"
                  >
                    <span>{isLastLearn ? (mode === 'category' ? 'Finish Category Practice' : 'Proceed to Mock Assessment') : 'Next Scenario'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })()}

          {/* VIEW 4: CATEGORY LEARN COMPLETED SCREEN */}
          {currentStep === 'category-learn-completed' && (() => {
            const catMeta = CATEGORIES_META[selectedCategory!];
            const CatIcon = catMeta.icon;

            return (
              <motion.div
                key="category-learn-completed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs text-center space-y-6"
              >
                <div className="space-y-2">
                  <div className={`w-20 h-20 ${catMeta.bgColor} ${catMeta.color} ${catMeta.borderColor} border rounded-3xl flex items-center justify-center mx-auto shadow-2xs`}>
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <span className="text-[10px] font-mono font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded inline-block">
                    CATEGORY LEARN COMPLETE
                  </span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display max-w-lg mx-auto">
                    You've completed {catMeta.name}!
                  </h1>
                  <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                    Ready to test your knowledge on these scenarios under a simulated mock assessment?
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setQuizIndex(0);
                      setUserSelections([]);
                      setCurrentStep('quiz');
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer uppercase tracking-wider select-none"
                    id="category_completed_mock_btn"
                  >
                    <span>Mock Interview — This Category</span>
                    <Award className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleRestart}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer uppercase tracking-wider select-none"
                    id="category_completed_home_btn"
                  >
                    <span>Back to Home</span>
                  </button>
                </div>
              </motion.div>
            );
          })()}

          {/* VIEW 5: PART 2 — MOCK INTERVIEW MCQ */}
          {currentStep === 'quiz' && (() => {
            const currentScenario = activeScenarios[quizIndex];
            const progressPercent = ((quizIndex + 1) / activeScenarios.length) * 100;
            const catMeta = CATEGORIES_META[currentScenario.category];
            const CatIcon = catMeta.icon;

            return (
              <motion.div
                key={`quiz-${quizIndex}`}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
              >
                {/* Header section with category tags */}
                <div className="pb-4 border-b border-slate-100 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-md ${catMeta.bgColor} ${catMeta.color}`}>
                      <CatIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-extrabold tracking-wider text-slate-500 uppercase">
                      Category {catMeta.id}: {catMeta.name}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono font-bold tracking-widest text-amber-600 uppercase bg-amber-50 px-2.5 py-1 rounded">
                        {mode === 'category' ? `PART 2: MCQ PRACTICE (CATEGORY ${catMeta.id})` : 'PART 2: MOCK ASSESSMENT (SILENT SELECTION)'}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 font-display">
                        Scenario {currentScenario.id}. {currentScenario.title}
                      </h2>
                    </div>
                    
                    <div className="text-right shrink-0">
                      <span className="text-xs font-semibold text-slate-500 font-mono">
                        Question {quizIndex + 1} of {activeScenarios.length}
                      </span>
                      <div className="w-28 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1 md:ml-auto border border-slate-200">
                        <div 
                          className="bg-amber-500 h-full transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scenario details card */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Scenario Question Context
                    </h3>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 text-slate-900 text-sm sm:text-base leading-relaxed font-bold">
                      {currentScenario.scenario}
                    </div>
                  </div>

                  {/* Options items */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Select Your Decision Path
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {activeQuizOptions.map((opt, idx) => {
                        const isSelected = selectedOptionText === opt.text;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectOption(opt.text)}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 select-none cursor-pointer ${
                              isSelected
                                ? 'bg-blue-50 border-blue-600 shadow-2xs ring-1 ring-blue-600'
                                : 'bg-white border-slate-200 hover:border-blue-500 hover:bg-slate-50/50'
                            }`}
                            id={`quiz_option_btn_${idx}`}
                          >
                            <span className={`w-6 h-6 rounded-md font-mono text-[11px] font-bold flex items-center justify-center shrink-0 border mt-0.5 ${
                              isSelected
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-slate-100 text-slate-500 border-slate-200'
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-xs sm:text-sm text-slate-855 font-medium leading-relaxed">
                              {opt.text}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Navigation actions */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                  <span className="text-xs text-slate-400 font-sans italic">
                    Answers are locked silently. Full feedback is revealed on the final screen.
                  </span>
                  
                  <button
                    onClick={handleSubmitQuizAnswer}
                    disabled={!selectedOptionText}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm disabled:cursor-not-allowed uppercase tracking-wider select-none cursor-pointer"
                    id="submit_quiz_answer_btn"
                  >
                    <span>Submit Choice</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })()}

          {/* VIEW 6: FINAL RESULTS SCREEN */}
          {currentStep === 'results' && (() => {
            const correctCount = userSelections.filter(sel => sel.isCorrect).length;
            const avgRating = Math.round((correctCount / activeScenarios.length) * 100);
            const resultsCategoryMeta = mode === 'category' ? CATEGORIES_META[selectedCategory!] : null;

            const getFeedbackStatement = () => {
              if (avgRating >= 90) return "Executive Status Met: You demonstrated flawless corporate analysis and analytical process excellence across high-stakes pressure situations.";
              if (avgRating >= 70) return "Proficient Status Met: High grasp of compliance and internal checks. Highly fit for key stakeholder planning meetings.";
              return "Analytical Growth Needed: Excellent attempt! Reviewing calculations and validating source inputs will elevate your strategic effectiveness.";
            };

            return (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Main Score Board */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs text-center space-y-5">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
                    <Award className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded inline-block">
                      OFFICIAL ASSESSMENT COMPLETED REPORT
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                      Your Final Score: <span className="text-blue-600">{correctCount} / {activeScenarios.length}</span> Correct
                      {mode === 'category' && resultsCategoryMeta && (
                        <span className="text-slate-400 block sm:inline font-sans font-medium text-lg sm:text-xl">
                          {" — "}{resultsCategoryMeta.name}
                        </span>
                      )}
                    </h2>
                    <p className="text-sm font-semibold text-slate-500 font-mono mt-0.5">
                      Pass Ratio: {avgRating}% Accuracy
                    </p>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed border-t border-slate-100 pt-4">
                    {getFeedbackStatement()}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    {mode === 'category' ? (
                      <>
                        <button
                          onClick={() => {
                            setQuizIndex(0);
                            setUserSelections([]);
                            setCurrentStep('quiz');
                          }}
                          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer uppercase tracking-wider"
                          id="results_retry_category_btn"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Retry This Category</span>
                        </button>
                        <button
                          onClick={() => {
                            setLearningIndex(0);
                            setCurrentStep('learning');
                          }}
                          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer uppercase tracking-wider"
                          id="results_learn_category_btn"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Learn This Category</span>
                        </button>
                        <button
                          onClick={handleRestart}
                          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-950 hover:bg-slate-850 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer uppercase tracking-wider"
                          id="results_back_to_home_btn"
                        >
                          <span>Back to Home</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleRestart}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-950 hover:bg-slate-850 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer uppercase tracking-wider"
                        id="restart_interview_assessment_btn"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restart Practice</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Per Question breakdown logs with filtering and searching */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 ml-1">
                    <h3 className="font-display font-bold text-slate-800 text-sm uppercase tracking-wider">
                      Question-By-Question Interview Feedback Logs ({filteredSelections.length} shown)
                    </h3>
                  </div>

                  {/* Filters & Search controls (only show category filters in full mode) */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-3xs">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search logs by keyword..."
                        value={resultsSearchQuery}
                        onChange={(e) => setResultsSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                      />
                    </div>

                    {mode === 'full' && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                          <Filter className="w-3 h-3" /> Filter by Category:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            onClick={() => setSelectedResultCategoryFilter('all')}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                              selectedResultCategoryFilter === 'all'
                                ? 'bg-slate-900 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            All Categories (62)
                          </button>
                          {Object.values(CATEGORIES_META).map(cat => {
                            const count = userSelections.filter(sel => sel.category === cat.id).length;
                            return (
                              <button
                                key={cat.id}
                                onClick={() => setSelectedResultCategoryFilter(cat.id)}
                                className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                                  selectedResultCategoryFilter === cat.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                Cat {cat.id} ({count})
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Selection feedback items list */}
                  <div className="space-y-4">
                    {filteredSelections.length === 0 ? (
                      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-400 text-xs">
                        No matched feedback logs found for current filters.
                      </div>
                    ) : (
                      filteredSelections.map((sel, idx) => {
                        return (
                          <div 
                            key={idx} 
                            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:border-slate-300 transition-all"
                          >
                            {/* Summary line */}
                            <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="space-y-0.5">
                                <span className="text-[9px] font-bold font-mono text-slate-400 block uppercase">
                                  Category {sel.category} • {sel.categoryName}
                                </span>
                                <h4 className="font-display font-bold text-slate-800 text-xs sm:text-sm">
                                  Scenario {sel.scenarioId}. {sel.scenarioTitle}
                                </h4>
                              </div>

                              {sel.isCorrect ? (
                                <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-1 self-start sm:self-auto uppercase tracking-wide font-mono shrink-0">
                                  <CheckCircle className="w-3.5 h-3.5" /> Correct
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-1 self-start sm:self-auto uppercase tracking-wide font-mono shrink-0">
                                  <AlertCircle className="w-3.5 h-3.5" /> Review Needed
                                </span>
                              )}
                            </div>

                            {/* Breakdown specifics */}
                            <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Scenario context:</span>
                                <p className="text-slate-600 italic leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-100 text-[11px] sm:text-xs">
                                  &ldquo;{sel.scenarioText}&rdquo;
                                </p>
                              </div>

                              <div className="space-y-3">
                                {/* Selected Answer block */}
                                <div>
                                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Your chosen approach:</span>
                                  <div className={`p-3 rounded-lg border text-[11px] sm:text-xs leading-relaxed ${
                                    sel.isCorrect 
                                      ? 'bg-emerald-50/40 border-emerald-150 text-emerald-850' 
                                      : 'bg-rose-50/40 border-rose-150 text-rose-850'
                                  }`}>
                                    {sel.selectedText}
                                  </div>
                                </div>

                                {/* Correct Response block if they made a mistake */}
                                {!sel.isCorrect && (
                                  <div>
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Optimal expected response:</span>
                                    <div className="p-3 bg-emerald-50/40 border border-emerald-150 rounded-lg text-emerald-850 text-[11px] sm:text-xs leading-relaxed">
                                      {sel.correctText}
                                    </div>
                                  </div>
                                )}

                                {/* Learn the expected approach items */}
                                <div className="pt-2">
                                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5 flex items-center gap-1">
                                    <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                                    Optimal Corporate Approach Steps:
                                  </span>
                                  <ul className="list-disc pl-5 space-y-1 text-slate-600 text-[11px] sm:text-xs">
                                    {SCENARIOS.find(s => s.id === sel.scenarioId)?.expectedApproach.map((ap, apIdx) => (
                                      <li key={apIdx}>{ap}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>

                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Final CTA card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-3">
                  <h4 className="font-display font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wide">
                    Ready to refine your analytical corporate insights?
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-md mx-auto">
                    You can reset this trial and review the theoretical guidelines to achieve a perfect {activeScenarios.length} / {activeScenarios.length} score record.
                  </p>
                  <button
                    onClick={handleRestart}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm cursor-pointer uppercase tracking-wider"
                    id="results_relaunch_practice_btn"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Run Study Mode Again</span>
                  </button>
                </div>
              </motion.div>
            );
          })()}

        </AnimatePresence>
      </div>
    </div>
  );
}
