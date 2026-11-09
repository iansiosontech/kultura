"use client";

import { useState } from "react";
import type { FollowUpQuestion } from "@/lib/followUpQuestions";

type FollowUpQuizProps = {
  item: FollowUpQuestion;
  onSubmit: (choiceIndex: number, correct: boolean) => void;
};

export default function FollowUpQuiz({ item, onSubmit }: FollowUpQuizProps) {
  const [picked, setPicked] = useState<number | null>(null);

  const handlePick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    onSubmit(i, i === item.correctIndex);
  };

  return (
    <div className="followup-quiz">
      <p className="quiz-eyebrow">TANONG</p>
      <p className="followup-question">{item.question}</p>
      <div className="followup-choices">
        {item.choices.map((choice, i) => {
          const isPicked = picked === i;
          const revealed = picked !== null;
          const isCorrect = i === item.correctIndex;
          const cls = !revealed
            ? ""
            : isCorrect
              ? "followup-choice--correct"
              : isPicked
                ? "followup-choice--wrong"
                : "";
          return (
            <button
              key={i}
              type="button"
              className={`followup-choice ${cls}`}
              disabled={revealed}
              onClick={() => handlePick(i)}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}
