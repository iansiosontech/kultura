"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AmbientSky from "@/components/AmbientSky";

// Zigzagging x positions (percent) for each station along the line, winding
// bottom (station 1) to top (station `total`) — matches the hand-drawn
// station-map reference from the client.
const ZIGZAG_X = [30, 68];

type StationMapProps = {
  total: number;
  active: number; // 1-based: the next not-yet-finished station — the train sits here
  completed: number[]; // 1-based station numbers whose audio has fully played
  titles: string[]; // station titles, indexed by station - 1
  onSelect: (station: number) => void;
  onClose: () => void;
};

export default function StationMap({
  total,
  active,
  completed,
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

  const trainFrom = points[Math.max(0, active - 2)];
  const trainTo = points[Math.min(total, active) - 1];
  const stillBoarding = !completed.includes(active);

  return (
    <div className="stn-overlay">
      <AmbientSky variant="map" />

      <div className="stn-head">
        <button
          type="button"
          className="stn-back"
          onClick={onClose}
          aria-label="Isara ang mapa"
        >
          &larr;
        </button>
        <span className="stn-head-title">
          <span className="stn-head-icon" aria-hidden="true">
            &#128646;
          </span>
          Pumili ng Eksena
          <em className="stn-cursor">_</em>
        </span>
      </div>

      <div className="stn-path">
        <svg
          className="stn-line"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polyline className="stn-rail-bed" points={polyline} vectorEffect="non-scaling-stroke" />
          <polyline className="stn-rail-mid" points={polyline} vectorEffect="non-scaling-stroke" />
          <polyline className="stn-rail-tie" points={polyline} vectorEffect="non-scaling-stroke" />
        </svg>

        {points.map((p) => {
          const isDone = completed.includes(p.station);
          const isActive = p.station === active;
          const isLocked = p.station > active;
          return (
            <div
              key={p.station}
              className="stn-stop"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <button
                ref={isActive ? currentRef : undefined}
                type="button"
                className={`stn-node ${isActive ? "cur" : isDone ? "seen" : ""} ${
                  isLocked ? "locked" : ""
                }`}
                disabled={isLocked}
                onClick={() => !isLocked && onSelect(p.station)}
                aria-label={
                  isLocked
                    ? `Eksena ${p.station}: naka-lock pa`
                    : `Eksena ${p.station}: ${titles[p.station - 1] ?? ""}`
                }
              >
                {isActive && <span className="stn-pulse" />}
                {isDone && !isActive && <span className="stn-check">&#10003;</span>}
                {isLocked ? (
                  <span className="stn-lock" aria-hidden="true">
                    &#128274;
                  </span>
                ) : (
                  <>
                    <span className="stn-node-num">{p.station}</span>
                    <span className="stn-node-bar" />
                  </>
                )}
              </button>
              <span
                className={`stn-label stn-label--${p.side} ${
                  isLocked ? "stn-label--locked" : ""
                }`}
              >
                {isLocked ? "???" : titles[p.station - 1]}
              </span>

              {isActive && stillBoarding && (
                <div className="stn-board" aria-hidden="true">
                  <span className="stn-pax stn-pax--1">&#128694;</span>
                  <span className="stn-pax stn-pax--2">&#128694;</span>
                </div>
              )}
            </div>
          );
        })}

        <motion.div
          className="stn-train-pos"
          initial={{ left: `${trainFrom.x}%`, top: `${trainFrom.y}%` }}
          animate={{ left: `${trainTo.x}%`, top: `${trainTo.y}%` }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <span className="stn-train">&#128642;</span>
        </motion.div>
      </div>
    </div>
  );
}
