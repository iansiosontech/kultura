"use client";

import { useState } from "react";
import { quizItems, MAX_SCORE, type QuizAnswer } from "@/lib/kwentoQuiz";
import {
  followUpQuestions,
  FOLLOWUP_MAX_SCORE,
  type FollowUpAnswer,
} from "@/lib/followUpQuestions";
import Leaderboard from "@/components/Leaderboard";
import ResultCard from "@/components/ResultCard";
import { playClick } from "@/lib/sfx";

type QuizResultsProps = {
  answers: QuizAnswer[];
  followUpAnswers: FollowUpAnswer[];
  score: number;
};

const TOTAL_MAX_SCORE = MAX_SCORE + FOLLOWUP_MAX_SCORE;

export default function QuizResults({
  answers,
  followUpAnswers,
  score,
}: QuizResultsProps) {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="quiz-results">
      <p className="quiz-eyebrow">RESULTA NG PAGSUSULIT</p>
      <p className="quiz-results-score">
        {score} / {TOTAL_MAX_SCORE}
      </p>

      <ResultCard score={score} maxScore={TOTAL_MAX_SCORE} />

      <button
        type="button"
        className="quiz-results-toggle"
        aria-expanded={showAnswers}
        aria-controls="quiz-results-answers"
        onClick={() => {
          playClick();
          setShowAnswers((v) => !v);
        }}
      >
        {showAnswers ? "ITAGO ANG MGA SAGOT ▲" : "TINGNAN ANG MGA SAGOT ▼"}
      </button>

      {showAnswers && (
        <div id="quiz-results-answers" className="quiz-results-answers">
          <p className="quiz-eyebrow">SALITA</p>
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

          <p className="quiz-eyebrow">MGA TANONG</p>
          <div className="quiz-results-list">
            {followUpQuestions.map((q, idx) => {
              const questionNumber =
                followUpQuestions.slice(0, idx + 1).filter((x) => x.scene === q.scene)
                  .length;
              const a = followUpAnswers.find(
                (x) => x.scene === q.scene && x.questionIndex === questionNumber - 1
              );
              const status = !a
                ? "quiz-results-row--pending"
                : a.correct
                  ? "quiz-results-row--correct"
                  : "quiz-results-row--wrong";
              return (
                <div
                  key={`${q.scene}-${questionNumber}`}
                  className={`quiz-results-row ${status}`}
                >
                  <span className="quiz-results-mark" aria-hidden="true">
                    {!a ? "—" : a.correct ? "✓" : "✗"}
                  </span>
                  <span className="quiz-results-scene">
                    Eksena {q.scene}.{questionNumber}
                  </span>
                  <span className="quiz-results-words">
                    <span className="quiz-results-guess">
                      {a ? q.choices[a.choiceIndex] : "Hindi pa nasagot"}
                    </span>
                    <span className="quiz-results-answer">
                      {q.choices[q.correctIndex]}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Leaderboard score={score} answers={answers} followUpAnswers={followUpAnswers} />
    </div>
  );
}
