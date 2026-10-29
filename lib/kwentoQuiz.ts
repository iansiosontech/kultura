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
  // pattern must be the exact same length as answer, character-for-character
  // aligned (including the literal space and hyphen) — each "_" becomes one
  // letter-box input
  { scene: 10, pattern: "L___NG _I__BU_N", answer: "LUPANG TINUBUAN" },
];

export const POINTS_PER_CORRECT = 1;
export const MAX_SCORE = quizItems.length * POINTS_PER_CORRECT;

// one submitted answer per scene — kept (not just right/wrong) so the
// results screen at the end can show what the player actually typed
// next to the correct word
export type QuizAnswer = { scene: number; guess: string; correct: boolean };

const QUIZ_STORAGE_KEY = "kultura-kwento-quiz-v2";

export function readQuizAnswers(): QuizAnswer[] {
  try {
    const raw = window.localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// records (or replaces) the answer for a scene — one answer per scene,
// correctness is never revealed back to the caller here on purpose
export function recordQuizAnswer(
  scene: number,
  guess: string,
  correct: boolean
): QuizAnswer[] {
  const next = [
    ...readQuizAnswers().filter((a) => a.scene !== scene),
    { scene, guess, correct },
  ];
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
    setScore(
      readQuizAnswers().filter((a) => a.correct).length * POINTS_PER_CORRECT
    );
  }, []);
  return score;
}
