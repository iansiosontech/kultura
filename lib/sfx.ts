"use client";

// Every sound here is synthesized on the fly with the Web Audio API — no
// audio files, no network fetch. (Sourcing real sound effects would need
// reaching sites like freesound.org/kenney.nl, which this environment's
// network policy blocks — same reason the train art became an SVG.)
// Each function is only ever called from inside a real click handler, so
// the AudioContext always gets created/resumed on a genuine user gesture,
// which is what browser autoplay policy requires.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

function tone(
  audioCtx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  type: OscillatorType,
  peakGain: number
) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);
}

// a short, quiet blip for any button press
export function playClick() {
  const audioCtx = getCtx();
  if (!audioCtx) return;
  tone(audioCtx, 820, audioCtx.currentTime, 0.05, "square", 0.04);
}

// two-note rising chime — used when a scene completes
export function playLevelComplete() {
  const audioCtx = getCtx();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
  notes.forEach((freq, i) =>
    tone(audioCtx, freq, now + i * 0.09, 0.22, "triangle", 0.06)
  );
}
