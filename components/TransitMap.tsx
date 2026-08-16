"use client";

import { motion, AnimatePresence } from "framer-motion";
import { lines, LineId } from "@/lib/transitLines";
import { useVisited } from "./VisitedProvider";

const BAR_X_START = 14;
const BAR_X_END = 72;
const CONNECTOR_X = 72;
const BAR_YS = [30, 50, 70]; // top, middle, bottom — overview mode

const ZOOM_X_START = 14;
const ZOOM_X_END = 86;
const ZOOM_Y = 50;

function stationX(index: number, count: number) {
  if (count === 1) return (ZOOM_X_START + ZOOM_X_END) / 2;
  return ZOOM_X_START + ((ZOOM_X_END - ZOOM_X_START) / (count - 1)) * index;
}

export default function TransitMap({
  activeLineId,
  onSelectLine,
  onBackToOverview,
  selectedStationId,
  onSelectStation,
}: {
  activeLineId: LineId | null;
  onSelectLine: (id: LineId) => void;
  onBackToOverview: () => void;
  selectedStationId: string | null;
  onSelectStation: (id: string) => void;
}) {
  const { isVisited } = useVisited();
  const activeLine = lines.find((l) => l.id === activeLineId) ?? null;

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="mb-2 flex shrink-0 items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            {activeLine ? activeLine.name : "Linya ng Kultura"}
          </p>
          <h2 className="mt-1 font-display text-2xl text-cream sm:text-3xl">
            {activeLine ? "Piliin ang Estasyon" : "Sumakay sa Bawat Linya"}
          </h2>
        </div>
        {activeLine && (
          <button
            type="button"
            onClick={onBackToOverview}
            className="rounded-full border border-chrome-dim px-3 py-1.5 font-mono text-[11px] tracking-wide text-chrome hover:border-gold hover:text-gold"
          >
            &larr; Buong Mapa
          </button>
        )}
      </div>

      {/* Line switcher tabs, only shown while zoomed */}
      <AnimatePresence>
        {activeLine && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mb-2 flex shrink-0 gap-2"
          >
            {lines.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => onSelectLine(l.id)}
                className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-wide transition-colors"
                style={{
                  borderColor: l.color,
                  color: l.id === activeLineId ? "#17201F" : l.color,
                  backgroundColor:
                    l.id === activeLineId ? l.color : "transparent",
                }}
              >
                {l.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mx-auto aspect-square h-full max-h-full w-auto max-w-full overflow-hidden rounded-[18px] border-2 border-chrome-dim bg-panel">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          <AnimatePresence mode="wait">
            {!activeLine ? (
              <motion.g
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <line
                  x1={CONNECTOR_X}
                  y1={BAR_YS[0]}
                  x2={CONNECTOR_X}
                  y2={BAR_YS[2]}
                  stroke="#8FADA8"
                  strokeWidth={1.2}
                />
                <circle
                  cx={CONNECTOR_X}
                  cy={BAR_YS[1]}
                  r={2.6}
                  fill="#17201F"
                  stroke="#FDF6E8"
                  strokeWidth={1}
                />

                {lines.map((line, i) => {
                  const y = BAR_YS[i];
                  const visitedCount = line.stations.filter((s) =>
                    isVisited(s.id)
                  ).length;
                  const anyVisited = visitedCount > 0;

                  return (
                    <motion.g
                      key={line.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.3 }}
                    >
                      <line
                        x1={BAR_X_START}
                        y1={y}
                        x2={BAR_X_END}
                        y2={y}
                        stroke="transparent"
                        strokeWidth={8}
                        className="cursor-pointer"
                        onClick={() => onSelectLine(line.id)}
                      />
                      <motion.line
                        x1={BAR_X_START}
                        y1={y}
                        x2={BAR_X_END}
                        y2={y}
                        stroke={line.color}
                        strokeLinecap="round"
                        opacity={anyVisited ? 1 : 0.65}
                        className="pointer-events-none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        strokeWidth={anyVisited ? 2.6 : 2}
                        whileHover={{ strokeWidth: 3.2 }}
                      />
                      <circle
                        cx={BAR_X_START}
                        cy={y}
                        r={1.4}
                        fill={line.color}
                        className="pointer-events-none"
                      />
                      <text
                        x={BAR_X_START}
                        y={y - 4}
                        textAnchor="start"
                        fontSize={3.4}
                        fontWeight={700}
                        fill={line.color}
                        className="pointer-events-none select-none"
                      >
                        {line.name}
                      </text>
                      <text
                        x={BAR_X_END}
                        y={y - 4}
                        textAnchor="end"
                        fontSize={2.4}
                        fill="#CFE0DD"
                        className="pointer-events-none select-none"
                      >
                        {visitedCount}/{line.stations.length}
                      </text>
                    </motion.g>
                  );
                })}
              </motion.g>
            ) : (
              <motion.g
                key={activeLine.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.28 }}
              >
                <motion.line
                  x1={ZOOM_X_START}
                  y1={ZOOM_Y}
                  x2={ZOOM_X_END}
                  y2={ZOOM_Y}
                  stroke={activeLine.color}
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {activeLine.stations.map((station, i) => {
                  const x = stationX(i, activeLine.stations.length);
                  const visited = isVisited(station.id);
                  const active = selectedStationId === station.id;
                  const labelAbove = i % 2 === 0;

                  return (
                    <motion.g
                      key={station.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.35 + i * 0.07,
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      }}
                    >
                      <motion.circle
                        cx={x}
                        cy={ZOOM_Y}
                        r={active ? 3.4 : visited ? 2.8 : 2.3}
                        fill={visited ? activeLine.color : "#17201F"}
                        stroke={activeLine.color}
                        strokeWidth={active ? 1.4 : 1}
                        className="cursor-pointer"
                        whileHover={{ scale: 1.25 }}
                        onClick={() => onSelectStation(station.id)}
                      />
                      {active && (
                        <circle
                          cx={x}
                          cy={ZOOM_Y}
                          r={5.2}
                          fill="none"
                          stroke="#FDF6E8"
                          strokeWidth={0.6}
                          className="pointer-events-none"
                        />
                      )}
                      <text
                        x={x}
                        y={labelAbove ? ZOOM_Y - 6 : ZOOM_Y + 9}
                        textAnchor="middle"
                        fontSize={2.6}
                        fontWeight={600}
                        fill="#CFE0DD"
                        className="pointer-events-none select-none"
                      >
                        {station.title}
                      </text>
                    </motion.g>
                  );
                })}
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>

      <p className="mt-2 shrink-0 text-center text-xs text-chrome-dim">
        {activeLine
          ? "💡 I-click ang isang estasyon para tuklasin ito."
          : "💡 I-click ang isang linya para makita ang mga estasyon nito."}
      </p>
    </div>
  );
}