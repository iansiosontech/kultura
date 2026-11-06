"use client";

import { useEffect, useState } from "react";
import CompletionBar from "@/components/CompletionBar";
import { readCompletedScenes, scenes } from "@/lib/kwentoScenes";

export default function MapCompletionBar() {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setCompleted(readCompletedScenes().length);
  }, []);

  return (
    <div className="map-progress-row">
      <CompletionBar completed={completed} total={scenes.length} />
    </div>
  );
}
