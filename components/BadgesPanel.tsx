"use client";

import { useEffect, useState } from "react";
import { badges } from "@/lib/badges";
import { readCompletedScenes } from "@/lib/kwentoScenes";

export default function BadgesPanel() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCompleted(readCompletedScenes());
    setHydrated(true);
  }, []);

  // avoid a flash of "all locked" before localStorage is read
  if (!hydrated) return null;

  const allDone = completed.length === badges.length;

  return (
    <div className="badges-panel">
      {allDone && (
        <div className="completionist-banner">
          🏆 GANAP NA MANLALAKBAY
        </div>
      )}
      <div className="badges-row" aria-label="Mga natamong parangal">
        {badges.map((b) => {
          const earned = completed.includes(b.scene);
          return (
            <span
              key={b.scene}
              className={`badge-chip ${
                earned ? "badge-chip--earned" : "badge-chip--locked"
              }`}
              title={b.label}
              aria-label={
                earned ? `Nakuha: ${b.label}` : `Hindi pa nakukuha: ${b.label}`
              }
            >
              {earned ? b.icon : "🔒"}
            </span>
          );
        })}
      </div>
    </div>
  );
}
