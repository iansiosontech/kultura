"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  scenes,
  imageSrc,
  audioSrc,
  pad,
  beatBoundaries,
} from "@/lib/kwentoScenes";
import AtStation from "@/components/AtStation";
import ScoreBadge from "@/components/ScoreBadge";
import SalitaQuiz from "@/components/SalitaQuiz";
import QuizResults from "@/components/QuizResults";
import {
  quizItems,
  readQuizAnswers,
  recordQuizAnswer,
  POINTS_PER_CORRECT,
  type QuizAnswer,
} from "@/lib/kwentoQuiz";

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
  // true once the current scene's audio has played through — shows the
  // REPEAT / EXIT / QUIZ choice instead of auto-advancing to the next station
  const [ended, setEnded] = useState(false);
  // what the end-of-scene popup is showing — the default three choices,
  // that scene's own SALITA puzzle (via PAGSUSULIT), or the all-scenes
  // results screen (via RESULTA, only offered on the last scene)
  const [endView, setEndView] = useState<"choices" | "quiz" | "results">(
    "choices"
  );
  // scenes whose audio has actually played through at least once — this is
  // what unlocks the next station, not merely having opened a scene.
  const [completed, setCompleted] = useState<number[]>([]);
  // one submitted answer per scene — owned here (rather than read fresh
  // per screen) so the score badge updates live the moment a puzzle is
  // answered, without needing a remount
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const score =
    quizAnswers.filter((a) => a.correct).length * POINTS_PER_CORRECT;
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
      }
    } catch {
      /* ignore */
    } finally {
      setHydrated(true);
    }
    setQuizAnswers(readQuizAnswers());
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
      setEndView("choices");
    },
    [activeStation]
  );

  // load + optionally play whenever the scene changes
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    boundariesRef.current = beatBoundaries(scene.beats, scene.pace);
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
    setEnded(true);
    setEndView("choices");
  };

  const handleRepeat = () => {
    const a = audioRef.current;
    setEnded(false);
    setEndView("choices");
    setBeatIdx(0);
    if (a) {
      a.currentTime = 0;
      a.play().catch(() => setPlaying(false));
    }
  };

  // closes the at-station screen and plays the given scene — used for
  // SIMULAN (next unlocked station), continuing a paused in-progress
  // station, and jumping back to any already-completed station.
  // `restart` forces playback back to 0:00 instead of resuming where it
  // was left off (always true when jumping to a *different* scene, since
  // that scene's audio hasn't started yet).
  const startScene = (idx: number, { restart = false } = {}) => {
    setEnded(false);
    setEndView("choices");
    setJumpOpen(false);
    setPlaying(true);
    if (idx !== sceneIdx) {
      // scene is changing — the [sceneIdx] effect below will load
      // the new audio and play it once `playing` is true
      setBeatIdx(0);
      setSceneIdx(idx);
    } else {
      // same scene already loaded — start/resume it directly instead of
      // waiting on an effect that won't rerun
      const a = audioRef.current;
      if (restart) {
        setBeatIdx(0);
        if (a) a.currentTime = 0;
      }
      a?.play().catch(() => setPlaying(false));
    }
  };

  // true when the currently active (unfinished) station has been paused
  // partway through, rather than never started — this is what decides
  // whether the at-station screen offers "continue" vs just "start"
  const activeHasProgress =
    sceneIdx === activeStation - 1 &&
    !ended &&
    (audioRef.current?.currentTime ?? 0) > 0.5;

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
        <ScoreBadge score={score} />
        <div className="mk-top">
          <button
            type="button"
            className="mk-back"
            onClick={() => {
              audioRef.current?.pause();
              setJumpOpen(true);
            }}
          >
            &larr; BUMALIK
          </button>
          <div className="mk-title">Maikling Kwento</div>
          <div className="mk-count">
            SCENE {pad(scene.scene)} / {pad(scenes.length)}
          </div>
        </div>

        {completed.length > 0 && (
          <div className="mk-nodes" aria-label="Mga naratingang istasyon">
            {scenes
              .filter((s) => completed.includes(s.scene))
              .sort((a, b) => a.scene - b.scene)
              .map((s) => (
                <button
                  key={s.scene}
                  type="button"
                  className={`mk-node ${
                    s.scene === scene.scene ? "mk-node--active" : ""
                  }`}
                  onClick={() => goScene(s.scene - 1)}
                  aria-label={`Balikan ang Istasyon ${s.scene}`}
                >
                  {s.scene}
                </button>
              ))}
          </div>
        )}

        <div className="mk-stage">
          <div className="mk-window">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc(beat.n)} alt={`Larawan ${beat.n}`} />
            {ended && (
              <div className="mk-end">
                <div className="mk-end-title">
                  Eksena {scene.scene} Tapos
                </div>

                {endView === "quiz" && (
                  <>
                    {quizItems
                      .filter((q) => q.scene === scene.scene)
                      .map((q) => (
                        <SalitaQuiz
                          key={q.scene}
                          item={q}
                          answered={quizAnswers.some(
                            (a) => a.scene === q.scene
                          )}
                          onSubmit={(guess, correct) =>
                            setQuizAnswers(
                              recordQuizAnswer(q.scene, guess, correct)
                            )
                          }
                        />
                      ))}
                    <div className="mk-end-choices">
                      <button
                        type="button"
                        className="mk-end-btn"
                        onClick={() => setEndView("choices")}
                      >
                        &larr; BUMALIK
                      </button>
                    </div>
                  </>
                )}

                {endView === "results" && (
                  <>
                    <QuizResults answers={quizAnswers} score={score} />
                    <div className="mk-end-choices">
                      <button
                        type="button"
                        className="mk-end-btn"
                        onClick={() => setEndView("choices")}
                      >
                        &larr; BUMALIK
                      </button>
                    </div>
                  </>
                )}

                {endView === "choices" && (
                  <div className="mk-end-choices">
                    <button
                      type="button"
                      className="mk-end-btn"
                      onClick={handleRepeat}
                    >
                      ULITIN
                    </button>
                    <button
                      type="button"
                      className="mk-end-btn"
                      onClick={() => {
                        // closes the popup and shows the at-station screen
                        // for the next station — stays inside Kwento
                        // instead of leaving to the kiosk
                        setEnded(false);
                        setJumpOpen(true);
                      }}
                    >
                      LUMABAS
                    </button>
                    {quizItems.some((q) => q.scene === scene.scene) && (
                      <button
                        type="button"
                        className="mk-end-btn"
                        onClick={() => setEndView("quiz")}
                      >
                        PAGSUSULIT
                      </button>
                    )}
                    {scene.scene === scenes.length && (
                      <button
                        type="button"
                        className="mk-end-btn"
                        onClick={() => setEndView("results")}
                      >
                        RESULTA
                      </button>
                    )}
                  </div>
                )}
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
          station={activeStation}
          title={scenes[activeStation - 1]?.title ?? scene.title}
          score={score}
          visited={scenes
            .filter((s) => completed.includes(s.scene))
            .sort((a, b) => a.scene - b.scene)
            .map((s) => ({ scene: s.scene, title: s.title }))}
          hasProgress={activeHasProgress}
          onStart={() => startScene(activeStation - 1)}
          onRestart={() => startScene(activeStation - 1, { restart: true })}
          onRevisit={(sceneNumber) =>
            startScene(sceneNumber - 1, { restart: true })
          }
          onClose={() => {
            // the at-station screen's back arrow always exits Kwento
            // back to the ticket kiosk
            audioRef.current?.pause();
            router.push("/map");
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
