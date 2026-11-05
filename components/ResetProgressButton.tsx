"use client";

import { resetAllProgress } from "@/lib/resetProgress";

export default function ResetProgressButton() {
  const handleReset = () => {
    const ok = window.confirm(
      "Sigurado ka bang gusto mong simulan muli ang buong kwento? Mawawala ang iyong progreso at iskor sa pagsusulit."
    );
    if (!ok) return;
    resetAllProgress();
    window.location.reload();
  };

  return (
    <button
      type="button"
      className="reset-btn"
      onClick={handleReset}
      aria-label="I-reset ang progreso"
    >
      &#8635; I-RESET
    </button>
  );
}
