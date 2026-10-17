// Synthesized cinematic sound effects (Web Audio API) — no audio files needed.
// Browsers only allow audio after a user gesture (click/tap/key), so call these from event handlers.

let ctx = null;
let master = null;

// ── Site-wide sound on/off (off by default; remembered per visitor) ──
const KEY = 'sfx-on';
let on = false;
try { on = localStorage.getItem(KEY) === '1'; } catch { /* storage blocked */ }
const listeners = new Set();
export const isSoundOn = () => on;
export function setSoundOn(v) {
  on = v;
  try { localStorage.setItem(KEY, v ? '1' : '0'); } catch { /* storage blocked */ }
  if (v) audio(); // the toggle click is the user gesture that unlocks audio
  listeners.forEach(fn => fn(v));
}
export function onSoundChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
// True when sound is on AND the visitor has interacted with the page (browsers block audio before that).
export const soundReady = () => on && (navigator.userActivation ? navigator.userActivation.hasBeenActive : true);

function audio() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0.7;
    // gentle compressor so layered sounds don't clip
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp);
    comp.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function noiseBuffer(seconds) {
  const c = audio();
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * seconds), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

function env(gainNode, t, peak, attack, release) {
  const g = gainNode.gain;
  g.setValueAtTime(0.0001, t);
  g.exponentialRampToValueAtTime(peak, t + attack);
  g.exponentialRampToValueAtTime(0.0001, t + attack + release);
}

function noise(seconds) {
  const c = audio();
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(seconds);
  return src;
}

/** Airy swoosh — section transitions, cards flying in. */
export function whoosh({ duration = 0.7, from = 300, to = 3200, volume = 0.5 } = {}) {
  const c = audio(), t = c.currentTime;
  const src = noise(duration + 0.1);
  const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 1.4;
  bp.frequency.setValueAtTime(from, t);
  bp.frequency.exponentialRampToValueAtTime(to, t + duration * 0.6);
  bp.frequency.exponentialRampToValueAtTime(from * 1.5, t + duration);
  const g = c.createGain(); env(g, t, volume, duration * 0.45, duration * 0.55);
  src.connect(bp).connect(g).connect(master);
  src.start(t); src.stop(t + duration + 0.1);
}

/** Deep cinematic hit — title reveals, the clapper snap, big moments. */
export function impact({ volume = 0.9 } = {}) {
  const c = audio(), t = c.currentTime;
  const osc = c.createOscillator(); osc.type = 'sine';
  osc.frequency.setValueAtTime(110, t);
  osc.frequency.exponentialRampToValueAtTime(32, t + 1.2);
  const g = c.createGain(); env(g, t, volume, 0.005, 1.4);
  osc.connect(g).connect(master);
  osc.start(t); osc.stop(t + 1.5);
  // transient crack
  const n = noise(0.3);
  const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1800;
  const ng = c.createGain(); env(ng, t, volume * 0.6, 0.002, 0.25);
  n.connect(lp).connect(ng).connect(master);
  n.start(t); n.stop(t + 0.3);
}

/** Tension riser — builds into a reveal (pair with impact at the end). */
export function riser({ duration = 2, volume = 0.35 } = {}) {
  const c = audio(), t = c.currentTime;
  const osc = c.createOscillator(); osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(110, t);
  osc.frequency.exponentialRampToValueAtTime(880, t + duration);
  const lp = c.createBiquadFilter(); lp.type = 'lowpass';
  lp.frequency.setValueAtTime(400, t); lp.frequency.exponentialRampToValueAtTime(5000, t + duration);
  const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(volume, t + duration * 0.95); g.gain.exponentialRampToValueAtTime(0.0001, t + duration + 0.05);
  osc.connect(lp).connect(g).connect(master);
  osc.start(t); osc.stop(t + duration + 0.1);
  const n = noise(duration);
  const hp = c.createBiquadFilter(); hp.type = 'highpass';
  hp.frequency.setValueAtTime(800, t); hp.frequency.exponentialRampToValueAtTime(8000, t + duration);
  const ng = c.createGain(); ng.gain.setValueAtTime(0.0001, t); ng.gain.exponentialRampToValueAtTime(volume * 0.6, t + duration * 0.95); ng.gain.exponentialRampToValueAtTime(0.0001, t + duration + 0.05);
  n.connect(hp).connect(ng).connect(master);
  n.start(t); n.stop(t + duration);
}

/** Low "braam" horn — the trailer sound. Great with the film title sequence. */
export function braam({ volume = 0.45 } = {}) {
  const c = audio(), t = c.currentTime;
  const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 6;
  lp.frequency.setValueAtTime(120, t); lp.frequency.exponentialRampToValueAtTime(1400, t + 0.35); lp.frequency.exponentialRampToValueAtTime(300, t + 2.6);
  const g = c.createGain(); env(g, t, volume, 0.08, 2.6);
  lp.connect(g).connect(master);
  [55, 55.6, 82.4, 110].forEach(f => {
    const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f;
    o.connect(lp); o.start(t); o.stop(t + 2.8);
  });
}

/** Soft UI tick — hover over buttons/cards. */
export function tick({ volume = 0.15, freq = 1800 } = {}) {
  const c = audio(), t = c.currentTime;
  const o = c.createOscillator(); o.type = 'sine';
  o.frequency.setValueAtTime(freq, t); o.frequency.exponentialRampToValueAtTime(freq * 0.66, t + 0.05);
  const g = c.createGain(); env(g, t, volume, 0.002, 0.06);
  o.connect(g).connect(master); o.start(t); o.stop(t + 0.08);
}

/** Crisp click — buttons, filters, opening a certificate. */
export function click({ volume = 0.3 } = {}) {
  const c = audio(), t = c.currentTime;
  const n = noise(0.05);
  const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2500;
  const g = c.createGain(); env(g, t, volume, 0.001, 0.03);
  n.connect(hp).connect(g).connect(master); n.start(t); n.stop(t + 0.05);
  const o = c.createOscillator(); o.type = 'triangle'; o.frequency.setValueAtTime(900, t); o.frequency.exponentialRampToValueAtTime(400, t + 0.06);
  const og = c.createGain(); env(og, t, volume * 0.6, 0.002, 0.07);
  o.connect(og).connect(master); o.start(t); o.stop(t + 0.1);
}

/** Sparkle shimmer — reveals, the stats counters finishing, success messages. */
export function shimmer({ volume = 0.18 } = {}) {
  const c = audio(), t = c.currentTime;
  [1318.5, 1760, 2093, 2637, 3136, 3520].forEach((f, k) => {
    const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = f;
    const g = c.createGain(); const st = t + k * 0.06;
    g.gain.setValueAtTime(0.0001, t); g.gain.setValueAtTime(0.0001, st);
    g.gain.exponentialRampToValueAtTime(volume, st + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, st + 0.9);
    o.connect(g).connect(master); o.start(t); o.stop(st + 1);
  });
}

/** Digital glitch stutter — glitch-style reveals, tech/AI moments. */
export function glitch({ volume = 0.22 } = {}) {
  const c = audio(), t = c.currentTime;
  for (let k = 0; k < 9; k++) {
    const st = t + k * 0.035 + Math.random() * 0.02;
    const o = c.createOscillator(); o.type = 'square'; o.frequency.value = 200 + Math.random() * 2400;
    const g = c.createGain(); env(g, st, volume * (0.4 + Math.random() * 0.6), 0.001, 0.025);
    o.connect(g).connect(master); o.start(st); o.stop(st + 0.04);
  }
}

/** Film projector rattle — under the countdown leader / film strip. */
export function projector({ duration = 2, volume = 0.25 } = {}) {
  const c = audio(), t = c.currentTime;
  const frames = Math.floor(duration * 24);
  for (let k = 0; k < frames; k++) {
    const st = t + k / 24;
    const n = noise(0.02);
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2200; bp.Q.value = 3;
    const g = c.createGain(); env(g, st, volume, 0.001, 0.015);
    n.connect(bp).connect(g).connect(master); n.start(st); n.stop(st + 0.02);
  }
  const hum = c.createOscillator(); hum.type = 'sine'; hum.frequency.value = 60;
  const hg = c.createGain(); hg.gain.setValueAtTime(0.0001, t); hg.gain.exponentialRampToValueAtTime(volume * 0.4, t + 0.2); hg.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  hum.connect(hg).connect(master); hum.start(t); hum.stop(t + duration);
}

/** Typewriter key — the code terminal / kinetic typing. */
export function typeKey({ volume = 0.2 } = {}) {
  const c = audio(), t = c.currentTime;
  const n = noise(0.04);
  const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 3500 + Math.random() * 1500; bp.Q.value = 2;
  const g = c.createGain(); env(g, t, volume, 0.001, 0.03);
  n.connect(bp).connect(g).connect(master); n.start(t); n.stop(t + 0.04);
}

/** Neon buzz — the neon sign flickering on. */
export function neonBuzz({ duration = 1.4, volume = 0.12 } = {}) {
  const c = audio(), t = c.currentTime;
  const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = 120;
  const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
  const g = c.createGain(); g.gain.setValueAtTime(0.0001, t);
  // flicker pattern matching the sign's stutter
  [[0, 0.8], [0.08, 0.05], [0.12, 0.9], [0.24, 0.1], [0.3, 1], [0.46, 0.2], [0.48, 1]].forEach(([at, v]) => g.gain.setValueAtTime(volume * v + 0.0001, t + at));
  g.gain.setValueAtTime(volume, t + duration - 0.2); g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  o.connect(lp).connect(g).connect(master); o.start(t); o.stop(t + duration);
}

export const SFX = { whoosh, impact, riser, braam, tick, click, shimmer, glitch, projector, typeKey, neonBuzz };

/** Generic tone — building block for melodic/arcade/marimba sounds. */
export function tone({ freq = 880, type = 'sine', volume = 0.2, attack = 0.005, release = 0.25, glideTo = null, delay = 0 } = {}) {
  const c = audio(), t = c.currentTime + delay;
  const o = c.createOscillator(); o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t + attack + release);
  const g = c.createGain(); env(g, t, volume, attack, release);
  o.connect(g).connect(master); o.start(t); o.stop(t + attack + release + 0.05);
}

/** Marimba-like mallet note (sine + quick overtone). */
export function mallet({ freq = 523.25, volume = 0.25, delay = 0 } = {}) {
  tone({ freq, type: 'sine', volume, attack: 0.003, release: 0.6, delay });
  tone({ freq: freq * 4, type: 'sine', volume: volume * 0.25, attack: 0.002, release: 0.08, delay });
}

/** Bell ding (typewriter bell / notification). */
export function bell({ freq = 1567.98, volume = 0.22 } = {}) {
  [1, 2.76, 5.4].forEach((m, k) => tone({ freq: freq * m, type: 'sine', volume: volume / (k + 1), attack: 0.002, release: 1.4 / (k + 1) }));
}

/** Coin / "ka-ching". */
export function coin({ volume = 0.18 } = {}) {
  tone({ freq: 987.77, type: 'square', volume, attack: 0.002, release: 0.08 });
  tone({ freq: 1318.51, type: 'square', volume, attack: 0.002, release: 0.35, delay: 0.08 });
}

/** Low heartbeat pulse. */
export function pulse({ volume = 0.5 } = {}) {
  tone({ freq: 70, glideTo: 45, type: 'sine', volume, attack: 0.005, release: 0.18 });
  tone({ freq: 60, glideTo: 40, type: 'sine', volume: volume * 0.7, attack: 0.005, release: 0.2, delay: 0.16 });
}

/** Sci-fi scanning sweep. */
export function sweep({ duration = 1.2, volume = 0.12 } = {}) {
  tone({ freq: 300, glideTo: 2400, type: 'sine', volume, attack: duration * 0.3, release: duration * 0.7 });
  tone({ freq: 305, glideTo: 2440, type: 'triangle', volume: volume * 0.5, attack: duration * 0.3, release: duration * 0.7 });
}

/** Soft pad swell (gentle, minimal). */
export function swell({ duration = 1.6, volume = 0.12 } = {}) {
  [261.63, 329.63, 392, 523.25].forEach(f => tone({ freq: f, type: 'sine', volume: volume / 2, attack: duration * 0.6, release: duration * 0.6 }));
}

/** Filtered noise hit — snare, hi-hat, cymbal, splash, crackle. */
export function noiseHit({ type = 'highpass', freq = 6000, q = 0.8, volume = 0.2, attack = 0.002, release = 0.15, delay = 0 } = {}) {
  const c = audio(), t = c.currentTime + delay;
  const src = noise(attack + release + 0.05);
  const f = c.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
  const g = c.createGain(); env(g, t, volume, attack, release);
  src.connect(f).connect(g).connect(master); src.start(t); src.stop(t + attack + release + 0.05);
}

/** Cymbal crash. */
export function crash({ volume = 0.25 } = {}) {
  noiseHit({ type: 'highpass', freq: 5000, volume, attack: 0.002, release: 1.6 });
  noiseHit({ type: 'bandpass', freq: 9000, q: 1.5, volume: volume * 0.6, attack: 0.001, release: 0.9 });
}

/** Vinyl crackle bed. */
export function crackle({ duration = 2, volume = 0.12 } = {}) {
  for (let k = 0; k < duration * 30; k++) noiseHit({ type: 'highpass', freq: 3000 + Math.random() * 4000, volume: volume * Math.random(), attack: 0.001, release: 0.004 + Math.random() * 0.01, delay: Math.random() * duration });
  noiseHit({ type: 'lowpass', freq: 400, volume: volume * 0.25, attack: 0.3, release: duration });
}

// ── Cinematic building blocks (no landing hits; everything fades out on its own) ──

/** Filtered low drone/string tone with optional pitch glide and an opening filter. */
export function drone({ freqs = [55], type = 'sawtooth', duration = 2, volume = 0.12, glide = 1, cutoff = [200, 1600], attack = 0.6, delay = 0 } = {}) {
  const c = audio(), t = c.currentTime + delay;
  const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 2;
  lp.frequency.setValueAtTime(cutoff[0], t); lp.frequency.exponentialRampToValueAtTime(cutoff[1], t + duration * 0.85);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(volume, t + attack); g.gain.setValueAtTime(volume, t + duration * 0.7); g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  lp.connect(g).connect(master);
  freqs.forEach(f => {
    const o = c.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f, t); if (glide !== 1) o.frequency.exponentialRampToValueAtTime(f * glide, t + duration);
    o.connect(lp); o.start(t); o.stop(t + duration + 0.05);
  });
}

/** Taiko drum hit. */
export function taiko({ volume = 0.6, delay = 0 } = {}) {
  tone({ freq: 95, glideTo: 48, volume, attack: 0.003, release: 0.5, delay });
  noiseHit({ type: 'lowpass', freq: 700, volume: volume * 0.5, attack: 0.001, release: 0.12, delay });
}

/** Ethereal choir "aah" pad (formant-filtered chord). */
export function choir({ notes = [220, 277.18, 329.63, 440], duration = 2.2, volume = 0.1 } = {}) {
  const c = audio(), t = c.currentTime;
  const out = c.createGain();
  out.gain.setValueAtTime(0.0001, t); out.gain.exponentialRampToValueAtTime(volume, t + duration * 0.45); out.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  out.connect(master);
  [[800, 6], [1150, 8], [2900, 10]].forEach(([f, q], k) => {
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = q;
    const fg = c.createGain(); fg.gain.value = [1, 0.6, 0.25][k] * 4;
    bp.connect(fg).connect(out);
    notes.forEach(n => [0, 4].forEach(det => {
      const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = n; o.detune.value = det - 2;
      const vib = c.createOscillator(); vib.frequency.value = 5; const vg = c.createGain(); vg.gain.value = 3; vib.connect(vg).connect(o.detune);
      o.connect(bp); o.start(t); o.stop(t + duration + 0.05); vib.start(t); vib.stop(t + duration + 0.05);
    }));
  });
}

/** Reverse swell: sound that sucks in and rises, cut cleanly at the end (no hit). */
export function reverseSwell({ duration = 1.8, volume = 0.3 } = {}) {
  const c = audio(), t = c.currentTime;
  const src = noise(duration + 0.05);
  const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.setValueAtTime(4000, t); hp.frequency.exponentialRampToValueAtTime(900, t + duration);
  const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(volume, t + duration - 0.02); g.gain.linearRampToValueAtTime(0.0001, t + duration);
  src.connect(hp).connect(g).connect(master); src.start(t); src.stop(t + duration + 0.05);
  [196, 293.66, 392].forEach(f => {
    const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = f;
    const og = c.createGain(); og.gain.setValueAtTime(0.0001, t); og.gain.exponentialRampToValueAtTime(volume * 0.25, t + duration - 0.02); og.gain.linearRampToValueAtTime(0.0001, t + duration);
    o.connect(og).connect(master); o.start(t); o.stop(t + duration + 0.05);
  });
}

/** FM synth tone — metallic / futuristic digital textures. */
export function fmTone({ freq = 440, ratio = 2, depth = 300, duration = 0.3, volume = 0.12, glideTo = null, attack = 0.005, type = 'sine', delay = 0 } = {}) {
  const c = audio(), t = c.currentTime + delay;
  const car = c.createOscillator(); car.type = type; car.frequency.setValueAtTime(freq, t);
  const mod = c.createOscillator(); mod.frequency.setValueAtTime(freq * ratio, t);
  if (glideTo) { car.frequency.exponentialRampToValueAtTime(glideTo, t + duration); mod.frequency.exponentialRampToValueAtTime(glideTo * ratio, t + duration); }
  const md = c.createGain(); md.gain.value = depth;
  mod.connect(md).connect(car.frequency);
  const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(volume, t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  car.connect(g).connect(master);
  car.start(t); mod.start(t); car.stop(t + duration + 0.05); mod.stop(t + duration + 0.05);
}

/** Tremolo hum — power-up / hologram buzz that rises and fades. */
export function hum({ freq = 110, duration = 2, volume = 0.08, rate = 14, glideTo = null } = {}) {
  const c = audio(), t = c.currentTime;
  const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.setValueAtTime(freq, t);
  if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t + duration);
  const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(400, t); lp.frequency.exponentialRampToValueAtTime(2400, t + duration * 0.8);
  const trem = c.createGain(); trem.gain.value = 0.5;
  const lfo = c.createOscillator(); lfo.frequency.value = rate; const lg = c.createGain(); lg.gain.value = 0.5; lfo.connect(lg).connect(trem.gain);
  const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(volume, t + duration * 0.5); g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  o.connect(lp).connect(trem).connect(g).connect(master);
  o.start(t); lfo.start(t); o.stop(t + duration + 0.05); lfo.stop(t + duration + 0.05);
}
