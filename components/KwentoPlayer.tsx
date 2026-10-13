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
import AtStation from "@/components/AtStation";

const STORAGE_KEY = "kultura-kwento-progress-v3";

export default function KwentoPlayer() {
  const router = useRouter();
  const [sceneIdx, setSceneIdx] = useState(0);
  const [beatIdx, setBeatIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [auto, setAuto] = useState(true);
  const [muted, setMuted] = useState(false);
  // the at-station screen is the entry screen — it's open until SIMULAN
  // is pressed, and again automatically between stations.
  const [jumpOpen, setJumpOpen] = useState(true);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  // true for the 3s "train chugging forward" transition after a station's
  // audio ends, before the next station's sign is revealed
  const [advancing, setAdvancing] = useState(false);
  // scenes whose audio has actually played through at least once — this is
  // what unlocks the next station, not merely having opened a scene.
  const [completed, setCompleted] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const boundariesRef = useRef<number[]>([]);

  const scene = scenes[sceneIdx];
  const beat = scene.beats[beatIdx];

  // the next station that isn't finished yet — this is where the train sits
  // on the map, and nothing past it is unlocked.
  const maxCompleted = completed.length ? Math.max(...completed) : 0;
  const activeStation = Math.min(maxCompleted + 1, scenes.length);

  // restore last position
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw) as { sceneIdx: number; completed: number[] };
        if (Array.isArray(p.completed)) setCompleted(p.completed);
        const maxDone = p.completed?.length ? Math.max(...p.completed) : 0;
        const allowedMax = Math.min(maxDone + 1, scenes.length) - 1;
        if (
          typeof p.sceneIdx === "number" &&
          p.sceneIdx >= 0 &&
          p.sceneIdx <= allowedMax
        ) {
          setSceneIdx(p.sceneIdx);
        }
        if (p.completed?.length) setStarted(true);
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
        JSON.stringify({ sceneIdx, completed })
      );
    } catch {
      /* ignore */
    }
  }, [sceneIdx, completed, hydrated]);

  const goScene = useCallback(
    (next: number) => {
      const maxUnlockedIdx = Math.min(activeStation, scenes.length) - 1;
      const clamped = Math.max(0, Math.min(maxUnlockedIdx, next));
      setSceneIdx(clamped);
      setBeatIdx(0);
      setEnded(false);
    },
    [activeStation]
  );

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
    setCompleted((prev) =>
      prev.includes(scene.scene) ? prev : [...prev, scene.scene]
    );
    setPlaying(false);
    if (sceneIdx < scenes.length - 1) {
      // the train "chugs forward" in place for 3s before the next
      // station's sign is revealed — not an instant cut to station N+1
      const nextIdx = sceneIdx + 1;
      setAdvancing(true);
      setJumpOpen(true);
      setTimeout(() => {
        setSceneIdx(nextIdx);
        setBeatIdx(0);
        setEnded(false);
        setAdvancing(false);
      }, 3000);
    } else {
      setEnded(true);
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
            {ended && (
              <div className="mk-end">
                <div className="mk-end-title">
                  Eksena {scene.scene} Tapos
                </div>
                <button
                  type="button"
                  className="mk-end-btn"
                  onClick={() => {
                    setEnded(false);
                    setJumpOpen(true);
                  }}
                >
                  &larr; Bumalik sa Istasyon
                </button>
              </div>
            )}
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
            disabled={scene.scene >= activeStation}
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
        <AtStation
          station={advancing ? scene.scene : activeStation}
          title={
            advancing
              ? scene.title
              : scenes[activeStation - 1]?.title ?? scene.title
          }
          advancing={advancing}
          onStart={() => {
            setSceneIdx(activeStation - 1);
            setBeatIdx(0);
            setEnded(false);
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
