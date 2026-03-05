'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { musicManager } from '@/lib/music';

interface MusicPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MusicPanel({ isOpen, onClose }: MusicPanelProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [trackName, setTrackName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize state from music manager
  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    const timeoutId = setTimeout(() => {
      setTrackName(musicManager.getCurrentTrack());
      setIsPlaying(musicManager.getIsPlaying());
      setVolume(Math.round(musicManager.getVolume() * 100));
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    
    try {
      const success = await musicManager.loadFromFile(file);
      if (success) {
        setTrackName(file.name);
        musicManager.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Failed to load audio:', error);
    }
    
    setIsLoading(false);
  };

  const handleTogglePlay = () => {
    if (!musicManager.hasAudioLoaded()) {
      fileInputRef.current?.click();
      return;
    }
    
    musicManager.toggle();
    setIsPlaying(musicManager.getIsPlaying());
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    musicManager.setVolume(newVolume / 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span>🎵</span> Hintergrundmusik
                  </h2>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-white/80 mt-1 text-sm">
                  Lade dein eigenes Musikstück hoch
                </p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Track Info */}
                {trackName && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white ${isPlaying ? 'animate-pulse' : ''}`}>
                        {isPlaying ? '🎶' : '🎵'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{trackName}</p>
                        <p className="text-sm text-gray-500">{isPlaying ? 'Wird abgespielt' : 'Pausiert'}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Upload Button */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="w-full py-4 border-2 border-dashed border-purple-300 rounded-xl text-purple-600 hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Wird geladen...
                      </>
                    ) : (
                      <>
                        <span className="text-xl">📁</span>
                        Musikdatei hochladen
                      </>
                    )}
                  </motion.button>
                  <p className="text-center text-xs text-gray-400 mt-2">
                    Unterstützt: MP3, WAV, OGG, M4A
                  </p>
                </div>

                {/* Play/Pause Button */}
                {musicManager.hasAudioLoaded() && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleTogglePlay}
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
                      isPlaying
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}
                  >
                    {isPlaying ? '⏸️ Pausieren' : '▶️ Abspielen'}
                  </motion.button>
                )}

                {/* Volume Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <span>🔊</span> Lautstärke
                    </span>
                    <span className="text-sm font-medium text-purple-600">{volume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-5
                      [&::-webkit-slider-thumb]:h-5
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-gradient-to-r
                      [&::-webkit-slider-thumb]:from-purple-500
                      [&::-webkit-slider-thumb]:to-pink-500
                      [&::-webkit-slider-thumb]:shadow-lg
                      [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>

                {/* Info Box */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex gap-2">
                    <span className="text-lg">💡</span>
                    <div className="text-sm text-amber-800">
                      <p className="font-medium mb-1">Tipp für Suno-Musik:</p>
                      <ol className="list-decimal list-inside space-y-1 text-amber-700">
                        <li>Gehe zu deinem Song auf Suno</li>
                        <li>Klicke auf "Download" oder das ⋮ Menü</li>
                        <li>Lade die MP3-Datei herunter</li>
                        <li>Lade sie hier hoch</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
