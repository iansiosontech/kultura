"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import StationPlatformBackground from "@/components/StationPlatformBackground";

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
  const rowRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeX, setActiveX] = useState<number | null>(null);

  const stations = Array.from({ length: total }, (_, i) => i + 1);
  const stillBoarding = !completed.includes(active);

  const measure = () => {
    const btn = nodeRefs.current[active - 1];
    if (!btn) return;
    setActiveX(btn.offsetLeft + btn.offsetWidth / 2);
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, total]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    nodeRefs.current[active - 1]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  return (
    <div className="stn-overlay">
      <StationPlatformBackground />

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

      <div className="stn-strip-wrap">
        <div className="stn-row" ref={rowRef}>
          <div className="stn-rail-bed" aria-hidden="true" />
          <div className="stn-rail-mid" aria-hidden="true" />
          <div className="stn-rail-tie" aria-hidden="true" />

          {stations.map((station) => {
            const isDone = completed.includes(station);
            const isActive = station === active;
            const isLocked = station > active;
            return (
              <div key={station} className="stn-col">
                <span
                  className={`stn-sign ${isLocked ? "stn-sign--locked" : ""}`}
                >
                  {isLocked ? "???" : titles[station - 1]}
                </span>
                <span className="stn-post" aria-hidden="true" />
                <button
                  ref={(el) => {
                    nodeRefs.current[station - 1] = el;
                  }}
                  type="button"
                  className={`stn-node ${isActive ? "cur" : isDone ? "seen" : ""} ${
                    isLocked ? "locked" : ""
                  }`}
                  disabled={isLocked}
                  onClick={() => !isLocked && onSelect(station)}
                  aria-label={
                    isLocked
                      ? `Eksena ${station}: naka-lock pa`
                      : `Eksena ${station}: ${titles[station - 1] ?? ""}`
                  }
                >
                  {isActive && <span className="stn-pulse" />}
                  {isDone && !isActive && (
                    <span className="stn-check">&#10003;</span>
                  )}
                  {isLocked ? (
                    <span className="stn-lock" aria-hidden="true">
                      &#128274;
                    </span>
                  ) : (
                    <>
                      <span className="stn-node-num">{station}</span>
                      <span className="stn-node-bar" />
                    </>
                  )}
                </button>
              </div>
            );
          })}

          {activeX !== null && stillBoarding && (
            <div
              className="stn-board"
              style={{ left: activeX }}
              aria-hidden="true"
            >
              <span className="stn-pax stn-pax--1">&#128694;</span>
              <span className="stn-pax stn-pax--2">&#128694;</span>
            </div>
          )}

          {activeX !== null && (
            <motion.div
              className="stn-train-pos"
              animate={{ left: activeX }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <span className="stn-train">&#128642;</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
