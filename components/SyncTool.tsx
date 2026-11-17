"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { scenes, audioSrc } from "@/lib/kwentoScenes";

const STORAGE_KEY = "kultura-sync-tool-v1";

type Times = (number | null)[];
type Saved = Record<string, Times>;

function readSaved(): Saved {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}") as Saved;
  } catch {
    return {};
  }
}

function writeSaved(saved: Saved) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch {
    // progress just won't survive a reload
  }
}

function freshTimes(count: number): Times {
  return Array.from({ length: count }, (_, i) => (i === 0 ? 0 : null));
}

function fmt(t: number | null) {
  if (t === null) return "—";
  const m = Math.floor(t / 60);
  const s = (t - m * 60).toFixed(2).padStart(5, "0");
  return `${m}:${s}`;
}

function isComplete(times: Times | undefined, count: number) {
  return !!times && times.length === count && times.every((t) => t !== null);
}

export default function SyncTool() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [saved, setSaved] = useState<Saved>({});
  const [times, setTimes] = useState<Times>(() => freshTimes(scenes[0].beats.length));
  const [cursor, setCursor] = useState(1);
  const [lead, setLead] = useState(0.3);
  const [rate, setRate] = useState(1);
  const [now, setNow] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [preview, setPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const scene = scenes[sceneIdx];
  const beats = scene.beats;

  useEffect(() => {
    setSaved(readSaved());
  }, []);

  // load this scene's saved taps (if any) whenever the scene changes
  useEffect(() => {
    const stored = readSaved()[String(scene.scene)];
    const t =
      stored && stored.length === beats.length ? stored : freshTimes(beats.length);
    setTimes(t);
    const firstEmpty = t.findIndex((x) => x === null);
    setCursor(firstEmpty === -1 ? beats.length : firstEmpty);
    setPreview(false);
    setNow(0);
    setPlaying(false);
    const a = audioRef.current;
    if (a) {
      a.load();
      a.defaultPlaybackRate = rate;
      a.playbackRate = rate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.defaultPlaybackRate = rate;
    a.playbackRate = rate;
  }, [rate]);

  const persist = useCallback(
    (next: Times) => {
      setTimes(next);
      const all = { ...readSaved(), [String(scene.scene)]: next };
      writeSaved(all);
      setSaved(all);
    },
    [scene.scene]
  );

  const seek = (t: number) => {
    const a = audioRef.current;
    if (a) a.currentTime = Math.max(0, t);
  };

  const togglePlay = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, []);

  const tap = useCallback(() => {
    const a = audioRef.current;
    if (!a || preview || cursor >= beats.length) return;
    const t = Math.max(0, Math.round((a.currentTime - lead) * 100) / 100);
    const next = [...times];
    next[cursor] = t;
    persist(next);
    setCursor(cursor + 1);
  }, [beats.length, cursor, lead, persist, preview, times]);

  const undo = useCallback(() => {
    if (preview || cursor <= 1) return;
    const back = cursor - 1;
    const next = [...times];
    next[back] = null;
    persist(next);
    setCursor(back);
    seek((next[back - 1] ?? 0) - 0.5);
  }, [cursor, persist, preview, times]);

  const retapFrom = (i: number) => {
    if (i === 0) return;
    setPreview(false);
    setCursor(i);
    seek((times[i - 1] ?? 0) - 0.5);
  };

  const resetScene = () => {
    if (!window.confirm(`Burahin lahat ng tap sa Eksena ${scene.scene}?`)) return;
    persist(freshTimes(beats.length));
    setCursor(1);
    seek(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT")) return;
      if (e.code === "Space") {
        e.preventDefault();
        if (e.type === "keydown" && !e.repeat) tap();
      } else if (e.type === "keydown" && e.code === "Backspace") {
        e.preventDefault();
        undo();
      } else if (e.type === "keydown" && e.code === "Enter") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, [tap, undo, togglePlay]);

  const outOfOrder = (i: number) => {
    const t = times[i];
    if (i === 0 || t === null) return false;
    for (let j = i - 1; j >= 0; j--) {
      const p = times[j];
      if (p !== null) return t <= p;
    }
    return false;
  };
  const hasOrderProblem = times.some((_, i) => outOfOrder(i));

  // caption currently showing, by the recorded times (preview) or by the
  // last tapped line (tapping)
  let showing = 0;
  times.forEach((t, i) => {
    if (t !== null && now >= t) showing = i;
  });

  const exportData: Record<string, number[]> = {};
  scenes.forEach((s) => {
    const t = saved[String(s.scene)];
    if (isComplete(t, s.beats.length)) exportData[String(s.scene)] = t as number[];
  });
  const exportText = JSON.stringify(exportData);
  const doneCount = Object.keys(exportData).length;

  const copyExport = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // the text box below can still be copied by hand
    }
  };

  const nextLine = cursor < beats.length ? beats[cursor].text : null;

  return (
    <div className="sync-tool">
      <h1 className="sync-title">Pag-sync ng Audio at Caption</h1>

      <div className="sync-scenes">
        {scenes.map((s, i) => (
          <button
            key={s.scene}
            type="button"
            className={`sync-scene-btn ${i === sceneIdx ? "is-active" : ""} ${
              isComplete(saved[String(s.scene)], s.beats.length) ? "is-done" : ""
            }`}
            onClick={() => setSceneIdx(i)}
          >
            {s.scene}
          </button>
        ))}
      </div>

      <audio
        ref={audioRef}
        src={audioSrc(scene.scene)}
        controls
        preload="auto"
        className="sync-audio"
        onTimeUpdate={(e) => setNow(e.currentTarget.currentTime)}
        onSeeked={(e) => setNow(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <div className="sync-settings">
        <label>
          Bilis
          <select value={rate} onChange={(e) => setRate(Number(e.target.value))}>
            <option value={1}>1×</option>
            <option value={0.85}>0.85×</option>
            <option value={0.75}>0.75×</option>
          </select>
        </label>
        <label>
          Bawas sa tap (seg)
          <input
            type="number"
            step={0.05}
            min={0}
            max={1}
            value={lead}
            onChange={(e) => setLead(Math.max(0, Number(e.target.value) || 0))}
          />
        </label>
        <label className="sync-check">
          <input
            type="checkbox"
            checked={preview}
            onChange={(e) => setPreview(e.target.checked)}
          />
          Silipin ang resulta
        </label>
      </div>

      {preview ? (
        <div className="sync-stage sync-stage--preview">
          <p className="sync-stage-label">Ipinapakita ngayon ({fmt(times[showing])})</p>
          <p className="sync-stage-text">{beats[showing].text}</p>
        </div>
      ) : (
        <div className="sync-stage">
          {nextLine ? (
            <>
              <p className="sync-stage-label">
                Linya {cursor + 1} / {beats.length} — i-tap pagsimula nitong basahin:
              </p>
              <p className="sync-stage-text">{nextLine}</p>
            </>
          ) : (
            <p className="sync-stage-text">
              Tapos na ang eksenang ito. I-check ang &ldquo;Silipin&rdquo; at i-play para
              tingnan, o pumili ng susunod na eksena.
            </p>
          )}
          <div className="sync-actions">
            <button type="button" className="sync-btn" onClick={togglePlay}>
              {playing ? "❚❚ I-PAUSE" : "▶ I-PLAY"}
            </button>
            <button
              type="button"
              className="sync-btn sync-btn--tap"
              onClick={tap}
              disabled={!nextLine}
            >
              TAP
            </button>
            <button type="button" className="sync-btn" onClick={undo} disabled={cursor <= 1}>
              ↶ BAWIIN
            </button>
          </div>
          <p className="sync-hint">
            Keyboard: Space = TAP, Backspace = bawiin, Enter = play/pause. Oras ngayon:{" "}
            {fmt(now)}
          </p>
        </div>
      )}

      {hasOrderProblem && (
        <p className="sync-warning">
          May mga oras na mas maaga kaysa sa naunang linya (pula). I-click ang linya
          para i-tap muli mula roon.
        </p>
      )}

      <ol className="sync-lines">
        {beats.map((b, i) => (
          <li
            key={i}
            className={`sync-line ${i === cursor && !preview ? "is-next" : ""} ${
              preview && i === showing ? "is-showing" : ""
            } ${outOfOrder(i) ? "is-bad" : ""}`}
          >
            <button type="button" onClick={() => retapFrom(i)} disabled={i === 0}>
              <span className="sync-line-time">{fmt(times[i])}</span>
              <span className="sync-line-text">{b.text}</span>
            </button>
          </li>
        ))}
      </ol>

      <button type="button" className="sync-reset" onClick={resetScene}>
        Burahin ang tap sa eksenang ito
      </button>

      <div className="sync-export">
        <p className="sync-stage-label">
          Tapos na: {doneCount} / {scenes.length} eksena. Kopyahin at ipadala ito:
        </p>
        <textarea readOnly value={exportText} rows={4} onFocus={(e) => e.target.select()} />
        <button type="button" className="sync-btn" onClick={copyExport} disabled={!doneCount}>
          {copied ? "NAKOPYA!" : "KOPYAHIN"}
        </button>
      </div>
    </div>
  );
}
