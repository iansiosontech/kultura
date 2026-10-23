"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import TrainWindowBackground from "@/components/TrainWindowBackground";
import { scenes } from "@/lib/kwentoScenes";
import {
  quizItems,
  normalizeAnswer,
  readQuizProgress,
  markQuizCorrect,
  POINTS_PER_CORRECT,
  MAX_SCORE,
} from "@/lib/kwentoQuiz";

export default function QuizContent() {
  const router = useRouter();
  const params = useSearchParams();
  const sceneNumber = Number(params.get("scene"));
  const item = quizItems.find((q) => q.scene === sceneNumber);
  const sceneTitle = scenes.find((s) => s.scene === sceneNumber)?.title;

  const [solved, setSolved] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [guess, setGuess] = useState("");
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    setSolved(readQuizProgress());
    setHydrated(true);
  }, []);

  const score = solved.length * POINTS_PER_CORRECT;
  const alreadySolved = item ? solved.includes(item.scene) : false;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!item) return;
    if (normalizeAnswer(guess) === normalizeAnswer(item.answer)) {
      setWrong(false);
      setSolved(markQuizCorrect(item.scene));
    } else {
      setWrong(true);
    }
  };

  return (
    <main className="relative h-full overflow-hidden">
      <TrainWindowBackground />

      <div className="quiz-score-badge" aria-label="Iskor sa pagsusulit">
        {score} / {MAX_SCORE}
      </div>

      <div className="absolute left-5 top-5 z-30">
        <Link
          href="/map"
          className="rounded-full border-2 border-[#3D3222] bg-[#FFFBF0] px-4 py-2 font-mono text-[11px] tracking-wider text-[#3D3222] shadow-[0_3px_0_#3D3222]"
        >
          &larr; Bumalik
        </Link>
      </div>

      <div className="relative z-20 flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
        {!hydrated ? null : !item ? (
          <div className="quiz-card">
            <h1 className="quiz-title">Walang pagsusulit dito</h1>
            <p className="quiz-sub">
              Tapusin muna ang isang eksena para makakuha ng pagsusulit.
            </p>
          </div>
        ) : (
          <div className="quiz-card">
            <p className="quiz-eyebrow">
              Eksena {item.scene}
              {sceneTitle ? ` — ${sceneTitle}` : ""}
            </p>
            <h1 className="quiz-title">SALITA</h1>
            <p className="quiz-pattern">{item.pattern}</p>

            {alreadySolved ? (
              <>
                <p className="quiz-feedback quiz-feedback--correct">
                  Tama! +{POINTS_PER_CORRECT} puntos — {item.answer}
                </p>
                <button
                  type="button"
                  className="quiz-btn"
                  onClick={() => router.push("/map")}
                >
                  BUMALIK SA KIOSK
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="quiz-form">
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => {
                    setGuess(e.target.value);
                    setWrong(false);
                  }}
                  placeholder="Isulat ang salita..."
                  className="quiz-input"
                  autoFocus
                  aria-label="Sagot"
                />
                <button type="submit" className="quiz-btn">
                  SUBUKAN
                </button>
                {wrong && (
                  <p className="quiz-feedback quiz-feedback--wrong">
                    Mali, subukan ulit!
                  </p>
                )}
              </form>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
