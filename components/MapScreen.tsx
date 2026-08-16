"use client";

import { useState } from "react";
import LevelSidebar from "./LevelSidebar";
import TransitMap from "./TransitMap";
import TransitDetailPanel from "./TransitDetailPanel";
import type { LineId } from "@/lib/transitLines";

export default function MapScreen() {
  const [activeLineId, setActiveLineId] = useState<LineId | null>(null);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(
    null
  );

  const selectLine = (id: LineId) => {
    setActiveLineId(id);
    setSelectedStationId(null);
  };

  const backToOverview = () => {
    setActiveLineId(null);
    setSelectedStationId(null);
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 sm:flex-row">
      <LevelSidebar />
      <TransitMap
        activeLineId={activeLineId}
        onSelectLine={selectLine}
        onBackToOverview={backToOverview}
        selectedStationId={selectedStationId}
        onSelectStation={setSelectedStationId}
      />
      <TransitDetailPanel
        activeLineId={activeLineId}
        onSelectLine={selectLine}
        selectedStationId={selectedStationId}
        onSelectStation={setSelectedStationId}
      />
    </div>
  );
}