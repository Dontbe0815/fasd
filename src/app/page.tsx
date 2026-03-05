'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MainMenu } from '@/components/game/MainMenu';
import { CharacterSelection } from '@/components/game/CharacterSelection';
import { BabyHealthTracker } from '@/components/game/BabyHealthTracker';
import { Scenario } from '@/components/game/Scenario';
import { QuizGame } from '@/components/game/QuizGame';
import { ScenarioMode } from '@/components/game/ScenarioMode';
import { MusicPanel } from '@/components/game/MusicPanel';
import { audioManager } from '@/lib/sounds';
import { characters, scenarios } from '@/lib/gameData';

// Simple game state interface
interface SimpleGameState {
  mode: 'menu' | 'character-selection' | 'playing' | 'completed' | 'quiz' | 'scenario';
  selectedCharacter: typeof characters[0] | null;
  health: number;
  currentScenarioIndex: number;
  soundEnabled: boolean;
  showFeedback: boolean;
  lastDecisionIndex: number | null;
}

const initialState: SimpleGameState = {
  mode: 'menu',
  selectedCharacter: null,
  health: 100,
  currentScenarioIndex: 0,
  soundEnabled: true,
  showFeedback: false,
  lastDecisionIndex: null,
};

// Helper function to load initial state (called only once)
function loadInitialState(): SimpleGameState {
  if (typeof window === 'undefined') return initialState;
  try {
    const saved = localStorage.getItem('fasd-game-v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.mode === 'string') {
        return { ...initialState, ...parsed };
      }
    }
  } catch {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fasd-game-v2');
    }
  }
  return initialState;
}

export default function Home() {
  const [state, setState] = useState<SimpleGameState>(loadInitialState);
  const [showMusicPanel, setShowMusicPanel] = useState(false);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('fasd-game-v2', JSON.stringify(state));
  }, [state]);

  // Manage heartbeat
  useEffect(() => {
    audioManager.setEnabled(state.soundEnabled);
    if (state.mode === 'playing' && state.soundEnabled) {
      audioManager.startHeartbeat();
    } else {
      audioManager.stopHeartbeat();
    }
    return () => audioManager.stopHeartbeat();
  }, [state.mode, state.soundEnabled]);

  // Game actions
  const setMode = useCallback((mode: SimpleGameState['mode']) => {
    if (state.soundEnabled) audioManager.playClick();
    setState(prev => ({ ...prev, mode }));
  }, [state.soundEnabled]);

  const selectCharacter = useCallback((character: typeof characters[0]) => {
    if (state.soundEnabled) audioManager.playClick();
    setState(prev => ({
      ...prev,
      selectedCharacter: character,
      mode: 'playing',
      health: 100,
      currentScenarioIndex: 0,
      showFeedback: false,
      lastDecisionIndex: null,
    }));
  }, [state.soundEnabled]);

  const makeDecision = useCallback((decisionIndex: number) => {
    const currentScenario = scenarios[state.currentScenarioIndex];
    if (!currentScenario) return;
    
    const decision = currentScenario.decisions[decisionIndex];
    if (!decision) return;
    
    const newHealth = Math.max(0, Math.min(100, state.health + decision.healthChange));
    
    if (state.soundEnabled) {
      if (decision.impact === 'positive') audioManager.playPositive();
      else if (decision.impact === 'negative') audioManager.playNegative();
      else audioManager.playNeutral();
    }
    
    setState(prev => ({
      ...prev,
      health: newHealth,
      showFeedback: true,
      lastDecisionIndex: decisionIndex,
    }));
  }, [state.currentScenarioIndex, state.health, state.soundEnabled]);

  const nextScenario = useCallback(() => {
    if (state.soundEnabled) audioManager.playClick();
    const nextIndex = state.currentScenarioIndex + 1;
    
    if (nextIndex >= scenarios.length) {
      setState(prev => ({ ...prev, mode: 'completed', showFeedback: false }));
    } else {
      setState(prev => ({
        ...prev,
        currentScenarioIndex: nextIndex,
        showFeedback: false,
        lastDecisionIndex: null,
      }));
    }
  }, [state.currentScenarioIndex, state.soundEnabled]);

  const toggleSound = useCallback(() => {
    setState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const resetGame = useCallback(() => {
    if (state.soundEnabled) audioManager.playClick();
    setState({ ...initialState, soundEnabled: state.soundEnabled });
  }, [state.soundEnabled]);

  const currentScenario = scenarios[state.currentScenarioIndex];
  const currentDecision = state.lastDecisionIndex !== null && currentScenario
    ? currentScenario.decisions[state.lastDecisionIndex]
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50">
      <AnimatePresence mode="wait">
        {state.mode === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MainMenu
              onStartStory={() => setMode('character-selection')}
              onStartScenario={() => setMode('scenario')}
              onStartQuiz={() => setMode('quiz')}
              soundEnabled={state.soundEnabled}
              onToggleSound={toggleSound}
              onOpenMusic={() => setShowMusicPanel(true)}
            />
          </motion.div>
        )}

        {state.mode === 'character-selection' && (
          <motion.div
            key="character-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CharacterSelection
              characters={characters}
              onSelect={selectCharacter}
              onBack={() => setMode('menu')}
            />
          </motion.div>
        )}

        {state.mode === 'playing' && currentScenario && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BabyHealthTracker
              health={state.health}
              week={currentScenario.week}
            />
            <Scenario
              scenario={currentScenario}
              scenarioIndex={state.currentScenarioIndex}
              totalScenarios={scenarios.length}
              character={state.selectedCharacter}
              showFeedback={state.showFeedback}
              decision={currentDecision}
              onDecision={makeDecision}
              onNext={nextScenario}
              soundEnabled={state.soundEnabled}
            />
          </motion.div>
        )}

        {state.mode === 'completed' && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-4"
          >
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-md">
              <span className="text-6xl block mb-4">🎉</span>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">
                Geschichtenmodus abgeschlossen!
              </h2>
              <p className="text-amber-700 mb-2">
                Endgesundheit: {state.health}%
              </p>
              <p className="text-amber-600 text-sm mb-6">
                {state.health >= 80
                  ? 'Fantastisch! Du hast dein Baby gut geschützt!'
                  : state.health >= 50
                    ? 'Gut gemacht! Du hast viele richtige Entscheidungen getroffen.'
                    : 'Jede Entscheidung ist eine Lernerfahrung.'}
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetGame}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-medium"
              >
                Zurück zum Menü
              </motion.button>
            </div>
          </motion.div>
        )}

        {state.mode === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizGame
              onBack={() => setMode('menu')}
              soundEnabled={state.soundEnabled}
            />
          </motion.div>
        )}

        {state.mode === 'scenario' && (
          <motion.div
            key="scenario"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScenarioMode
              onBack={() => setMode('menu')}
              soundEnabled={state.soundEnabled}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sound toggle button */}
      {state.mode !== 'menu' && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleSound}
          className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg z-50 ${
            state.soundEnabled ? 'bg-amber-200 text-amber-800' : 'bg-gray-200 text-gray-500'
          }`}
        >
          {state.soundEnabled ? '🔊' : '🔇'}
        </motion.button>
      )}

      {/* Music Panel */}
      <MusicPanel 
        isOpen={showMusicPanel} 
        onClose={() => setShowMusicPanel(false)} 
      />
    </div>
  );
}
