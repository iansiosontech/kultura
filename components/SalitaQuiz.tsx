"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { QuizItem, QuizAnswer } from "@/lib/kwentoQuiz";

type SalitaQuizProps = {
  item: QuizItem;
  answer?: QuizAnswer;
  onSubmit: (guess: string, correct: boolean) => void;
};

// One submission per scene — right/wrong is revealed immediately on
// submit (the final score summary still only shows at the end).
export default function SalitaQuiz({
  item,
  answer,
  onSubmit,
}: SalitaQuizProps) {
  // indices into pattern/answer that are blanks — pattern and answer are
  // the same length and character-aligned, so these indices work for both
  const blankIdxs = [...item.pattern].reduce<number[]>((acc, ch, i) => {
    if (ch === "_") acc.push(i);
    return acc;
  }, []);

  const [letters, setLetters] = useState<string[]>(() =>
    blankIdxs.map(() => "")
  );
  const [incomplete, setIncomplete] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (answer) {
    return (
      <div
        className={`quiz-reveal ${
          answer.correct ? "quiz-reveal--correct" : "quiz-reveal--wrong"
        }`}
      >
        <span className="quiz-reveal-icon" aria-hidden="true">
          {answer.correct ? "✓" : "✗"}
        </span>
        <p className="quiz-reveal-text">
          {answer.correct ? "Tama!" : `Mali. Ang sagot: ${item.answer}`}
        </p>
      </div>
    );
  }

  const setLetterAt = (blankPos: number, raw: string) => {
    const v = raw.slice(-1).toUpperCase().replace(/[^A-ZÑ]/, "");
    setLetters((prev) => {
      const next = [...prev];
      next[blankPos] = v;
      return next;
    });
    setIncomplete(false);
    if (v && blankPos < blankIdxs.length - 1) {
      inputRefs.current[blankPos + 1]?.focus();
    }
  };

  const handleKeyDown =
    (blankPos: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !letters[blankPos] && blankPos > 0) {
        inputRefs.current[blankPos - 1]?.focus();
      }
    };

  const handleSubmit = () => {
    if (letters.some((l) => !l)) {
      setIncomplete(true);
      return;
    }
    const guess = [...item.pattern]
      .map((ch, i) => {
        if (ch === "_") return letters[blankIdxs.indexOf(i)];
        return ch;
      })
      .join("");
    const correct = blankIdxs.every(
      (charIdx, i) => letters[i] === item.answer[charIdx].toUpperCase()
    );
    onSubmit(guess, correct);
  };

  return (
    <div className="salita-quiz">
      <p className="quiz-eyebrow">SALITA</p>
      <div className="salita-boxes">
        {[...item.pattern].map((ch, i) => {
          if (ch === "_") {
            const blankPos = blankIdxs.indexOf(i);
            return (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[blankPos] = el;
                }}
                type="text"
                inputMode="text"
                maxLength={1}
                className="salita-box"
                value={letters[blankPos]}
                onChange={(e) => setLetterAt(blankPos, e.target.value)}
                onKeyDown={handleKeyDown(blankPos)}
                aria-label={`Letrang ${blankPos + 1}`}
              />
            );
          }
          if (ch === " ") {
            return <span key={i} className="salita-space" aria-hidden="true" />;
          }
          return (
            <span key={i} className="salita-fixed" aria-hidden="true">
              {ch}
            </span>
          );
        })}
      </div>
      <button type="button" className="quiz-btn" onClick={handleSubmit}>
        SUBUKAN
      </button>
      {incomplete && (
        <p className="quiz-feedback quiz-feedback--wrong">
          Punan muna ang lahat ng kahon.
        </p>
      )}
    </div>
  );
}
