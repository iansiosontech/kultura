"use client";

import { useVisited } from "./VisitedProvider";

export default function LevelSidebar() {
  const { visited, total } = useVisited();
  const pct = Math.round((visited.length / total) * 100);
  const circumference = 2 * Math.PI * 34;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <aside className="flex h-full w-full flex-col gap-4 overflow-y-auto border-chrome-dim sm:w-[220px] sm:shrink-0 sm:border-r sm:pr-4">
      <div className="shrink-0 rounded-xl border-2 border-gold bg-panel px-4 py-3">
        <p className="font-display text-sm text-gold">Level 1</p>
        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-chrome">
          Tuklas Kultura
        </p>
      </div>

      <div className="shrink-0 rounded-xl border-2 border-chrome-dim bg-panel p-3">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-chrome-dim">
          Aking Progress
        </p>
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 80 80" className="h-14 w-14 shrink-0">
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="#103F3C"
              strokeWidth="8"
            />
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="#F4B400"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 40 40)"
            />
            <text
              x="40"
              y="45"
              textAnchor="middle"
              className="fill-cream font-display"
              fontSize="16"
            >
              {pct}%
            </text>
          </svg>
          <p className="text-xs leading-5 text-chrome">
            {visited.length} sa {total} estasyon natapos
          </p>
        </div>
      </div>

      <div className="shrink-0 rounded-xl border-2 border-chrome-dim bg-panel p-3">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-chrome-dim">
          Mga Antas
        </p>
        <div className="space-y-1.5">
          <div className="rounded-lg border border-gold bg-gold/10 px-3 py-1.5">
            <p className="font-display text-xs text-gold">
              Level 1: Tuklas Kultura
            </p>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-chrome-dim">
              Remembering
            </p>
          </div>
          {[
            { n: 2, name: "Diwa ng Kultura", tag: "Understanding" },
            { n: 3, name: "Ugnayan Mo", tag: "Applying" },
            { n: 4, name: "Pagninilay at Mensahe", tag: "Analyzing" },
          ].map((lvl) => (
            <div
              key={lvl.n}
              className="flex items-center justify-between rounded-lg border border-chrome-dim/40 px-3 py-1.5 opacity-50"
            >
              <div>
                <p className="font-display text-xs text-chrome">
                  Level {lvl.n}: {lvl.name}
                </p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-chrome-dim">
                  {lvl.tag}
                </p>
              </div>
              <span className="text-chrome-dim">🔒</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}