"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  scenes,
  imageSrc,
  audioSrc,
  pad,
  beatBoundaries,
} from "@/lib/kwentoScenes";
import StationMap from "@/components/StationMap";

const STORAGE_KEY = "kultura-kwento-progress-v2";

export default function KwentoPlayer() {
  const router = useRouter();
  const [sceneIdx, setSceneIdx] = useState(0);
  const [beatIdx, setBeatIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [auto, setAuto] = useState(true);
  const [muted, setMuted] = useState(false);
  // the station map is the entry screen — it's open until a station is picked
  const [jumpOpen, setJumpOpen] = useState(true);
  const [started, setStarted] = useState(false);
  const [seen, setSeen] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const boundariesRef = useRef<number[]>([]);

  const scene = scenes[sceneIdx];
  const beat = scene.beats[beatIdx];

  // restore last position
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw) as { sceneIdx: number; seen: number[] };
        if (
          typeof p.sceneIdx === "number" &&
          p.sceneIdx >= 0 &&
          p.sceneIdx < scenes.length
        ) {
          setSceneIdx(p.sceneIdx);
        }
        if (Array.isArray(p.seen) && p.seen.length > 0) {
          setSeen(p.seen);
          setStarted(true);
        }
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
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ sceneIdx, seen })
      );
    } catch {
      /* ignore */
    }
  }, [sceneIdx, seen, hydrated]);

  // mark current scene as seen
  useEffect(() => {
    setSeen((prev) =>
      prev.includes(scene.scene) ? prev : [...prev, scene.scene]
    );
  }, [scene.scene]);

  const goScene = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(scenes.length - 1, next));
    setSceneIdx(clamped);
    setBeatIdx(0);
  }, []);

  // load + optionally play whenever the scene changes
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    boundariesRef.current = beatBoundaries(scene.beats);
    a.load();
    if (playing) {
      a.play().catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx]);

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

  // advance the on-screen image/caption as the single scene audio plays
  const handleTimeUpdate = () => {
    const a = audioRef.current;
    const bounds = boundariesRef.current;
    if (!a || bounds.length === 0) return;
    let next = 0;
    for (let i = 0; i < bounds.length; i++) {
      if (a.currentTime >= bounds[i]) next = i;
    }
    setBeatIdx((prev) => (prev === next ? prev : next));
  };

  const handleEnded = () => {
    if (auto && sceneIdx < scenes.length - 1) {
      goScene(sceneIdx + 1);
    } else {
      setPlaying(false);
    }
  };

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goScene(sceneIdx + 1);
      if (e.key === "ArrowLeft") goScene(sceneIdx - 1);
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx, playing]);

  const pct = ((sceneIdx + 1) / scenes.length) * 100;

  return (
    <>
      <div className="mk">
        <div className="mk-top">
          <Link href="/map" className="mk-back">
            &larr; BUMALIK
          </Link>
          <div className="mk-title">Maikling Kwento</div>
          <div className="mk-count">
            SCENE {pad(scene.scene)} / {pad(scenes.length)}
          </div>
        </div>

        <div className="mk-stage">
          <div className="mk-window">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc(beat.n)} alt={`Larawan ${beat.n}`} />
          </div>
        </div>

        <div className="mk-text">
          <p>{beat.text}</p>
        </div>

        <div className="mk-ctrl">
          <button
            type="button"
            className="mk-btn"
            onClick={() => goScene(sceneIdx - 1)}
            disabled={sceneIdx === 0}
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
            onClick={() => goScene(sceneIdx + 1)}
            disabled={sceneIdx === scenes.length - 1}
            aria-label="Susunod na eksena"
          >
            &#8677;
          </button>

          <div
            className="mk-rail"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const ratio = (e.clientX - r.left) / r.width;
              goScene(Math.round(ratio * (scenes.length - 1)));
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
            ISTASYON
          </button>
        </div>
      </div>

      {jumpOpen && (
        <StationMap
          total={scenes.length}
          current={scene.scene}
          seen={seen}
          onSelect={(station) => {
            goScene(station - 1);
            setStarted(true);
            setJumpOpen(false);
          }}
          onClose={() => {
            // before anything's been picked, the back arrow exits Kwento
            // entirely — there's no player view yet to fall back to.
            if (started) setJumpOpen(false);
            else router.push("/map");
          }}
        />
      )}

      <audio
        ref={audioRef}
        src={audioSrc(scene.scene)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        preload="auto"
      />
    </>
  );
}
