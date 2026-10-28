"use client";

import StationPlatformBackground from "@/components/StationPlatformBackground";
import TrainParked from "@/components/TrainParked";
import ScoreBadge from "@/components/ScoreBadge";

type AtStationProps = {
  station: number;
  title: string;
  visited: { scene: number; title: string }[];
  hasProgress: boolean;
  score: number;
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
  onStart,
  onRestart,
  onClose,
  onRevisit,
}: AtStationProps) {
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
              {v.scene}
            </button>
          ))}
        </div>
      )}

      <div className="trp-dock">
        <TrainParked />
      </div>

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
            <button type="button" className="ats-start" onClick={onStart}>
              IPAGPATULOY &rarr;
            </button>
            <button
              type="button"
              className="ats-start ats-start--alt"
              onClick={onRestart}
            >
              MULA SA SIMULA
            </button>
          </>
        ) : (
          <button type="button" className="ats-start" onClick={onStart}>
            SIMULAN &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
