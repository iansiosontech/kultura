"use client";

import { useRouter } from "next/navigation";

const choices = [
  {
    id: "author",
    cls: "lc-author",
    tag: "LINYA 01",
    title: "Author",
    sub: "Kilalanin ang mga may-akda ng akda.",
    href: "/map/author",
  },
  {
    id: "kwento",
    cls: "lc-kwento",
    tag: "LINYA 02",
    title: "Maikling Kwento",
    sub: "Basahin at pakinggan ang kwento.",
    href: "/map/kwento",
  },
  {
    id: "activities",
    cls: "lc-acts",
    tag: "LINYA 03",
    title: "Activities",
    sub: "Subukan ang mga gawain.",
    href: "/map/activities",
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