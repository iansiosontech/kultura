"use client";

import { motion, AnimatePresence } from "framer-motion";
import { lines, LineId } from "@/lib/transitLines";
import { useVisited } from "./VisitedProvider";

export default function TransitDetailPanel({
  activeLineId,
  onSelectLine,
  selectedStationId,
  onSelectStation,
}: {
  activeLineId: LineId | null;
  onSelectLine: (id: LineId) => void;
  selectedStationId: string | null;
  onSelectStation: (id: string | null) => void;
}) {
  const { visited, total, isVisited, markVisited } = useVisited();
  const activeLine = lines.find((l) => l.id === activeLineId) ?? null;
  const station = activeLine?.stations.find(
    (s) => s.id === selectedStationId
  );

  // Nothing selected at all — show the 3 lines as entry points.
  if (!activeLine) {
    return (
      <aside className="h-full w-full overflow-y-auto rounded-xl border-2 border-chrome-dim bg-panel p-5 sm:w-[320px] sm:shrink-0">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-display text-sm text-cream">Mga Linya</p>
          <p className="font-mono text-[11px] text-chrome-dim">
            {visited.length}/{total}
          </p>
        </div>

        <div className="space-y-2">
          {lines.map((l) => {
            const visitedCount = l.stations.filter((s) =>
              isVisited(s.id)
            ).length;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => onSelectLine(l.id)}
                className="flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors"
                style={{
                  borderColor:
                    visitedCount > 0 ? l.color : "rgba(143,173,168,0.3)",
                  backgroundColor:
                    visitedCount > 0 ? `${l.color}1A` : "transparent",
                }}
              >
                <span
                  className="h-2.5 w-6 shrink-0 rounded-full"
                  style={{ backgroundColor: l.color }}
                />
                <span className="flex-1">
                  <span className="block font-display text-xs text-cream">
                    {l.name}
                  </span>
                  <span className="block font-mono text-[10px] text-chrome-dim">
                    {visitedCount}/{l.stations.length} natapos
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </aside>
    );
  }

  const handleMarkVisited = () => {
    if (station && !isVisited(station.id)) markVisited(station.id);
  };

  return (
    <aside className="flex h-full w-full flex-col overflow-y-auto rounded-xl border-2 border-chrome-dim bg-panel p-5 sm:w-[320px] sm:shrink-0">
      <AnimatePresence mode="wait">
        {!station ? (
          // A line is active but no station chosen yet — names-first list.
          <motion.div
            key="list"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.18 }}
          >
            <p
              className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em]"
              style={{ color: activeLine.color }}
            >
              {activeLine.name}
            </p>
            <p className="mb-4 text-xs text-chrome-dim">
              I-click ang isang estasyon para makita.
            </p>
            <div className="space-y-2">
              {activeLine.stations.map((s) => {
                const done = isVisited(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSelectStation(s.id)}
                    className="flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors"
                    style={{
                      borderColor: done
                        ? activeLine.color
                        : "rgba(143,173,168,0.3)",
                      backgroundColor: done
                        ? `${activeLine.color}1A`
                        : "transparent",
                    }}
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: done ? activeLine.color : "#17201F",
                        border: `1.5px solid ${activeLine.color}`,
                      }}
                    />
                    <span className="flex-1">
                      <span className="block font-display text-xs text-cream">
                        {s.title}
                      </span>
                      {s.subtitle && (
                        <span className="block font-mono text-[10px] text-chrome-dim">
                          {s.subtitle}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.18 }}
            className="flex h-full flex-col"
          >
            <button
              type="button"
              onClick={() => onSelectStation(null)}
              className="mb-4 self-start font-mono text-xs tracking-wide text-chrome hover:text-gold"
            >
              &larr; Bumalik sa listahan
            </button>

            <p
              className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em]"
              style={{ color: activeLine.color }}
            >
              {activeLine.name}
            </p>
            <h3 className="mb-1 font-display text-lg leading-tight text-cream">
              {station.title}
            </h3>
            {station.subtitle && (
              <p className="mb-4 font-mono text-[10px] uppercase tracking-wider text-chrome-dim">
                {station.subtitle}
              </p>
            )}

            <div className="flex-1 space-y-3">
              {station.paragraphs.map((p, i) => (
                <p key={i} className="text-sm leading-6 text-chrome">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {!isVisited(station.id) && (
                <button
                  type="button"
                  onClick={handleMarkVisited}
                  className="rounded-full border-[3px] border-charcoal px-5 py-2.5 font-display text-[13px] text-charcoal shadow-[0_4px_0_theme(colors.charcoal)]"
                  style={{ backgroundColor: activeLine.color }}
                >
                  Tapos na basahin
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}