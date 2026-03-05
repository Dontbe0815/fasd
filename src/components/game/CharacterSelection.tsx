'use client';

import { motion } from 'framer-motion';
import { audioManager } from '@/lib/sounds';

interface Character {
  id: string;
  name: string;
  age: number;
  background: string;
  challenges: string;
  avatar: string;
}

interface CharacterSelectionProps {
  characters: Character[];
  onSelect: (character: Character) => void;
  onBack: () => void;
}

const characterColors: Record<string, { from: string; to: string; accent: string }> = {
  anna: { from: 'from-rose-400', to: 'to-pink-500', accent: 'bg-rose-50 border-rose-200' },
  lena: { from: 'from-purple-400', to: 'to-violet-500', accent: 'bg-purple-50 border-purple-200' },
  sarah: { from: 'from-teal-400', to: 'to-emerald-500', accent: 'bg-teal-50 border-teal-200' },
  mila: { from: 'from-amber-400', to: 'to-orange-500', accent: 'bg-amber-50 border-amber-200' },
};

export function CharacterSelection({ characters, onSelect, onBack }: CharacterSelectionProps) {
  const handleHover = () => audioManager.playHover();

  const handleSelect = (character: Character) => {
    audioManager.playClick();
    onSelect(character);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-rose-300/40 to-pink-300/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-amber-300/40 to-orange-300/40 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-xl flex items-center justify-center transform -rotate-3">
                <span className="text-3xl">👩‍👧</span>
              </div>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-3">
              Wähle deinen Charakter
            </h2>
            <p className="text-amber-700 text-lg max-w-md mx-auto">
              Jede Frau hat ihre eigene Geschichte – wähle eine und erlebe ihre Herausforderungen
            </p>
          </motion.div>

          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { audioManager.playClick(); onBack(); }}
            onMouseEnter={handleHover}
            className="mb-8 flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-amber-700 hover:text-amber-900 hover:bg-white/90 transition-all shadow-md"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">Zurück</span>
          </motion.button>

          {/* Character Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {characters.map((character, index) => {
              const colors = characterColors[character.id] || characterColors.anna;
              
              return (
                <motion.div
                  key={character.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative"
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.from} ${colors.to} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`} />
                  
                  <div className={`relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 transition-all group-hover:shadow-2xl`}>
                    {/* Character Header */}
                    <div className={`bg-gradient-to-r ${colors.from} ${colors.to} p-5`}>
                      <div className="flex items-center gap-4">
                        <motion.div 
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl shadow-lg"
                        >
                          {character.avatar}
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {character.name}
                          </h3>
                          <span className="inline-block mt-1 px-3 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm">
                            {character.age} Jahre alt
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Character Details */}
                    <div className="p-5 space-y-4">
                      {/* Background */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          📖 Hintergrund
                        </p>
                        <p className="text-gray-700 leading-relaxed">{character.background}</p>
                      </div>

                      {/* Challenges */}
                      <div className={`p-3 rounded-xl ${colors.accent} border`}>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          ⚡ Herausforderungen
                        </p>
                        <p className="text-gray-600 text-sm">{character.challenges}</p>
                      </div>

                      {/* Select Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(character)}
                        onMouseEnter={handleHover}
                        className={`w-full py-3.5 bg-gradient-to-r ${colors.from} ${colors.to} text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
                      >
                        <span>Mit {character.name} spielen</span>
                        <span className="text-lg">→</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="font-semibold text-blue-800 mb-1">Tipp</p>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Jeder Charakter bietet eine andere Perspektive auf die Themen Schwangerschaft 
                  und Alkohol. Probiere mehrere Charaktere aus, um die verschiedenen Facetten zu erleben!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
