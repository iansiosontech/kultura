"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, type PanInfo } from "framer-motion";

type Stage = "idle" | "dispensed" | "inserted";

export default function LineChoices() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("idle");
  const gateRef = useRef<HTMLDivElement | null>(null);

  const handleBuy = () => {
    if (stage === "idle") setStage("dispensed");
  };

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const gate = gateRef.current;
    if (!gate) return;
    const r = gate.getBoundingClientRect();
    const { x, y } = info.point;
    const hit = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    if (hit) setStage("inserted");
  };

  return (
    <div className="tk-wrap">
      <div className="tk-eyebrow">
        {stage === "inserted" ? "Handa Ka Na" : "Istasyon ng Tutuban"}
      </div>

      <div className="tk-scene">
        <button
          type="button"
          className={`tk-machine ${stage !== "idle" ? "tk-machine--used" : ""}`}
          onClick={handleBuy}
          disabled={stage !== "idle"}
          aria-label="Bumili ng tiket sa makina"
        >
          <div className="tk-machine-screen">
            <span className="tk-machine-row">TIKET</span>
            <span className="tk-machine-row tk-machine-price">
              &#8369;1.00
            </span>
          </div>
          <div className="tk-machine-pad">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
          <div className="tk-machine-slot" />
          {stage === "idle" && (
            <span className="tk-machine-hint">
              Pindutin
              <em>_</em>
            </span>
          )}
        </button>

        <div className="tk-track" aria-hidden="true" />

        {stage !== "idle" && (
          <motion.div
            className="tk-card"
            drag={stage === "dispensed"}
            dragMomentum={false}
            dragElastic={0.1}
            dragSnapToOrigin={stage === "dispensed"}
            whileDrag={{ scale: 1.08, rotate: -3, cursor: "grabbing" }}
            onDragEnd={handleDragEnd}
            initial={{ x: 0, y: 26, opacity: 0, scale: 0.5, rotate: -8 }}
            animate={
              stage === "inserted"
                ? { opacity: 0, scale: 0.35, rotate: 0, transition: { duration: 0.35 } }
                : { x: 0, y: 0, opacity: 1, scale: 1, rotate: -4 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <span className="tk-card-line">LINYA 01</span>
            <span className="tk-card-route">Tutuban &rarr; Malawig</span>
            <span className="tk-card-title">Maikling Kwento</span>
          </motion.div>
        )}

        <div
          ref={gateRef}
          className={`tk-gate ${stage === "inserted" ? "tk-gate--open" : ""}`}
        >
          <div className="tk-gate-arm tk-gate-arm--l" />
          <div className="tk-gate-arm tk-gate-arm--r" />
          <div className="tk-gate-pad">
            <span className="tk-gate-icon">
              {stage === "inserted" ? "✓" : "🎫"}
            </span>
          </div>
          {stage === "dispensed" && (
            <span className="tk-gate-hint">Ilapat dito</span>
          )}
        </div>
      </div>

      {stage === "inserted" && (
        <button
          type="button"
          className="tk-go"
          onClick={() => router.push("/map/kwento")}
        >
          Pumasok sa Istasyon &rarr;
        </button>
      )}
    </div>
  );
}
