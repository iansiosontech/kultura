"use client";

import { useState } from "react";
import StationPlatformBackground from "@/components/StationPlatformBackground";
import TrainParked from "@/components/TrainParked";
import ScoreBadge from "@/components/ScoreBadge";
import { badges } from "@/lib/badges";
import { trainTierFor } from "@/lib/trainTiers";

type AtStationProps = {
  station: number;
  title: string;
  visited: { scene: number; title: string }[];
  hasProgress: boolean;
  score: number;
  completedCount: number;
  onStart: () => void;
  onRestart: () => void;
  onClose: () => void;
  onRevisit: (scene: number) => void;
};

export default function AtStation({
  station,
  title,
  visited,
  hasProgress,
  score,
  completedCount,
  onStart,
  onRestart,
  onClose,
  onRevisit,
}: AtStationProps) {
  const tier = trainTierFor(completedCount);
  const [departing, setDeparting] = useState(false);

  // plays the train's slide-out animation before actually starting the
  // scene — skipped for prefers-reduced-motion so those users aren't
  // stuck waiting on an animation that CSS disabled anyway
  const depart = (go: () => void) => {
    const skip =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) {
      go();
      return;
    }
    setDeparting(true);
    window.setTimeout(go, 600);
  };

  return (
    <div className="ats-overlay">
      <StationPlatformBackground />
      <ScoreBadge score={score} />

      <div className="ats-head">
        <button
          type="button"
          className="ats-back"
          onClick={onClose}
          aria-label="Bumalik"
        >
          &larr;
        </button>
        <span className="ats-head-title">Nasa Istasyon</span>
      </div>

      {visited.length > 0 && (
        <div className="ats-revisit" aria-label="Mga naratingang istasyon">
          {visited.map((v) => (
            <button
              key={v.scene}
              type="button"
              className="ats-revisit-btn"
              onClick={() => onRevisit(v.scene)}
              aria-label={`Balikan ang Istasyon ${v.scene}`}
            >
              {badges.find((b) => b.scene === v.scene)?.icon ?? v.scene}
            </button>
          ))}
        </div>
      )}

      <div className="trp-dock">
        <TrainParked completedCount={completedCount} departing={departing} />
      </div>
      {tier.id !== "classic" && (
        <span className="trp-tier-tag">{tier.name}</span>
      )}

      <div className="ats-platform" aria-hidden="true" />

      <div className="ats-scene">
        <div className="ats-indicator">
          <span className="ats-sign">{title}</span>
          <span className="ats-post" aria-hidden="true" />
          <span className="ats-node">{station}</span>
          <span className="ats-stand" aria-hidden="true" />
        </div>
      </div>

      <div className="ats-bottom">
        {hasProgress ? (
          <>
            <button
              type="button"
              className="ats-start"
              disabled={departing}
              onClick={() => depart(onStart)}
            >
              IPAGPATULOY &rarr;
            </button>
            <button
              type="button"
              className="ats-start ats-start--alt"
              disabled={departing}
              onClick={() => depart(onRestart)}
            >
              MULA SA SIMULA
            </button>
          </>
        ) : (
          <button
            type="button"
            className="ats-start"
            disabled={departing}
            onClick={() => depart(onStart)}
          >
            SIMULAN &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
