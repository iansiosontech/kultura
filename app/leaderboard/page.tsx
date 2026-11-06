import Link from "next/link";
import TrainWindowBackground from "@/components/TrainWindowBackground";
import Leaderboard from "@/components/Leaderboard";

export default function LeaderboardPage() {
  return (
    <main className="relative h-full overflow-hidden">
      <TrainWindowBackground />

      <div className="absolute left-5 top-5 z-30">
        <Link
          href="/map"
          className="rounded-full border-2 border-[#3D3222] bg-[#FFFBF0] px-4 py-2 font-mono text-[11px] tracking-wider text-[#3D3222] no-underline shadow-[0_3px_0_#3D3222]"
        >
          &larr; Bumalik
        </Link>
      </div>

      <div className="leaderboard-page">
        <Leaderboard />
      </div>
    </main>
  );
}
