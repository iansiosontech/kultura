"use client";

import { useEffect, useRef } from "react";

// Zigzagging x positions (percent) for each station along the line, winding
// bottom (station 1) to top (station `total`) — matches the hand-drawn
// station-map reference from the client.
const ZIGZAG_X = [30, 68];

type StationMapProps = {
  total: number;
  current: number; // 1-based station number currently playing
  seen: number[]; // 1-based station numbers already visited
  titles: string[]; // station titles, indexed by station - 1
  onSelect: (station: number) => void;
  onClose: () => void;
};

export default function StationMap({
  total,
  current,
  seen,
  titles,
  onSelect,
  onClose,
}: StationMapProps) {
  const currentRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    currentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const points = Array.from({ length: total }, (_, i) => {
    const t = total === 1 ? 0 : i / (total - 1);
    return {
      station: i + 1,
      x: ZIGZAG_X[i % 2],
      y: 92 - t * 84, // station 1 near the bottom, station `total` near the top
      side: i % 2 === 0 ? "right" : "left", // which side the title sits on
    };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="stn-overlay">
      <div className="stn-sky" />
      <div className="stn-clouds">
        <b />
        <b />
        <b />
      </div>
      <div className="stn-vig" />

      <div className="stn-head">
        <button
          type="button"
          className="stn-back"
          onClick={onClose}
          aria-label="Isara ang mapa"
        >
          &larr;
        </button>
        <span className="stn-head-title">Pumili ng Eksena</span>
      </div>

      <div className="stn-path">
        <svg
          className="stn-line"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polyline points={polyline} vectorEffect="non-scaling-stroke" />
        </svg>

        {points.map((p) => {
          const isCurrent = p.station === current;
          const isSeen = seen.includes(p.station);
          return (
            <div
              key={p.station}
              className="stn-stop"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <button
                ref={isCurrent ? currentRef : undefined}
                type="button"
                className={`stn-node ${isCurrent ? "cur" : isSeen ? "seen" : ""}`}
                onClick={() => onSelect(p.station)}
                aria-label={`Eksena ${p.station}: ${titles[p.station - 1] ?? ""}`}
              >
                {isCurrent && <span className="stn-pulse" />}
                {isSeen && !isCurrent && <span className="stn-check">&#10003;</span>}
                {p.station}
              </button>
              <span className={`stn-label stn-label--${p.side}`}>
                {titles[p.station - 1]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
