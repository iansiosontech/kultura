export type Scene = {
  n: number;      // 1-36
  text: string;   // narration shown on screen
};

// Narration text per scene. Replace each `text` with the real narration
// that matches the audio for that scene.
// Files are resolved by number: /kwento/images/07.jpg + /kwento/audio/07.mp3
export const scenes: Scene[] = Array.from({ length: 36 }, (_, i) => ({
  n: i + 1,
  text: `Eksena ${i + 1} — palitan ang tekstong ito ng aktwal na salita ng tagapagsalaysay.`,
}));

export const pad = (n: number) => String(n).padStart(2, "0");
export const imageSrc = (n: number) => `/kwento/images/${pad(n)}.jpg`;
// Files are named like "VO. SCENE 1.mp3" — spaces must be URL-encoded,
// so encode the filename only (not the folder slashes).
export const audioSrc = (n: number) =>
  `/kwento/audio/${encodeURIComponent(`VO. SCENE ${n}.mp4`)}`;