export type LeaderboardEntry = {
  name: string;
  score: number;
  created_at: string;
};

export async function fetchLeaderboard(): Promise<LeaderboardEntry[] | null> {
  const res = await fetch("/api/leaderboard", { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.entries ?? [];
}

export async function submitScore(
  name: string,
  score: number,
  answers?: { scene: number; guess: string; correct: boolean }[]
): Promise<boolean> {
  const res = await fetch("/api/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, score, answers }),
  });
  return res.ok;
}
