"use client";

import StationPlatformBackground from "@/components/StationPlatformBackground";
import TrainParked from "@/components/TrainParked";

type AtStationProps = {
  station: number;
  title: string;
  onStart: () => void;
  onClose: () => void;
};

export default function AtStation({
  station,
  title,
  onStart,
  onClose,
}: AtStationProps) {
  return (
    <div className="ats-overlay">
      <StationPlatformBackground />

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
        <button type="button" className="ats-start" onClick={onStart}>
          SIMULAN &rarr;
        </button>
      </div>
    </div>
  );
}
