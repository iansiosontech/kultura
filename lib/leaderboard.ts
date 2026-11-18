// longest name the leaderboard accepts — enforced by the API too
export const LEADERBOARD_NAME_MAX = 48;

// sessionStorage flag: this tab already submitted its finished run
export const LEADERBOARD_SUBMITTED_KEY = "kultura-kwento-leaderboard-submitted-v1";

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
  answers?: { scene: number; guess: string; correct: boolean }[],
  followUpAnswers?: {
    scene: number;
    questionIndex: number;
    choiceIndex: number;
    correct: boolean;
  }[]
): Promise<boolean> {
  const res = await fetch("/api/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, score, answers, followUpAnswers }),
  });
  return res.ok;
}
