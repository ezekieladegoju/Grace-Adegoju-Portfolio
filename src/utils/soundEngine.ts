/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Global muted state stored in memory and synced with localStorage
let isMuted = true;

try {
  const savedMute = localStorage.getItem('site_ui_sounds_muted');
  if (savedMute !== null) {
    isMuted = savedMute === 'true';
  }
} catch (e) {
  console.warn('Failed to access localStorage for sound state', e);
}

// Audio Context initialized lazily
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  
  if (!audioCtx) {
    // Support standard and prefixed AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  
  // Resume if suspended (browser security policy)
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  
  return audioCtx;
}

export const soundEngine = {
  getMuted(): boolean {
    return isMuted;
  },

  setMuted(muted: boolean) {
    isMuted = muted;
    try {
      localStorage.setItem('site_ui_sounds_muted', String(muted));
    } catch (e) {
      // Ignored
    }
    
    // Resume context if unmuting
    if (!muted) {
      getAudioContext();
    }
  },

  /**
   * Synthesizes a soft, organic tactile "tap/click" sound.
   */
  playClick() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Main tone generator
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);

    gainNode.gain.setValueAtTime(0.06, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  },

  /**
   * Synthesizes a very soft, subtle tactile "hover pop" sound.
   */
  playHover() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    // Very gentle pitch
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);

    // Keep it extremely quiet
    gainNode.gain.setValueAtTime(0.025, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  },

  /**
   * Synthesizes an ascending organic chime double-pluck for Toggle On actions.
   */
  playToggleOn() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // First note
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(293.66, now); // D4
    osc1.frequency.exponentialRampToValueAtTime(349.23, now + 0.1); // F4
    gain1.gain.setValueAtTime(0.04, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.13);

    // Second note (slightly delayed and higher pitch)
    const delay = 0.06;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(440.00, now + delay); // A4
    osc2.frequency.exponentialRampToValueAtTime(523.25, now + delay + 0.12); // C5
    gain2.gain.setValueAtTime(0.035, now + delay);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.14);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + delay);
    osc2.stop(now + delay + 0.15);
  },

  /**
   * Synthesizes a descending organic chime double-pluck for Toggle Off actions.
   */
  playToggleOff() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // First note
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(440.00, now); // A4
    osc1.frequency.exponentialRampToValueAtTime(349.23, now + 0.1); // F4
    gain1.gain.setValueAtTime(0.04, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.13);

    // Second note (slightly delayed and lower pitch)
    const delay = 0.06;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(293.66, now + delay); // D4
    osc2.frequency.exponentialRampToValueAtTime(220.00, now + delay + 0.12); // A3
    gain2.gain.setValueAtTime(0.035, now + delay);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.14);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + delay);
    osc2.stop(now + delay + 0.15);
  },

  /**
   * Synthesizes a gentle ambient swoosh/filter sweep for transitions/modals opening.
   */
  playSwoosh() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    // Gentle upward pitch glide
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.25);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + 0.25);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.03, now + 0.08);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  }
};
