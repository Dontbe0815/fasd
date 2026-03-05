'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuickScenario, getRandomScenarios } from '@/lib/scenarioData';
import { audioManager } from '@/lib/sounds';

interface ScenarioModeProps {
  onBack: () => void;
  soundEnabled: boolean;
}

type GameState = 'intro' | 'difficulty' | 'playing' | 'result';

export function ScenarioMode({ onBack, soundEnabled }: ScenarioModeProps) {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [scenarios, setScenarios] = useState<QuickScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [results, setResults] = useState<{ correct: boolean; scenario: QuickScenario }[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuickScenario['difficulty'] | 'all'>('all');

  // Timer effect
  useEffect(() => {
    if (gameState !== 'playing' || timer === null || selectedChoice !== null) return;

    if (timer <= 0) {
      // Time's up - use setTimeout to avoid synchronous setState
      const timeoutId = setTimeout(() => {
        const currentScenario = scenarios[currentIndex];
        if (currentScenario) {
          const wrongChoice = currentScenario.choices.find(c => !c.isCorrect);
          if (wrongChoice) {
            setSelectedChoice(wrongChoice.id);
            setShowFeedback(true);
            setResults(prev => [...prev, { correct: false, scenario: currentScenario }]);
          }
        }
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    const interval = setInterval(() => {
      setTimer(t => (t ?? 0) - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, gameState, selectedChoice, scenarios, currentIndex]);

  const startGame = (difficulty: QuickScenario['difficulty'] | 'all') => {
    if (soundEnabled) audioManager.playClick();
    setSelectedDifficulty(difficulty);
    
    let gameScenarios = getRandomScenarios(5);
    if (difficulty !== 'all') {
      gameScenarios = getRandomScenarios(5).filter(s => s.difficulty === difficulty);
      if (gameScenarios.length < 5) {
        gameScenarios = getRandomScenarios(5);
      }
    }
    
    setScenarios(gameScenarios);
    setCurrentIndex(0);
    setScore(0);
    setSelectedChoice(null);
    setShowFeedback(false);
    setResults([]);
    setTimer(gameScenarios[0]?.timeLimit ?? null);
    setGameState('playing');
  };

  const selectChoice = (choiceId: string) => {
    if (selectedChoice !== null) return;

    const currentScenario = scenarios[currentIndex];
    const choice = currentScenario.choices.find(c => c.id === choiceId);
    if (!choice) return;

    setSelectedChoice(choiceId);
    setShowFeedback(true);
    setTimer(null);

    if (choice.isCorrect) {
      if (soundEnabled) audioManager.playPositive();
      setScore(s => s + 1);
      setResults(prev => [...prev, { correct: true, scenario: currentScenario }]);
    } else {
      if (soundEnabled) audioManager.playNegative();
      setResults(prev => [...prev, { correct: false, scenario: currentScenario }]);
    }
  };

  const nextScenario = () => {
    if (soundEnabled) audioManager.playClick();
    
    if (currentIndex + 1 >= scenarios.length) {
      setGameState('result');
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedChoice(null);
      setShowFeedback(false);
      setTimer(scenarios[nextIndex]?.timeLimit ?? null);
    }
  };

  const currentScenario = scenarios[currentIndex];

  // Intro Screen
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-8xl mb-6"
          >
            🎭
          </motion.div>
          <h1 className="text-4xl font-bold text-emerald-900 mb-4">
            Szenario-Modus
          </h1>
          <p className="text-emerald-700 mb-6 text-lg">
            Meistere typische Situationen und lerne, wie du in schwierigen Momenten die richtige Entscheidung triffst.
          </p>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-6 text-left">
            <h3 className="font-semibold text-emerald-800 mb-2">📋 So funktioniert&apos;s:</h3>
            <ul className="text-emerald-600 space-y-1 text-sm">
              <li>• 5 zufällige Szenarien aus dem Alltag</li>
              <li>• Wähle die richtige Reaktion</li>
              <li>• Lerne aus jeder Entscheidung</li>
              <li>• Manche Szenarien haben Zeitdruck!</li>
            </ul>
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setGameState('difficulty')}
              className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold text-lg shadow-lg"
            >
              Spiel starten! 🚀
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { if (soundEnabled) audioManager.playClick(); onBack(); }}
              className="w-full px-6 py-3 bg-white/80 text-emerald-700 rounded-xl font-medium"
            >
              ← Zurück zum Menü
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Difficulty Selection
  if (gameState === 'difficulty') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          <h2 className="text-2xl font-bold text-emerald-900 mb-6">Wähle den Schwierigkeitsgrad</h2>
          
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startGame('all')}
              className="w-full p-5 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-xl font-bold shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-lg">🎲 Gemischt</div>
                  <div className="text-emerald-100 text-sm">Alle Schwierigkeitsgrade</div>
                </div>
                <span className="text-3xl">🎯</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startGame('easy')}
              className="w-full p-5 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-bold shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-lg">⭐ Einfach</div>
                  <div className="text-green-100 text-sm">Perfekt zum Üben</div>
                </div>
                <span className="text-3xl">🌱</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startGame('medium')}
              className="w-full p-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-bold shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-lg">⭐⭐ Mittel</div>
                  <div className="text-yellow-100 text-sm">Für Fortgeschrittene</div>
                </div>
                <span className="text-3xl">🌿</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startGame('hard')}
              className="w-full p-5 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-xl font-bold shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-lg">⭐⭐⭐ Schwer</div>
                  <div className="text-red-100 text-sm">Mit Zeitdruck und Gruppenzwang</div>
                </div>
                <span className="text-3xl">🌳</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { if (soundEnabled) audioManager.playClick(); setGameState('intro'); }}
              className="w-full px-6 py-3 bg-white/80 text-emerald-700 rounded-xl font-medium"
            >
              ← Zurück
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Result Screen
  if (gameState === 'result') {
    const percentage = Math.round((score / scenarios.length) * 100);
    let emoji = '🏆';
    let title = 'Meister der Entscheidungen!';
    let message = 'Du meistest jede Situation mit Bravour!';
    
    if (percentage < 40) {
      emoji = '📚';
      title = 'Übung macht den Meister!';
      message = 'Probiere die Szenarien nochmal – du wirst besser!';
    } else if (percentage < 70) {
      emoji = '👍';
      title = 'Gut gemacht!';
      message = 'Du bist auf dem richtigen Weg!';
    } else if (percentage < 100) {
      emoji = '🌟';
      title = 'Sehr gut!';
      message = 'Du triffst die meisten richtigen Entscheidungen!';
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-8xl mb-6"
          >
            {emoji}
          </motion.div>
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">{title}</h1>
          <p className="text-emerald-600 mb-6">{message}</p>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mb-6">
            <div className="text-5xl font-bold text-emerald-600 mb-2">
              {score} / {scenarios.length}
            </div>
            <div className="text-emerald-500">richtige Entscheidungen</div>
            <div className="mt-4 text-2xl font-semibold text-teal-600">
              {percentage}%
            </div>
          </div>

          {/* Results breakdown */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {results.map((result, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  result.correct 
                    ? 'bg-green-100 text-green-600 border-2 border-green-300' 
                    : 'bg-red-100 text-red-600 border-2 border-red-300'
                }`}
              >
                {result.scenario.emoji}
              </motion.div>
            ))}
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setGameState('difficulty')}
              className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg"
            >
              Nochmal spielen! 🔄
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { if (soundEnabled) audioManager.playClick(); onBack(); }}
              className="w-full px-6 py-3 bg-white/80 text-emerald-700 rounded-xl font-medium"
            >
              ← Zurück zum Menü
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Playing State
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="max-w-2xl mx-auto pt-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-emerald-600 mb-1">
            <span>Szenario {currentIndex + 1} von {scenarios.length}</span>
            <span>Punkte: {score}</span>
          </div>
          <div className="h-2 bg-emerald-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / scenarios.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Timer (if applicable) */}
        {timer !== null && !showFeedback && (
          <div className="mb-4">
            <div className={`h-3 rounded-full overflow-hidden ${
              timer <= 5 ? 'bg-red-200' : 'bg-emerald-200'
            }`}>
              <motion.div
                className={`h-full ${
                  timer <= 5 
                    ? 'bg-red-500' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                }`}
                animate={{ width: `${(timer / (currentScenario?.timeLimit ?? 20)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className={`text-center text-sm mt-1 font-medium ${
              timer <= 5 ? 'text-red-600 animate-pulse' : 'text-emerald-600'
            }`}>
              ⏱️ {timer} Sekunden!
            </div>
          </div>
        )}

        {/* Scenario Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-4xl">{currentScenario.emoji}</span>
              <div>
                <h2 className="text-xl font-bold text-emerald-900">{currentScenario.title}</h2>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  currentScenario.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  currentScenario.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {currentScenario.difficulty === 'easy' ? '⭐ Einfach' :
                   currentScenario.difficulty === 'medium' ? '⭐⭐ Mittel' :
                   '⭐⭐⭐ Schwer'}
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
              {currentScenario.category === 'party' ? '🎉 Party' :
               currentScenario.category === 'work' ? '💼 Arbeit' :
               currentScenario.category === 'family' ? '👨‍👩‍👧 Familie' :
               currentScenario.category === 'medical' ? '🏥 Arzt' :
               '👥 Sozial'}
            </span>
          </div>

          {/* Situation */}
          <div className="bg-emerald-50 rounded-xl p-4 mb-4">
            <p className="text-emerald-900 font-medium">{currentScenario.situation}</p>
            {currentScenario.pressure && (
              <p className="text-emerald-600 text-sm mt-2 italic">{currentScenario.pressure}</p>
            )}
          </div>

          {/* Choices */}
          <div className="space-y-3">
            <p className="text-emerald-700 font-medium text-sm">Was tust du?</p>
            {currentScenario.choices.map((choice, idx) => {
              let buttonStyle = 'bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50';
              
              if (showFeedback) {
                if (choice.isCorrect) {
                  buttonStyle = 'bg-green-100 border-green-400 text-green-800';
                } else if (choice.id === selectedChoice && !choice.isCorrect) {
                  buttonStyle = 'bg-red-100 border-red-400 text-red-800';
                } else {
                  buttonStyle = 'bg-gray-50 border-gray-200 text-gray-500';
                }
              }

              return (
                <motion.button
                  key={choice.id}
                  whileHover={!showFeedback ? { scale: 1.02 } : {}}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  onClick={() => selectChoice(choice.id)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-medium text-emerald-600">
                      {idx + 1}
                    </span>
                    <span className="flex-1">{choice.text}</span>
                    {showFeedback && choice.isCorrect && (
                      <span className="text-green-500 text-xl">✓</span>
                    )}
                    {showFeedback && choice.id === selectedChoice && !choice.isCorrect && (
                      <span className="text-red-500 text-xl">✗</span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && selectedChoice && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg ${
                currentScenario.choices.find(c => c.id === selectedChoice)?.isCorrect
                  ? 'border-l-4 border-green-500'
                  : 'border-l-4 border-red-500'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {currentScenario.choices.find(c => c.id === selectedChoice)?.isCorrect ? (
                    <>
                      <span className="text-2xl">✅</span>
                      <span className="font-bold text-green-600 text-lg">Richtig!</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">❌</span>
                      <span className="font-bold text-red-600 text-lg">Nicht ideal</span>
                    </>
                  )}
                </div>
                <p className="text-gray-700">
                  {currentScenario.choices.find(c => c.id === selectedChoice)?.feedback}
                </p>
              </div>

              {/* Tip */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">💡</span>
                  <span className="font-semibold text-amber-800">Tipp:</span>
                </div>
                <p className="text-amber-700 text-sm">{currentScenario.tip}</p>
              </div>

              {/* Next Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextScenario}
                className="w-full px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg"
              >
                {currentIndex + 1 >= scenarios.length ? 'Ergebnis anzeigen' : 'Nächstes Szenario →'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Button */}
        <button
          onClick={() => { if (soundEnabled) audioManager.playClick(); onBack(); }}
          className="fixed top-4 left-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg text-emerald-600 font-medium shadow-md z-50"
        >
          ← Menü
        </button>
      </div>
    </div>
  );
}
