"use client";

import { PROGRESS_STORAGE_KEY } from "@/lib/kwentoScenes";
import { QUIZ_STORAGE_KEY } from "@/lib/kwentoQuiz";

// clears every bit of saved progress — station completion, which scene
// was last open, and every quiz answer/score
export function resetAllProgress() {
  try {
    window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
    window.localStorage.removeItem(QUIZ_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
