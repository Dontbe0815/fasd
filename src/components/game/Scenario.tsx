'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '@/lib/sounds';

interface Decision {
  id: string;
  text: string;
  impact: 'positive' | 'neutral' | 'negative';
  healthChange: number;
  feedbackText: string;
  infoText?: string;
}

interface ScenarioData {
  id: string;
  title: string;
  description: string;
  week: number;
  decisions: Decision[];
  backgroundInfo?: string;
}

interface Character {
  id: string;
  name: string;
  age: number;
  background: string;
  challenges: string;
  avatar: string;
}

interface ScenarioProps {
  scenario: ScenarioData;
  scenarioIndex: number;
  totalScenarios: number;
  character: Character | null;
  showFeedback: boolean;
  decision: Decision | null;
  onDecision: (index: number) => void;
  onNext: () => void;
  soundEnabled: boolean;
}

export function Scenario({
  scenario,
  scenarioIndex,
  totalScenarios,
  character,
  showFeedback,
  decision,
  onDecision,
  onNext,
  soundEnabled,
}: ScenarioProps) {
  const handleHover = () => {
    if (soundEnabled) audioManager.playHover();
  };

  const handleClick = (index: number) => {
    if (soundEnabled) audioManager.playClick();
    onDecision(index);
  };

  const getImpactStyle = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100';
      case 'negative':
        return 'border-red-300 bg-red-50 hover:bg-red-100';
      default:
        return 'border-amber-300 bg-amber-50 hover:bg-amber-100';
    }
  };

  const getImpactHeader = (impact: string) => {
    switch (impact) {
      case 'positive':
        return { emoji: '✨', title: 'Gute Entscheidung!', color: 'text-emerald-700' };
      case 'negative':
        return { emoji: '⚠️', title: 'Das hat Auswirkungen...', color: 'text-red-700' };
      default:
        return { emoji: '💡', title: 'Interessante Wahl', color: 'text-amber-700' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 pb-8">
      <AnimatePresence mode="wait">
        {showFeedback && decision ? (
          // Feedback Screen
          <motion.div
            key="feedback"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="p-4 md:p-8 max-w-2xl mx-auto pt-8"
          >
            <div
              className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 ${
                decision.impact === 'positive'
                  ? 'border-emerald-400'
                  : decision.impact === 'negative'
                    ? 'border-red-400'
                    : 'border-amber-400'
              } p-6 md:p-8`}
            >
              {/* Impact Header */}
              <div className="text-center mb-6">
                <span className="text-5xl mb-4 block">{getImpactHeader(decision.impact).emoji}</span>
                <h3 className={`text-xl font-bold ${getImpactHeader(decision.impact).color}`}>
                  {getImpactHeader(decision.impact).title}
                </h3>
              </div>

              {/* Feedback Text */}
              <div className="mb-6">
                <p className="text-amber-900 text-lg leading-relaxed">
                  {decision.feedbackText}
                </p>
              </div>

              {/* Info Box */}
              {decision.infoText && (
                <div
                  className={`mb-6 p-4 rounded-xl ${
                    decision.impact === 'positive'
                      ? 'bg-emerald-50 border border-emerald-200'
                      : decision.impact === 'negative'
                        ? 'bg-red-50 border border-red-200'
                        : 'bg-blue-50 border border-blue-200'
                  }`}
                >
                  <p className="text-sm font-medium mb-1">ℹ️ Wusstest du?</p>
                  <p className="text-sm">{decision.infoText}</p>
                </div>
              )}

              {/* Health Change */}
              <div className="mb-6 text-center">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                    decision.healthChange > 0
                      ? 'bg-emerald-100 text-emerald-700'
                      : decision.healthChange < 0
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>
                    {decision.healthChange > 0 ? '↑' : decision.healthChange < 0 ? '↓' : '→'}
                  </span>
                  <span className="font-medium">
                    {decision.healthChange > 0
                      ? `+${decision.healthChange}% Gesundheit`
                      : decision.healthChange < 0
                        ? `${decision.healthChange}% Gesundheit`
                        : 'Keine Änderung'}
                  </span>
                </div>
              </div>

              {/* Continue Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNext}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-medium text-lg shadow-lg"
              >
                Weiter →
              </motion.button>
            </div>
          </motion.div>
        ) : (
          // Scenario Screen
          <motion.div
            key="scenario"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 md:p-8 max-w-3xl mx-auto pt-8"
          >
            {/* Character Info */}
            {character && (
              <div className="mb-4 flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-amber-200">
                <span className="text-3xl">{character.avatar}</span>
                <div>
                  <p className="font-medium text-amber-900">
                    {character.name}, {character.age} Jahre
                  </p>
                  <p className="text-sm text-amber-600">{character.background}</p>
                </div>
              </div>
            )}

            {/* Scenario Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200 overflow-hidden">
              {/* Scenario Header */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📋</span>
                  <div>
                    <p className="text-amber-100 text-sm">
                      Szenario {scenarioIndex + 1} von {totalScenarios}
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold">{scenario.title}</h2>
                  </div>
                </div>
              </div>

              {/* Scenario Description */}
              <div className="p-4 md:p-6">
                <p className="text-amber-900 text-lg leading-relaxed whitespace-pre-line mb-6">
                  {scenario.description}
                </p>

                {/* Background Info */}
                {scenario.backgroundInfo && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm font-medium text-blue-800 mb-1">📚 Hintergrund:</p>
                    <p className="text-sm text-blue-700">{scenario.backgroundInfo}</p>
                  </div>
                )}

                {/* Decisions */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-amber-700 mb-3">Was tust du?</p>
                  {scenario.decisions.map((dec, index) => (
                    <motion.button
                      key={dec.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01, x: 5 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleClick(index)}
                      onMouseEnter={handleHover}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${getImpactStyle(dec.impact)}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-amber-700 font-bold">{index + 1}.</span>
                        <p className="text-amber-900">{dec.text}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-center"
            >
              <p className="text-amber-600 text-sm">
                💭 Jede Entscheidung hat Auswirkungen auf die Gesundheit deines Babys
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
