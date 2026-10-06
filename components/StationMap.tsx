"use client";

// Zigzagging x positions (percent) for each station along the line, winding
// bottom (station 1) to top (station `total`) — matches the hand-drawn
// station-map reference from the client.
const ZIGZAG_X = [30, 68];

type StationMapProps = {
  total: number;
  current: number; // 1-based station number currently playing
  seen: number[]; // 1-based station numbers already visited
  onSelect: (station: number) => void;
  onClose: () => void;
};

export default function StationMap({
  total,
  current,
  seen,
  onSelect,
  onClose,
}: StationMapProps) {
  const points = Array.from({ length: total }, (_, i) => {
    const t = total === 1 ? 0 : i / (total - 1);
    return {
      station: i + 1,
      x: ZIGZAG_X[i % 2],
      y: 92 - t * 84, // station 1 near the bottom, station `total` near the top
    };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="stn-overlay">
      <button
        type="button"
        className="stn-back"
        onClick={onClose}
        aria-label="Isara ang mapa"
      >
        &larr;
      </button>

      <div className="stn-path">
        <svg
          className="stn-line"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polyline points={polyline} vectorEffect="non-scaling-stroke" />
        </svg>

        {points.map((p) => (
          <button
            key={p.station}
            type="button"
            className={`stn-node ${
              p.station === current ? "cur" : seen.includes(p.station) ? "seen" : ""
            }`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            onClick={() => onSelect(p.station)}
            aria-label={`Eksena ${p.station}`}
          >
            {p.station}
          </button>
        ))}
      </div>
    </div>
  );
}
