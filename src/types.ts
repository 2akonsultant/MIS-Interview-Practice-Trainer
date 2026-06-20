export interface Scenario {
  id: number;
  title: string;
  scenario: string;
  modelApproach: string[];
}

export interface PracticeState {
  currentScenarioId: number;
  userAnswers: Record<number, string>;
  practicedIds: number[];
  revealedIds: number[];
}

export interface ChatMessage {
  id: string;
  sender: 'interviewer' | 'candidate';
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface MockInterviewState {
  currentScenarioId: number | null;
  customScenarioEnabled: boolean;
  messages: ChatMessage[];
  interviewStep: 'intro' | 'answering' | 'followup' | 'feedback';
  isThinking: boolean;
  scenarioCompleted: boolean;
}
