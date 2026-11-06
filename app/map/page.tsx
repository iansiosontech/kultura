import Link from "next/link";
import TrainWindowBackground from "@/components/TrainWindowBackground";
import LineChoices from "@/components/LineChoices";
import QuizScoreBadge from "@/components/QuizScoreBadge";
import ResetProgressButton from "@/components/ResetProgressButton";
import BadgesPanel from "@/components/BadgesPanel";
import MapCompletionBar from "@/components/MapCompletionBar";

export default function MapPage() {
  return (
    <main className="relative h-full overflow-hidden">
      <TrainWindowBackground />
      <QuizScoreBadge />

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

      <LineChoices />
      <BadgesPanel />
    </main>
  );
}