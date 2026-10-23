"use client";

import { useEffect, useState } from "react";

// The "SALITA: ____" identification puzzle printed at the end of each
// scene in the original script PDF — one word/phrase per scene, with
// some letters already revealed and the rest blanked out.
export type QuizItem = { scene: number; pattern: string; answer: string };

export const quizItems: QuizItem[] = [
  { scene: 1, pattern: "P_GL____B_Y", answer: "PAGLALAKBAY" },
  { scene: 2, pattern: "D__D_NG", answer: "DANDING" },
  { scene: 3, pattern: "N_Y_N", answer: "NAYON" },
  { scene: 4, pattern: "K__A_-_N_K", answer: "KAMAG-ANAK" },
  { scene: 5, pattern: "P_G___AM_Y", answer: "PAGLALAMAY" },
  { scene: 6, pattern: "G_N_T_", answer: "GUNITA" },
  { scene: 7, pattern: "K_B_T_A_", answer: "KABATAAN" },
  { scene: 8, pattern: "B_L_K-T_N_W", answer: "BALIK-TANAW" },
  { scene: 9, pattern: "P_G_U_UKS_", answer: "PAGLULUKSA" },
  { scene: 10, pattern: "L___NG_I__BU_N", answer: "LUPANG TINUBUAN" },
];

export const POINTS_PER_CORRECT = 10;
export const MAX_SCORE = quizItems.length * POINTS_PER_CORRECT;

const QUIZ_STORAGE_KEY = "kultura-kwento-quiz-v1";

// letters only, case-insensitive — lets "kamag-anak", "kamag anak" and
// "kamaganak" all count as the same answer
export function normalizeAnswer(s: string): string {
  return s.toUpperCase().replace(/[^A-Z]/g, "");
}

export function readQuizProgress(): number[] {
  try {
    const raw = window.localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// records a correct answer for a scene — idempotent, so re-answering
// correctly never awards points twice
export function markQuizCorrect(scene: number): number[] {
  const current = readQuizProgress();
  if (current.includes(scene)) return current;
  const next = [...current, scene];
  try {
    window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  return next;
}

// current score, re-read fresh on every mount — used for the badge shown
// on the player, at-station, and kiosk screens
export function useQuizScore(): number {
  const [score, setScore] = useState(0);
  useEffect(() => {
    setScore(readQuizProgress().length * POINTS_PER_CORRECT);
  }, []);
  return score;
}
