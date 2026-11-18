"use client";

import { useEffect, useState } from "react";
import {
  fetchLeaderboard,
  submitScore,
  LEADERBOARD_NAME_MAX,
  LEADERBOARD_SUBMITTED_KEY,
  type LeaderboardEntry,
} from "@/lib/leaderboard";
import { playClick } from "@/lib/sfx";
import { MAX_SCORE, type QuizAnswer } from "@/lib/kwentoQuiz";
import { FOLLOWUP_MAX_SCORE, type FollowUpAnswer } from "@/lib/followUpQuestions";
import { readStudentInfo, studentDisplayName } from "@/lib/studentInfo";

const TOTAL_MAX_SCORE = MAX_SCORE + FOLLOWUP_MAX_SCORE;

type Status = "idle" | "loading" | "ready" | "unavailable";

export default function Leaderboard({
  score,
  answers,
  followUpAnswers,
}: {
  score?: number;
  answers?: QuizAnswer[];
  followUpAnswers?: FollowUpAnswer[];
}) {
  const canSubmit = typeof score === "number";
  const [status, setStatus] = useState<Status>("idle");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);

  const load = () => {
    setStatus("loading");
    fetchLeaderboard()
      .then((data) => {
        if (data === null) {
          setStatus("unavailable");
          return;
        }
        setEntries(data);
        setStatus("ready");
      })
      .catch(() => setStatus("unavailable"));
  };

  useEffect(() => {
    load();
    try {
      setSubmitted(sessionStorage.getItem(LEADERBOARD_SUBMITTED_KEY) === "1");
    } catch {
      // ignore
    }
    // the prefill isn't limited by the input's maxLength, and the API
    // rejects longer names — trim it so a long name + section still submits
    setName(studentDisplayName(readStudentInfo()).slice(0, LEADERBOARD_NAME_MAX));
  }, []);

  if (status === "unavailable") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || submitting || !canSubmit) return;
    setSubmitting(true);
    setSubmitFailed(false);
    let ok = false;
    try {
      ok = await submitScore(trimmed, score, answers, followUpAnswers);
    } catch {
      ok = false;
    }
    setSubmitting(false);
    if (!ok) {
      setSubmitFailed(true);
      return;
    }
    setSubmitted(true);
    try {
      sessionStorage.setItem(LEADERBOARD_SUBMITTED_KEY, "1");
    } catch {
      // ignore
    }
    load();
  };

  return (
    <div className="leaderboard">
      <p className="quiz-eyebrow">PANGUNAHING MANLALAKBAY</p>
      {canSubmit && !submitted && (
        <form className="leaderboard-form" onSubmit={handleSubmit}>
          <input
            className="leaderboard-input"
            type="text"
            placeholder="Ilagay ang iyong pangalan"
            maxLength={LEADERBOARD_NAME_MAX}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="leaderboard-submit"
            disabled={!name.trim() || submitting}
            onClick={() => playClick()}
          >
            {submitting ? "..." : "IPASA"}
          </button>
        </form>
      )}
      {canSubmit && !submitted && submitFailed && (
        <p className="leaderboard-error" role="alert">
          Hindi naipasa ang iskor. Pakisubukan muli.
        </p>
      )}
      {canSubmit && submitted && (
        <p className="leaderboard-submitted">Naipasa na ang iskor mo!</p>
      )}
      <ol className="leaderboard-list">
        {status === "loading" && entries.length === 0 && (
          <li className="leaderboard-empty">Naglo-load...</li>
        )}
        {status === "ready" && entries.length === 0 && (
          <li className="leaderboard-empty">Walang tala pa.</li>
        )}
        {entries.map((entry, i) => (
          <li key={`${entry.name}-${entry.created_at}`} className="leaderboard-row">
            <span className="leaderboard-rank">{i + 1}</span>
            <span className="leaderboard-name">{entry.name}</span>
            <span className="leaderboard-score">
              {entry.score}/{TOTAL_MAX_SCORE}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
