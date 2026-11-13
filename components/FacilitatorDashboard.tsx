"use client";

import { useEffect, useState } from "react";
import {
  fetchFacilitatorData,
  facilitatorLogin,
  facilitatorLogout,
  type FacilitatorEntry,
} from "@/lib/facilitator";
import { quizItems, MAX_SCORE } from "@/lib/kwentoQuiz";
import { followUpQuestions, FOLLOWUP_MAX_SCORE } from "@/lib/followUpQuestions";

const TOTAL_MAX_SCORE = MAX_SCORE + FOLLOWUP_MAX_SCORE;

type Status = "checking" | "locked" | "unlocked" | "unavailable";

export default function FacilitatorDashboard() {
  const [status, setStatus] = useState<Status>("checking");
  const [entries, setEntries] = useState<FacilitatorEntry[]>([]);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = async () => {
    const result = await fetchFacilitatorData();
    if (!result.ok) {
      setStatus(result.status === 401 ? "locked" : "unavailable");
      return;
    }
    setEntries(result.entries);
    setStatus("unlocked");
  };

  useEffect(() => {
    load();
  }, []);

  if (status === "checking") {
    return <p className="facilitator-msg">Naglo-load...</p>;
  }

  if (status === "unavailable") {
    return (
      <p className="facilitator-msg">
        Hindi available ang dashboard na ito ngayon.
      </p>
    );
  }

  if (status === "locked") {
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!password || submitting) return;
      setSubmitting(true);
      setLoginError("");
      const ok = await facilitatorLogin(password);
      setSubmitting(false);
      if (ok) {
        setPassword("");
        load();
      } else {
        setLoginError("Maling password.");
      }
    };

    return (
      <form className="facilitator-login" onSubmit={handleLogin}>
        <p className="quiz-eyebrow">FACILITATOR LOGIN</p>
        <input
          className="leaderboard-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="leaderboard-submit" disabled={submitting}>
          PUMASOK
        </button>
        {loginError && <p className="facilitator-error">{loginError}</p>}
      </form>
    );
  }

  const total = entries.length;
  const avg = total > 0 ? entries.reduce((sum, e) => sum + e.score, 0) / total : 0;
  const highest = total > 0 ? Math.max(...entries.map((e) => e.score)) : 0;
  const lowest = total > 0 ? Math.min(...entries.map((e) => e.score)) : 0;

  return (
    <div className="facilitator-dash">
      <div className="facilitator-stats">
        <div className="facilitator-stat">
          <span className="facilitator-stat-value">{total}</span>
          <span className="facilitator-stat-label">Submissions</span>
        </div>
        <div className="facilitator-stat">
          <span className="facilitator-stat-value">{avg.toFixed(1)}</span>
          <span className="facilitator-stat-label">Average</span>
        </div>
        <div className="facilitator-stat">
          <span className="facilitator-stat-value">{highest}</span>
          <span className="facilitator-stat-label">Highest</span>
        </div>
        <div className="facilitator-stat">
          <span className="facilitator-stat-value">{lowest}</span>
          <span className="facilitator-stat-label">Lowest</span>
        </div>
      </div>

      <div className="facilitator-table">
        {entries.length === 0 && (
          <p className="facilitator-msg">Wala pang mga sagot.</p>
        )}
        {entries.map((entry) => {
          const key = `${entry.name}-${entry.created_at}`;
          const isOpen = expanded === key;
          return (
            <div key={key} className="facilitator-row-wrap">
              <button
                type="button"
                className="facilitator-row"
                onClick={() => setExpanded(isOpen ? null : key)}
              >
                <span className="facilitator-row-name">{entry.name}</span>
                <span className="facilitator-row-score">
                  {entry.score}/{TOTAL_MAX_SCORE}
                </span>
                <span className="facilitator-row-time">
                  {new Date(entry.created_at).toLocaleString()}
                </span>
                <span className="facilitator-row-caret">{isOpen ? "▲" : "▼"}</span>
              </button>
              {isOpen && (
                <div className="facilitator-detail">
                  {!entry.answers || entry.answers.length === 0 ? (
                    <p className="facilitator-msg">
                      Walang naitalang detalye ng sagot.
                    </p>
                  ) : (
                    quizItems.map((item) => {
                      const a = entry.answers?.find((x) => x.scene === item.scene);
                      return (
                        <div
                          key={item.scene}
                          className={`facilitator-answer ${
                            a?.correct
                              ? "facilitator-answer--correct"
                              : "facilitator-answer--wrong"
                          }`}
                        >
                          <span>Eksena {item.scene}</span>
                          <span>{a ? a.guess || "(walang sagot)" : "—"}</span>
                          <span>{item.answer}</span>
                        </div>
                      );
                    })
                  )}

                  {entry.followup_answers && entry.followup_answers.length > 0 && (
                    <>
                      <p className="facilitator-detail-label">Mga Tanong</p>
                      {followUpQuestions.map((q, idx) => {
                        const questionNumber = followUpQuestions
                          .slice(0, idx + 1)
                          .filter((x) => x.scene === q.scene).length;
                        const a = entry.followup_answers?.find(
                          (x) =>
                            x.scene === q.scene &&
                            x.questionIndex === questionNumber - 1
                        );
                        return (
                          <div
                            key={`${q.scene}-${questionNumber}`}
                            className={`facilitator-answer ${
                              a?.correct
                                ? "facilitator-answer--correct"
                                : "facilitator-answer--wrong"
                            }`}
                          >
                            <span>
                              Eksena {q.scene}.{questionNumber}
                            </span>
                            <span>
                              {a ? q.choices[a.choiceIndex] : "—"}
                            </span>
                            <span>{q.choices[q.correctIndex]}</span>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="facilitator-logout"
        onClick={async () => {
          await facilitatorLogout();
          setStatus("locked");
        }}
      >
        LUMABAS
      </button>
    </div>
  );
}
