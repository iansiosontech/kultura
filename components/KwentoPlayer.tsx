"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { scenes, imageSrc, audioSrc, pad } from "@/lib/kwentoScenes";

const STORAGE_KEY = "kultura-kwento-progress-v1";

export default function KwentoPlayer() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [auto, setAuto] = useState(true);
  const [muted, setMuted] = useState(false);
  const [jumpOpen, setJumpOpen] = useState(false);
  const [seen, setSeen] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scene = scenes[idx];

  // restore last position
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw) as { idx: number; seen: number[] };
        if (typeof p.idx === "number" && p.idx >= 0 && p.idx < scenes.length) {
          setIdx(p.idx);
        }
        if (Array.isArray(p.seen)) setSeen(p.seen);
      }
    } catch {
      /* ignore */
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ idx, seen }));
    } catch {
      /* ignore */
    }
  }, [idx, seen, hydrated]);

  // mark current scene as seen
  useEffect(() => {
    setSeen((prev) => (prev.includes(scene.n) ? prev : [...prev, scene.n]));
  }, [scene.n]);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(scenes.length - 1, next));
      setIdx(clamped);
    },
    []
  );

  // load + optionally play whenever the scene changes
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.load();
    if (playing) {
      a.play().catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = muted;
  }, [muted]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  const handleEnded = () => {
    if (auto && idx < scenes.length - 1) {
      go(idx + 1);
    } else {
      setPlaying(false);
    }
  };

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(idx + 1);
      if (e.key === "ArrowLeft") go(idx - 1);
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, playing]);

  const pct = ((idx + 1) / scenes.length) * 100;

  return (
    <>
      <div className="mk">
        <div className="mk-top">
          <Link href="/map" className="mk-back">
            &larr; BUMALIK
          </Link>
          <div className="mk-title">Maikling Kwento</div>
          <div className="mk-count">
            EKSENA {pad(scene.n)} / {scenes.length}
          </div>
        </div>

        <div className="mk-stage">
          <div className="mk-window">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc(scene.n)} alt={`Eksena ${scene.n}`} />
          </div>
        </div>

        <div className="mk-text">
          <p>{scene.text}</p>
        </div>

        <div className="mk-ctrl">
          <button
            type="button"
            className="mk-btn"
            onClick={() => go(idx - 1)}
            disabled={idx === 0}
            aria-label="Nakaraang eksena"
          >
            &#8676;
          </button>
          <button
            type="button"
            className="mk-btn mk-btn--play"
            onClick={togglePlay}
            aria-label={playing ? "I-pause" : "I-play"}
          >
            {playing ? "❚❚" : "▶"}
          </button>
          <button
            type="button"
            className="mk-btn"
            onClick={() => go(idx + 1)}
            disabled={idx === scenes.length - 1}
            aria-label="Susunod na eksena"
          >
            &#8677;
          </button>

          <div
            className="mk-rail"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const ratio = (e.clientX - r.left) / r.width;
              go(Math.round(ratio * (scenes.length - 1)));
            }}
          >
            <div className="mk-fill" style={{ width: `${pct}%` }} />
            <div className="mk-dot" style={{ left: `${pct}%` }} />
          </div>

          <button
            type="button"
            className={`mk-toggle ${auto ? "on" : ""}`}
            onClick={() => setAuto((v) => !v)}
          >
            AUTO
          </button>
          <button
            type="button"
            className="mk-toggle"
            onClick={() => setMuted((v) => !v)}
            aria-label="Mute"
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <button
            type="button"
            className="mk-toggle"
            onClick={() => setJumpOpen((v) => !v)}
          >
            EKSENA
          </button>
        </div>
      </div>

      <div className={`mk-jump ${jumpOpen ? "open" : ""}`}>
        {scenes.map((s, i) => (
          <b
            key={s.n}
            className={
              i === idx ? "cur" : seen.includes(s.n) ? "seen" : undefined
            }
            onClick={() => {
              go(i);
              setJumpOpen(false);
            }}
          >
            {s.n}
          </b>
        ))}
      </div>

      <audio
        ref={audioRef}
        src={audioSrc(scene.n)}
        onEnded={handleEnded}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        preload="auto"
      />
    </>
  );
}