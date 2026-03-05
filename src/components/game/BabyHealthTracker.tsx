'use client';

import { motion } from 'framer-motion';

interface BabyHealthTrackerProps {
  health: number; // 0-100
  week: number;
}

export function BabyHealthTracker({ health, week }: BabyHealthTrackerProps) {
  // Determine health color
  const getHealthColor = (h: number) => {
    if (h >= 70) return { from: 'from-emerald-400', to: 'to-emerald-600', text: 'text-emerald-600', bg: 'bg-emerald-100' };
    if (h >= 40) return { from: 'from-amber-400', to: 'to-amber-600', text: 'text-amber-600', bg: 'bg-amber-100' };
    return { from: 'from-red-400', to: 'to-red-600', text: 'text-red-600', bg: 'bg-red-100' };
  };

  const getHealthLabel = (h: number) => {
    if (h >= 90) return 'Ausgezeichnet';
    if (h >= 70) return 'Gut';
    if (h >= 50) return 'Leichte Beeinträchtigung';
    if (h >= 30) return 'Beeinträchtigt';
    return 'Kritisch';
  };

  const colors = getHealthColor(health);

  // Development milestones based on weeks
  const milestones = [
    { id: 'heart', label: 'Herz', achieved: week >= 6, icon: '❤️' },
    { id: 'organs', label: 'Organe', achieved: week >= 10, icon: '🫀' },
    { id: 'brain', label: 'Gehirn', achieved: week >= 20, icon: '🧠' },
    { id: 'lungs', label: 'Lungen', achieved: week >= 28, icon: '🫁' },
  ];

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/90 backdrop-blur-sm border-b border-amber-200 shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Week Display */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👶</span>
            </div>
            <div>
              <p className="text-xs text-amber-600 font-medium">Schwangerschaft</p>
              <p className="text-lg font-bold text-amber-900">Woche {week} von 40</p>
            </div>
          </div>

          {/* Health Bar */}
          <div className="flex-1 max-w-xs min-w-[200px]">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-amber-700">Gesundheit</span>
              <span className={`font-medium ${colors.text}`}>
                {getHealthLabel(health)}
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${health}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`h-full bg-gradient-to-r ${colors.from} ${colors.to} rounded-full`}
              />
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-400">0</span>
              <span className="text-amber-600 font-medium">{health}%</span>
              <span className="text-gray-400">100</span>
            </div>
          </div>

          {/* Milestones */}
          <div className="flex items-center gap-2">
            {milestones.map((milestone) => (
              <motion.div
                key={milestone.id}
                initial={{ scale: 0 }}
                animate={{ scale: milestone.achieved ? 1 : 0.8 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  milestone.achieved
                    ? 'bg-emerald-100 border-2 border-emerald-400'
                    : 'bg-gray-100 border-2 border-gray-200 opacity-50'
                }`}
                title={milestone.label}
              >
                <span className="text-lg">{milestone.icon}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
