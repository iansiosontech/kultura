import { MAX_SCORE } from "@/lib/kwentoQuiz";

type ScoreBadgeProps = {
  score: number;
  // false renders it as a normal inline pill instead of floating in the
  // top-right corner — used where a header already has something there
  // (e.g. the player's own "SCENE 01/10" counter) to avoid overlapping it
  floating?: boolean;
};

export default function ScoreBadge({ score, floating = true }: ScoreBadgeProps) {
  return (
    <div
      className={`quiz-score-badge${floating ? "" : " quiz-score-badge--inline"}`}
      aria-label="Iskor sa pagsusulit"
    >
      {score} / {MAX_SCORE}
    </div>
  );
}
