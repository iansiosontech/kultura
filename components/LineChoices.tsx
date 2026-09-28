"use client";

import { useRouter } from "next/navigation";

const choices = [
  {
    id: "kwento",
    cls: "lc-kwento",
    tag: "LINYA 01",
    title: "Maikling Kwento",
    sub: "Basahin at pakinggan ang kwento.",
    href: "/map/kwento",
  },
];

export default function LineChoices() {
  const router = useRouter();

  return (
    <div className="lc-wrap">
      <h2 className="lc-head">Pumili ng Linya</h2>
      <div className="lc-row">
        {choices.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`lc-card ${c.cls}`}
            onClick={() => router.push(c.href)}
          >
            <div className="lc-ticket" />
            <span className="lc-tag">{c.tag}</span>
            <div className="lc-ttl">{c.title}</div>
            <div className="lc-sub">{c.sub}</div>
            <div className="lc-stripe" />
          </button>
        ))}
      </div>
    </div>
  );
}