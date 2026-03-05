// Background Music System using Web Audio API

class MusicManager {
  private audioContext: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private gainNode: GainNode | null = null;
  private enabled: boolean = true;
  private volume: number = 0.3;
  private isPlaying: boolean = false;
  private currentTrack: string | null = null;
  private audioSource: AudioBufferSourceNode | null = null;
  private audioBuffer: AudioBuffer | null = null;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return this.audioContext;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.gainNode) {
      this.gainNode.gain.value = this.volume;
    }
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  // Load audio from URL (for hosted files)
  async loadFromUrl(url: string): Promise<boolean> {
    try {
      const ctx = this.getContext();
      
      // Stop current playback
      this.stop();
      
      // Fetch audio data
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      
      return true;
    } catch (error) {
      console.error('Failed to load audio:', error);
      return false;
    }
  }

  // Load audio from File object (for user uploads)
  async loadFromFile(file: File): Promise<boolean> {
    try {
      const ctx = this.getContext();
      
      // Stop current playback
      this.stop();
      
      // Read file
      const arrayBuffer = await file.arrayBuffer();
      this.audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      this.currentTrack = file.name;
      
      return true;
    } catch (error) {
      console.error('Failed to load audio file:', error);
      return false;
    }
  }

  // Load audio from base64 data URL
  async loadFromDataUrl(dataUrl: string, name: string = 'Custom Track'): Promise<boolean> {
    try {
      const ctx = this.getContext();
      
      // Stop current playback
      this.stop();
      
      // Convert data URL to array buffer
      const response = await fetch(dataUrl);
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      this.currentTrack = name;
      
      return true;
    } catch (error) {
      console.error('Failed to load audio from data URL:', error);
      return false;
    }
  }

  play() {
    if (!this.enabled || !this.audioBuffer) return;
    
    try {
      const ctx = this.getContext();
      
      // Resume context if suspended
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      // Stop current playback
      if (this.audioSource) {
        this.audioSource.stop();
        this.audioSource.disconnect();
      }
      
      // Create new source
      this.audioSource = ctx.createBufferSource();
      this.audioSource.buffer = this.audioBuffer;
      this.audioSource.loop = true;
      
      // Create gain node for volume control
      this.gainNode = ctx.createGain();
      this.gainNode.gain.value = this.volume;
      
      // Connect nodes
      this.audioSource.connect(this.gainNode);
      this.gainNode.connect(ctx.destination);
      
      // Start playback
      this.audioSource.start(0);
      this.isPlaying = true;
      
    } catch (error) {
      console.error('Failed to play audio:', error);
    }
  }

  stop() {
    if (this.audioSource) {
      try {
        this.audioSource.stop();
        this.audioSource.disconnect();
      } catch {
        // Ignore errors when stopping
      }
      this.audioSource = null;
    }
    this.isPlaying = false;
  }

  pause() {
    this.stop();
  }

  toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  getEnabled(): boolean {
    return this.enabled;
  }

  getVolume(): number {
    return this.volume;
  }

  getCurrentTrack(): string | null {
    return this.currentTrack;
  }

  hasAudioLoaded(): boolean {
    return this.audioBuffer !== null;
  }
}

// Singleton instance
export const musicManager = new MusicManager();
