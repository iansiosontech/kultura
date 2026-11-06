"use client";

import { useEffect, useState } from "react";
import TrainParked from "@/components/TrainParked";
import { trainTiers } from "@/lib/trainTiers";
import { readCompletedScenes } from "@/lib/kwentoScenes";

export default function TrainGarage() {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    setCompletedCount(readCompletedScenes().length);
  }, []);

  return (
    <div className="garage-grid">
      {trainTiers.map((tier) => {
        const unlocked = completedCount >= tier.minCompleted;
        return (
          <div key={tier.id} className="garage-card">
            <div className={`garage-train ${unlocked ? "" : "garage-train--locked"}`}>
              <TrainParked completedCount={tier.minCompleted} />
              {!unlocked && (
                <div className="garage-lock" aria-hidden="true">
                  🔒
                </div>
              )}
            </div>
            <p className="garage-name">{tier.name}</p>
            <p className="garage-req">
              {unlocked
                ? "Nakuha na"
                : tier.minCompleted === 0
                  ? "Laging bukas"
                  : `Kumpletuhin ang ${tier.minCompleted} eksena`}
            </p>
          </div>
        );
      })}
    </div>
  );
}
