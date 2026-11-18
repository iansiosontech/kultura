"use client";

import { PROGRESS_STORAGE_KEY } from "@/lib/kwentoScenes";
import { QUIZ_STORAGE_KEY } from "@/lib/kwentoQuiz";
import { FOLLOWUP_STORAGE_KEY } from "@/lib/followUpQuestions";
import { LEADERBOARD_SUBMITTED_KEY } from "@/lib/leaderboard";

// clears every bit of saved progress — station completion, which scene
// was last open, and every quiz answer/score
export function resetAllProgress() {
  try {
    window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
    window.localStorage.removeItem(QUIZ_STORAGE_KEY);
    window.localStorage.removeItem(FOLLOWUP_STORAGE_KEY);
    window.sessionStorage.removeItem(LEADERBOARD_SUBMITTED_KEY);
  } catch {
    /* ignore */
  }
}
