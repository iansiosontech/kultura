"use client";

import { useQuizScore } from "@/lib/kwentoQuiz";
import ScoreBadge from "@/components/ScoreBadge";

// self-fetching wrapper for screens that don't otherwise track the score
// reactively (it only re-reads localStorage on mount)
export default function QuizScoreBadge() {
  const score = useQuizScore();
  return <ScoreBadge score={score} />;
}
