"use client";

import { useQuizScore, MAX_SCORE } from "@/lib/kwentoQuiz";

export default function QuizScoreBadge() {
  const score = useQuizScore();
  return (
    <div className="quiz-score-badge" aria-label="Iskor sa pagsusulit">
      {score} / {MAX_SCORE}
    </div>
  );
}
