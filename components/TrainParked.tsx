// A hand-drawn vector locomotive — straight side profile, facing right.
// No external art dependency: fully vector, so it's crisp at any size and
// costs nothing to keep tweaking.

function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g className="trp-wheel" style={{ transformOrigin: `${cx}px ${cy}px` }}>
      <circle cx={cx} cy={cy} r={r} className="trp-wheel-tire" />
      <circle cx={cx} cy={cy} r={r * 0.32} className="trp-wheel-hub" />
      {[0, 60, 120].map((deg) => (
        <rect
          key={deg}
          x={cx - r * 0.9}
          y={cy - 2.5}
          width={r * 1.8}
          height={5}
          className="trp-wheel-spoke"
          transform={`rotate(${deg} ${cx} ${cy})`}
        />
      ))}
    </g>
  );
}

export default function TrainParked({ moving = false }: { moving?: boolean }) {
  return (
    <div className={`trp ${moving ? "trp--moving" : ""}`} aria-hidden="true">
      <svg
        className="trp-img"
        viewBox="0 0 640 260"
        preserveAspectRatio="xMinYMax meet"
      >
        <defs>
          <radialGradient id="trp-puff-grad">
            <stop offset="0%" stopColor="#FFFCF4" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#FFFCF4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFCF4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* connecting rod linking the drivers */}
        <rect x="248" y="200" width="164" height="10" rx="5" className="trp-trim" />

        {/* cab */}
        <path
          d="M20 170 V86 Q20 70 38 70 H140 V170 Z"
          className="trp-body"
        />
        <rect x="52" y="92" width="58" height="48" rx="5" className="trp-window" />
        <rect x="20" y="170" width="120" height="10" className="trp-trim" />

        {/* bell */}
        <ellipse cx="160" cy="66" rx="10" ry="8" className="trp-trim" />
        <rect x="157" y="72" width="6" height="14" className="trp-trim" />

        {/* boiler */}
        <rect x="140" y="95" width="330" height="72" rx="34" className="trp-body" />
        <rect x="222" y="95" width="8" height="72" className="trp-trim" />
        <rect x="322" y="95" width="8" height="72" className="trp-trim" />
        <rect x="412" y="95" width="8" height="72" className="trp-trim" />

        {/* sand + steam domes */}
        <ellipse cx="300" cy="86" rx="15" ry="13" className="trp-body" />
        <rect x="292" y="94" width="16" height="6" className="trp-trim" />
        <ellipse cx="250" cy="78" rx="23" ry="19" className="trp-body" />
        <rect x="236" y="92" width="28" height="7" className="trp-trim" />

        {/* smokestack */}
        <path
          d="M368 95 L378 42 Q383 34 393 34 Q403 34 408 42 L418 95 Z"
          className="trp-body"
        />
        <rect x="374" y="40" width="40" height="8" rx="3" className="trp-trim" />

        {/* smokebox front / nose */}
        <circle cx="470" cy="131" r="46" className="trp-body" />
        <circle cx="470" cy="131" r="46" className="trp-nose-rim" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={470 + Math.cos(a) * 38}
              cy={131 + Math.sin(a) * 38}
              r="2.6"
              className="trp-rivet"
            />
          );
        })}

        {/* headlamp */}
        <rect x="475" y="78" width="6" height="18" className="trp-trim" />
        <circle cx="478" cy="72" r="15" className="trp-lamp" />
        <circle cx="478" cy="72" r="15" className="trp-lamp-rim" />

        {/* buffer beam + cowcatcher */}
        <rect x="503" y="168" width="58" height="16" rx="4" className="trp-beam" />
        <path
          d="M503 184 L561 184 L598 218 L503 218 Z"
          className="trp-pilot"
        />
        {[520, 540, 560].map((x) => (
          <line
            key={x}
            x1={x}
            y1="188"
            x2={x - 20}
            y2="216"
            className="trp-pilot-slat"
          />
        ))}

        {/* wheels */}
        <Wheel cx={250} cy={215} r={34} />
        <Wheel cx={330} cy={215} r={34} />
        <Wheel cx={410} cy={215} r={34} />
        <Wheel cx={520} cy={218} r={19} />

        {moving && (
          <g className="trp-smoke">
            <circle cx="393" cy="30" r="14" style={{ animationDelay: "-.35s" }} />
            <circle cx="393" cy="30" r="18" style={{ animationDelay: "-.7s" }} />
            <circle cx="393" cy="30" r="11" />
          </g>
        )}
      </svg>
    </div>
  );
}
