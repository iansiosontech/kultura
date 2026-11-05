// Cosmetic train liveries unlocked by progress — purely visual, no
// gameplay effect. Reuses the same `completed[]` count everything else
// (badges, the completionist title) already tracks.
export type TrainTier = {
  id: string;
  name: string;
  minCompleted: number;
  // "" keeps the default/classic livery defined in globals.css
  className: string;
};

export const trainTiers: TrainTier[] = [
  { id: "classic", name: "Klasikong Itim", minCompleted: 0, className: "" },
  { id: "bronze", name: "Tansong Ekspreso", minCompleted: 3, className: "trp--bronze" },
  { id: "green", name: "Berdeng Linya", minCompleted: 6, className: "trp--green" },
  { id: "gold", name: "Gintong Alaala", minCompleted: 10, className: "trp--gold" },
];

export function trainTierFor(completedCount: number): TrainTier {
  let best = trainTiers[0];
  for (const tier of trainTiers) {
    if (completedCount >= tier.minCompleted) best = tier;
  }
  return best;
}
