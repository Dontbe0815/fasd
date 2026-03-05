'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion, getRandomQuestions } from '@/lib/quizData';
import { audioManager } from '@/lib/sounds';

interface QuizGameProps {
  onBack: () => void;
  soundEnabled: boolean;
}

type QuizState = 'intro' | 'playing' | 'result' | 'explanation';

export function QuizGame({ onBack, soundEnabled }: QuizGameProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizState, setQuizState] = useState<QuizState>('intro');
  const [answerHistory, setAnswerHistory] = useState<boolean[]>([]);
  const [timer, setTimer] = useState(15);
  const [timerActive, setTimerActive] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!timerActive || quizState !== 'playing' || selectedAnswer !== null) return;
    
    if (timer <= 0) {
      // Time's up - count as wrong (use setTimeout to avoid synchronous setState)
      const timeoutId = setTimeout(() => {
        setTimerActive(false);
        setAnswerHistory(prev => [...prev, false]);
        setQuizState('explanation');
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    const interval = setInterval(() => {
      setTimer(t => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, timerActive, quizState, selectedAnswer]);

  const startQuiz = () => {
    if (soundEnabled) audioManager.playClick();
    const randomQuestions = getRandomQuestions(10);
    setQuestions(randomQuestions);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizState('playing');
    setAnswerHistory([]);
    setTimer(15);
    setTimerActive(true);
  };

  const selectAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    const isCorrect = index === questions[currentIndex].correctIndex;
    setSelectedAnswer(index);
    setTimerActive(false);
    
    if (soundEnabled) {
      if (isCorrect) audioManager.playPositive();
      else audioManager.playNegative();
    }
    
    if (isCorrect) {
      setScore(s => s + 1);
    }
    setAnswerHistory(prev => [...prev, isCorrect]);
    setQuizState('explanation');
  };

  const nextQuestion = () => {
    if (soundEnabled) audioManager.playClick();
    
    if (currentIndex + 1 >= questions.length) {
      setQuizState('result');
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setTimer(15);
      setTimerActive(true);
      setQuizState('playing');
    }
  };

  const currentQuestion = questions[currentIndex];

  // Intro Screen
  if (quizState === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50">
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
            🧠
          </motion.div>
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">
            Wissens-Quiz
          </h1>
          <p className="text-indigo-700 mb-6 text-lg">
            Teste dein Wissen über FASD, Alkohol in der Schwangerschaft und wie du dich schützen kannst.
          </p>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-6 text-left">
            <h3 className="font-semibold text-indigo-800 mb-2">📋 Spielregeln:</h3>
            <ul className="text-indigo-600 space-y-1 text-sm">
              <li>• 10 zufällige Fragen</li>
              <li>• 15 Sekunden pro Frage</li>
              <li>• 1 Punkt pro richtige Antwort</li>
              <li>• Erkläre Antworten für mehr Wissen</li>
            </ul>
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startQuiz}
              className="w-full px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg"
            >
              Quiz starten! 🚀
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { if (soundEnabled) audioManager.playClick(); onBack(); }}
              className="w-full px-6 py-3 bg-white/80 text-indigo-700 rounded-xl font-medium"
            >
              ← Zurück zum Menü
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Result Screen
  if (quizState === 'result') {
    const percentage = Math.round((score / questions.length) * 100);
    let emoji = '🎉';
    let title = 'Fantastisch!';
    let message = 'Du bist ein FASD-Experte!';
    
    if (percentage < 50) {
      emoji = '📚';
      title = 'Weiter üben!';
      message = 'Lies die Erklärungen und versuche es erneut.';
    } else if (percentage < 80) {
      emoji = '👍';
      title = 'Gut gemacht!';
      message = 'Du hast schon viel gelernt!';
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50">
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
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">{title}</h1>
          <p className="text-indigo-600 mb-6">{message}</p>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mb-6">
            <div className="text-5xl font-bold text-indigo-600 mb-2">
              {score} / {questions.length}
            </div>
            <div className="text-indigo-500">richtige Antworten</div>
            <div className="mt-4 text-2xl font-semibold text-purple-600">
              {percentage}%
            </div>
          </div>

          {/* Answer History */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {answerHistory.map((correct, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  correct 
                    ? 'bg-green-100 text-green-600 border-2 border-green-300' 
                    : 'bg-red-100 text-red-600 border-2 border-red-300'
                }`}
              >
                {correct ? '✓' : '✗'}
              </motion.div>
            ))}
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startQuiz}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-lg"
            >
              Nochmal spielen! 🔄
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { if (soundEnabled) audioManager.playClick(); onBack(); }}
              className="w-full px-6 py-3 bg-white/80 text-indigo-700 rounded-xl font-medium"
            >
              ← Zurück zum Menü
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Playing / Explanation
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto pt-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-indigo-600 mb-1">
            <span>Frage {currentIndex + 1} von {questions.length}</span>
            <span>Punkte: {score}</span>
          </div>
          <div className="h-2 bg-indigo-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Timer */}
        {quizState === 'playing' && (
          <div className="mb-4">
            <div className={`h-3 rounded-full overflow-hidden ${
              timer <= 5 ? 'bg-red-200' : 'bg-indigo-200'
            }`}>
              <motion.div
                className={`h-full ${
                  timer <= 5 
                    ? 'bg-red-500' 
                    : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                }`}
                animate={{ width: `${(timer / 15) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className={`text-center text-sm mt-1 font-medium ${
              timer <= 5 ? 'text-red-600' : 'text-indigo-600'
            }`}>
              ⏱️ {timer} Sekunden
            </div>
          </div>
        )}

        {/* Question Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-4"
        >
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentQuestion.category === 'medical' ? 'bg-red-100 text-red-700' :
              currentQuestion.category === 'social' ? 'bg-blue-100 text-blue-700' :
              currentQuestion.category === 'prevention' ? 'bg-green-100 text-green-700' :
              'bg-purple-100 text-purple-700'
            }`}>
              {currentQuestion.category === 'medical' ? '🏥 Medizin' :
               currentQuestion.category === 'social' ? '👥 Sozial' :
               currentQuestion.category === 'prevention' ? '🛡️ Prävention' :
               '📚 Fakten'}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              currentQuestion.difficulty === 'easy' ? 'bg-green-50 text-green-600' :
              currentQuestion.difficulty === 'medium' ? 'bg-yellow-50 text-yellow-600' :
              'bg-red-50 text-red-600'
            }`}>
              {currentQuestion.difficulty === 'easy' ? '⭐ Einfach' :
               currentQuestion.difficulty === 'medium' ? '⭐⭐ Mittel' :
               '⭐⭐⭐ Schwer'}
            </span>
          </div>

          <h2 className="text-xl font-bold text-indigo-900 mb-6">
            {currentQuestion.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let buttonStyle = 'bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50';
              
              if (selectedAnswer !== null) {
                if (idx === currentQuestion.correctIndex) {
                  buttonStyle = 'bg-green-100 border-green-400 text-green-800';
                } else if (idx === selectedAnswer && selectedAnswer !== currentQuestion.correctIndex) {
                  buttonStyle = 'bg-red-100 border-red-400 text-red-800';
                } else {
                  buttonStyle = 'bg-gray-50 border-gray-200 text-gray-500';
                }
              }

              return (
                <motion.button
                  key={idx}
                  whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                  onClick={() => selectAnswer(idx)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center font-medium text-indigo-600">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {selectedAnswer !== null && idx === currentQuestion.correctIndex && (
                      <span className="text-green-500 text-xl">✓</span>
                    )}
                    {selectedAnswer === idx && selectedAnswer !== currentQuestion.correctIndex && (
                      <span className="text-red-500 text-xl">✗</span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Explanation */}
        <AnimatePresence>
          {quizState === 'explanation' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-4"
            >
              <div className={`flex items-center gap-2 mb-3 ${
                selectedAnswer === currentQuestion.correctIndex
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}>
                {selectedAnswer === currentQuestion.correctIndex ? (
                  <>
                    <span className="text-2xl">🎉</span>
                    <span className="font-bold text-lg">Richtig!</span>
                  </>
                ) : selectedAnswer === null ? (
                  <>
                    <span className="text-2xl">⏰</span>
                    <span className="font-bold text-lg">Zeit abgelaufen!</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">😔</span>
                    <span className="font-bold text-lg">Leider falsch</span>
                  </>
                )}
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Button */}
        {quizState === 'explanation' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextQuestion}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-lg"
            >
              {currentIndex + 1 >= questions.length ? 'Ergebnis anzeigen' : 'Nächste Frage →'}
            </motion.button>
          </motion.div>
        )}

        {/* Back Button (small, top right) */}
        <button
          onClick={() => { if (soundEnabled) audioManager.playClick(); onBack(); }}
          className="fixed top-4 left-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg text-indigo-600 font-medium shadow-md z-50"
        >
          ← Menü
        </button>
      </div>
    </div>
  );
}
