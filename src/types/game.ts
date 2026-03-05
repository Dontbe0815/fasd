// Game Types for FASD Awareness Game

export type GameMode = 'menu' | 'story' | 'scenario' | 'quiz' | 'character-selection' | 'playing';

export type DecisionImpact = 'positive' | 'neutral' | 'negative';

export interface Character {
  id: string;
  name: string;
  age: number;
  background: string;
  challenges: string;
  avatar: string;
}

export interface Decision {
  id: string;
  text: string;
  impact: DecisionImpact;
  healthChange: number;
  feedbackText: string;
  infoText?: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  week: number;
  decisions: Decision[];
  backgroundInfo?: string;
}

export interface GameState {
  mode: GameMode;
  selectedCharacter: Character | null;
  health: number; // 0-100
  currentWeek: number;
  currentScenarioIndex: number;
  completedScenarios: string[];
  soundEnabled: boolean;
  showFeedback: boolean;
  lastDecision: Decision | null;
}

export interface GameContextType extends GameState {
  setMode: (mode: GameMode) => void;
  selectCharacter: (character: Character) => void;
  makeDecision: (decision: Decision) => void;
  toggleSound: () => void;
  resetGame: () => void;
  nextScenario: () => void;
  closeFeedback: () => void;
}

// Initial game state
export const initialGameState: GameState = {
  mode: 'menu',
  selectedCharacter: null,
  health: 100,
  currentWeek: 6,
  currentScenarioIndex: 0,
  completedScenarios: [],
  soundEnabled: true,
  showFeedback: false,
  lastDecision: null,
};
