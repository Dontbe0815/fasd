// Audio System using Web Audio API for synthesized sounds

class AudioManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private heartbeatInterval: ReturnType<typeof setInterval> | null = null;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return this.audioContext;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      this.stopHeartbeat();
    }
  }

  // Generate a simple tone
  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
    if (!this.enabled) return;

    try {
      const ctx = this.getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch {
      // Audio not available
    }
  }

  // UI Sounds
  playClick() {
    this.playTone(800, 0.08, 'sine', 0.2);
  }

  playHover() {
    this.playTone(600, 0.04, 'sine', 0.1);
  }

  // Decision Feedback Sounds
  playPositive() {
    // Ascending arpeggio
    this.playTone(523, 0.15, 'sine', 0.2); // C5
    setTimeout(() => this.playTone(659, 0.15, 'sine', 0.2), 100); // E5
    setTimeout(() => this.playTone(784, 0.2, 'sine', 0.25), 200); // G5
  }

  playNeutral() {
    this.playTone(440, 0.2, 'triangle', 0.2);
  }

  playNegative() {
    // Descending tone
    this.playTone(400, 0.15, 'sawtooth', 0.15);
    setTimeout(() => this.playTone(300, 0.2, 'sawtooth', 0.15), 100);
  }

  // Heartbeat background sound
  private playHeartbeatOnce() {
    if (!this.enabled) return;

    try {
      const ctx = this.getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = 60;
      oscillator.type = 'sine';

      // Heartbeat pattern: lub-dub
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);

      // Second beat
      setTimeout(() => {
        if (!this.enabled) return;
        try {
          const ctx2 = this.getContext();
          const osc2 = ctx2.createOscillator();
          const gain2 = ctx2.createGain();
          osc2.connect(gain2);
          gain2.connect(ctx2.destination);
          osc2.frequency.value = 50;
          osc2.type = 'sine';
          gain2.gain.setValueAtTime(0.06, ctx2.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.01, ctx2.currentTime + 0.08);
          osc2.start(ctx2.currentTime);
          osc2.stop(ctx2.currentTime + 0.08);
        } catch {
          // Audio not available
        }
      }, 150);
    } catch {
      // Audio not available
    }
  }

  startHeartbeat() {
    if (!this.enabled || this.heartbeatInterval) return;

    this.playHeartbeatOnce();
    this.heartbeatInterval = setInterval(() => {
      this.playHeartbeatOnce();
    }, 1000); // ~60 BPM
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
}

// Singleton instance
export const audioManager = new AudioManager();
