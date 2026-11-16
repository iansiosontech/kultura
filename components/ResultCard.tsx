"use client";

import { useEffect, useRef, useState } from "react";
import { drawResultCard, canvasToBlob } from "@/lib/resultCard";
import { readStudentInfo } from "@/lib/studentInfo";
import { trainTierFor } from "@/lib/trainTiers";
import { playClick } from "@/lib/sfx";

type ResultCardProps = { score: number; maxScore: number };

export default function ResultCard({ score, maxScore }: ResultCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const info = readStudentInfo();
    const tier = trainTierFor(10); // RESULTA only shows after all 10 scenes
    drawResultCard(canvas, {
      name: info?.name || "Manlalakbay",
      section: info?.section || "",
      score,
      maxScore,
      tierName: tier.name,
    });
    setPreviewUrl(canvas.toDataURL("image/png"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, maxScore]);

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas || sharing) return;
    playClick();
    setSharing(true);
    try {
      const blob = await canvasToBlob(canvas);
      if (!blob) return;
      const file = new File([blob], "kuwento-quest-resulta.png", {
        type: "image/png",
      });

      if (
        typeof navigator.share === "function" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "Kuwento-Quest",
          text: "Natapos ko ang Kuwento-Quest!",
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "kuwento-quest-resulta.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      // user cancelled the native share sheet, or share/download failed —
      // nothing to recover, just let them try again
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="result-card">
      <p className="quiz-eyebrow">IBAHAGI ANG RESULTA</p>
      <canvas ref={canvasRef} className="result-card-canvas" aria-hidden="true" />
      {previewUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt="Resulta card"
          className="result-card-preview"
        />
      )}
      <button
        type="button"
        className="result-card-btn"
        onClick={handleShare}
        disabled={sharing}
      >
        I-SHARE
      </button>
    </div>
  );
}
