// One collectible badge per scene, earned when that scene's audio has
// played through at least once (the same "completed" condition that
// unlocks the next station). Icons are plain emoji — no external art
// asset or network fetch needed.
export type Badge = { scene: number; icon: string; label: string };

export const badges: Badge[] = [
  { scene: 1, icon: "🚂", label: "Pag-alis sa Tutuban" },
  { scene: 2, icon: "🎫", label: "Sa Loob ng Tren" },
  { scene: 3, icon: "🌄", label: "Pagdating sa Malawig" },
  { scene: 4, icon: "👪", label: "Mga Kamag-anak" },
  { scene: 5, icon: "🕯️", label: "Sa Harap ng Bangkay" },
  { scene: 6, icon: "📷", label: "Mga Alaala" },
  { scene: 7, icon: "🪁", label: "Kwento ni Lolo Tasyo" },
  { scene: 8, icon: "📜", label: "Ang Unang Tula" },
  { scene: 9, icon: "🪦", label: "Sa Libingan" },
  { scene: 10, icon: "🌾", label: "Pag-uwi sa Puso" },
];
