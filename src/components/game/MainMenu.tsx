'use client';

import { motion } from 'framer-motion';
import { audioManager } from '@/lib/sounds';

interface MainMenuProps {
  onStartStory: () => void;
  onStartScenario: () => void;
  onStartQuiz: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenMusic: () => void;
}

export function MainMenu({ 
  onStartStory, 
  onStartScenario, 
  onStartQuiz, 
  soundEnabled, 
  onToggleSound,
  onOpenMusic 
}: MainMenuProps) {
  const handleHover = () => audioManager.playHover();
  const handleClick = () => audioManager.playClick();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const floatAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-300/40 to-purple-300/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-300/40 to-orange-300/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-teal-300/30 to-emerald-300/30 rounded-full blur-3xl"
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={floatAnimation}
          className="absolute top-20 left-10 text-5xl opacity-60"
        >
          🍼
        </motion.div>
        <motion.div
          animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 0.5 } }}
          className="absolute top-32 right-16 text-4xl opacity-60"
        >
          👶
        </motion.div>
        <motion.div
          animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 1 } }}
          className="absolute bottom-32 left-20 text-5xl opacity-60"
        >
          💝
        </motion.div>
        <motion.div
          animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 1.5 } }}
          className="absolute bottom-20 right-24 text-4xl opacity-60"
        >
          🌸
        </motion.div>
        <motion.div
          animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 2 } }}
          className="absolute top-1/2 right-10 text-3xl opacity-50"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 0.8 } }}
          className="absolute top-40 left-1/3 text-3xl opacity-50"
        >
          🌟
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg"
        >
          {/* Logo & Title */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <motion.div
              animate={pulseAnimation}
              className="inline-block mb-4"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 rounded-3xl shadow-2xl flex items-center justify-center transform rotate-3">
                <span className="text-5xl">🤰</span>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 mb-3"
              style={{ textShadow: '0 2px 10px rgba(251, 146, 60, 0.3)' }}
            >
              Lebenspfad
            </motion.h1>
            <motion.p className="text-xl md:text-2xl text-amber-700 font-light tracking-wide">
              Entscheidungen mit Folgen
            </motion.p>
            
            {/* Info Card */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 p-5 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl"
            >
              <p className="text-amber-800 text-sm md:text-base leading-relaxed">
                Ein interaktives Spiel zur <span className="font-semibold">Aufklärung über FASD</span> – 
                die häufigste vermeidbare Ursache für geistige Behinderungen.
              </p>
            </motion.div>
          </motion.div>

          {/* Menu Buttons */}
          <motion.div variants={itemVariants} className="space-y-4">
            {/* Story Mode */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { handleClick(); onStartStory(); }}
              onMouseEnter={handleHover}
              className="w-full relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative py-5 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-xl text-white">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-lg font-bold">Geschichtenmodus</div>
                    <div className="text-emerald-100 text-sm">Erlebe eine komplette Schwangerschaft</div>
                  </div>
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl backdrop-blur-sm">
                    📖
                  </div>
                </div>
              </div>
            </motion.button>

            {/* Scenario Mode */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { handleClick(); onStartScenario(); }}
              onMouseEnter={handleHover}
              className="w-full relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative py-5 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-xl text-white">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-lg font-bold">Szenario-Modus</div>
                    <div className="text-blue-100 text-sm">Meistere typische Alltagssituationen</div>
                  </div>
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl backdrop-blur-sm">
                    🎭
                  </div>
                </div>
              </div>
            </motion.button>

            {/* Quiz Mode */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { handleClick(); onStartQuiz(); }}
              onMouseEnter={handleHover}
              className="w-full relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative py-5 px-6 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl shadow-xl text-white">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-lg font-bold">Wissens-Quiz</div>
                    <div className="text-purple-100 text-sm">Teste dein Wissen über FASD</div>
                  </div>
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl backdrop-blur-sm">
                    🧠
                  </div>
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Control Buttons */}
          <motion.div variants={itemVariants} className="mt-8 flex justify-center gap-4">
            {/* Sound Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                onToggleSound();
                if (!soundEnabled) audioManager.playClick();
              }}
              className={`p-4 rounded-2xl backdrop-blur-xl shadow-lg transition-all ${
                soundEnabled 
                  ? 'bg-gradient-to-br from-amber-200 to-orange-200 text-amber-800 border border-amber-300/50' 
                  : 'bg-gray-200/80 text-gray-500 border border-gray-300/50'
              }`}
            >
              <span className="text-2xl">{soundEnabled ? '🔊' : '🔇'}</span>
            </motion.button>

            {/* Music Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { handleClick(); onOpenMusic(); }}
              className="p-4 rounded-2xl bg-gradient-to-br from-purple-200 to-pink-200 text-purple-700 backdrop-blur-xl shadow-lg border border-purple-300/50"
            >
              <span className="text-2xl">🎵</span>
            </motion.button>
          </motion.div>

          {/* Footer Info */}
          <motion.div variants={itemVariants} className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full">
              <span className="text-amber-600 text-xs">🛡️</span>
              <span className="text-amber-700 text-xs font-medium">
                FASD = Fetale Alkoholspektrumstörung
              </span>
            </div>
            <p className="text-amber-600/70 text-xs mt-3">
              Kein Alkohol in der Schwangerschaft – Für ein gesundes Baby
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
