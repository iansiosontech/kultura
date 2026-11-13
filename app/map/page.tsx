"use client";

import { useState } from "react";
import Link from "next/link";
import TrainWindowBackground from "@/components/TrainWindowBackground";
import LineChoices from "@/components/LineChoices";
import ResetProgressButton from "@/components/ResetProgressButton";
import BadgesPanel from "@/components/BadgesPanel";
import MapCompletionBar from "@/components/MapCompletionBar";

export default function MapPage() {
  // hides the bottom badges row while the ticket/name/section flow is
  // active, so it doesn't visually collide with the form + button there
  const [ticketActive, setTicketActive] = useState(false);

  return (
    <main className="relative h-full overflow-hidden">
      <TrainWindowBackground />

      <div className="absolute left-5 top-5 z-30 flex flex-wrap items-center gap-2 right-5">
        <Link
          href="/"
          className="rounded-full border-2 border-[#3D3222] bg-[#FFFBF0] px-4 py-2 font-mono text-[11px] tracking-wider text-[#3D3222] no-underline shadow-[0_3px_0_#3D3222]"
        >
          &larr; Bumalik
        </Link>
        <ResetProgressButton />
        <Link
          href="/leaderboard"
          aria-label="Leaderboard"
          className="rounded-full border-2 border-[#3D3222] bg-[#FFFBF0] px-3 py-2 font-mono text-[14px] text-[#3D3222] no-underline shadow-[0_3px_0_#3D3222]"
        >
          🏆
        </Link>
        <Link
          href="/garage"
          aria-label="Mga Tren"
          className="rounded-full border-2 border-[#3D3222] bg-[#FFFBF0] px-3 py-2 font-mono text-[14px] text-[#3D3222] no-underline shadow-[0_3px_0_#3D3222]"
        >
          🚂
        </Link>
      </div>

      <MapCompletionBar />

      <LineChoices onStageChange={(stage) => setTicketActive(stage !== "idle")} />
      {!ticketActive && <BadgesPanel />}
    </main>
  );
}
