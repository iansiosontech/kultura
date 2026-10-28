import { MAX_SCORE } from "@/lib/kwentoQuiz";

export default function ScoreBadge({ score }: { score: number }) {
  return (
    <div className="quiz-score-badge" aria-label="Iskor sa pagsusulit">
      {score} / {MAX_SCORE}
    </div>
  );
}
