import Link from "next/link";
import type { LineId } from "@/lib/transitLines";
import { lines } from "@/lib/transitLines";

export default function StationList({ lineId }: { lineId: LineId }) {
  const line = lines.find((l) => l.id === lineId)!;

  return (
    <div className="sl">
      <div className="sl-top">
        <Link href="/map" className="mk-back">
          &larr; Bumalik
        </Link>
        <span className="sl-title">{line.name}</span>
      </div>

      <div className="sl-list">
        {line.stations.map((station, i) => (
          <article
            key={station.id}
            className="sl-card"
            style={{ borderLeftColor: line.color }}
          >
            <div className="sl-num">
              {String(i + 1).padStart(2, "0")} / {line.stations.length}
            </div>
            <h3 className="sl-name">{station.title}</h3>
            {station.subtitle && <p className="sl-sub">{station.subtitle}</p>}
            <div className="sl-body">
              {station.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
