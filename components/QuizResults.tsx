"use client";

import { quizItems, MAX_SCORE, type QuizAnswer } from "@/lib/kwentoQuiz";

type QuizResultsProps = {
  answers: QuizAnswer[];
  score: number;
};

export default function QuizResults({ answers, score }: QuizResultsProps) {
  return (
    <div className="quiz-results">
      <p className="quiz-eyebrow">RESULTA NG PAGSUSULIT</p>
      <p className="quiz-results-score">
        {score} / {MAX_SCORE}
      </p>
      <div className="quiz-results-list">
        {quizItems.map((item) => {
          const a = answers.find((x) => x.scene === item.scene);
          const status = !a
            ? "quiz-results-row--pending"
            : a.correct
              ? "quiz-results-row--correct"
              : "quiz-results-row--wrong";
          return (
            <div key={item.scene} className={`quiz-results-row ${status}`}>
              <span className="quiz-results-mark" aria-hidden="true">
                {!a ? "—" : a.correct ? "✓" : "✗"}
              </span>
              <span className="quiz-results-scene">Eksena {item.scene}</span>
              <span className="quiz-results-words">
                <span className="quiz-results-guess">
                  {a ? a.guess || "(walang sagot)" : "Hindi pa nasagot"}
                </span>
                <span className="quiz-results-answer">{item.answer}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
