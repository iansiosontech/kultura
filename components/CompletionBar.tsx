"use client";

import { useEffect, useRef, useState } from "react";

type CompletionBarProps = { completed: number; total: number };

export default function CompletionBar({ completed, total }: CompletionBarProps) {
  const pct = total > 0 ? (completed / total) * 100 : 0;
  const prevRef = useRef(completed);
  const [popping, setPopping] = useState(false);

  useEffect(() => {
    if (completed > prevRef.current) {
      setPopping(true);
      const t = window.setTimeout(() => setPopping(false), 650);
      prevRef.current = completed;
      return () => window.clearTimeout(t);
    }
    prevRef.current = completed;
  }, [completed]);

  return (
    <div className={`completion-bar ${popping ? "completion-bar--pop" : ""}`}>
      <div className="completion-bar-track">
        <div className="completion-bar-fill" style={{ width: `${pct}%` }}>
          <div className="completion-bar-shine" />
        </div>
      </div>
      <span className="completion-bar-label">
        {completed} / {total}
      </span>
    </div>
  );
}
