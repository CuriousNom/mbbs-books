// MBBS Book Library - Realistic Paper Page Turn Sound Synthesizer
// Uses Web Audio API with zero external audio file dependencies

class BookSoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.volume = 0.6;
    
    // Check saved audio preference
    const saved = localStorage.getItem('mbbs_reader_sound');
    if (saved !== null) {
      this.enabled = saved === 'true';
    }
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('mbbs_reader_sound', this.enabled ? 'true' : 'false');
    return this.enabled;
  }

  playPageFlip(direction = 'forward') {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const duration = 0.22 + Math.random() * 0.05; // 220-270ms

      // Create white noise buffer
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      
      // Pink / shaped noise for organic paper texture
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;
        
        // Add subtle tactile envelope directly to the samples
        output[i] = pink * 0.12;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter to match crisp paper frequency (1200Hz - 3200Hz)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      const baseFreq = direction === 'forward' ? 1800 : 1600;
      filter.frequency.setValueAtTime(baseFreq + (Math.random() * 400 - 200), now);
      filter.Q.setValueAtTime(1.2 + Math.random() * 0.4, now);

      // Lowpass filter for paper warmth
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(3600, now);

      // Gain envelope (quick attack, gentle flutter, crisp release)
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(this.volume * 0.75, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(this.volume * 0.45, now + 0.10);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noise.connect(filter);
      filter.connect(lowpass);
      lowpass.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }
}

window.soundManager = new BookSoundManager();
