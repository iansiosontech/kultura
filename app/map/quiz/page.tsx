import Link from "next/link";
import TrainWindowBackground from "@/components/TrainWindowBackground";

export default function QuizPage() {
  return (
    <main className="relative h-full overflow-hidden">
      <TrainWindowBackground />

      <div className="absolute left-5 top-5 z-30">
        <Link
          href="/map"
          className="rounded-full border-2 border-[#3D3222] bg-[#FFFBF0] px-4 py-2 font-mono text-[11px] tracking-wider text-[#3D3222] shadow-[0_3px_0_#3D3222]"
        >
          &larr; Bumalik
        </Link>
      </div>

      <div className="relative z-20 flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="rounded-2xl border-2 border-[#3D3222] bg-[#FFFBF0] px-8 py-10 shadow-[0_8px_0_#3D3222]">
          <h1 className="font-mono text-xl font-extrabold tracking-wide text-[#3D3222]">
            Paparating na ang Pagsusulit!
          </h1>
          <p className="mt-3 max-w-sm font-mono text-sm text-[#5A4A32]">
            Ihahanda pa namin ang pagsusulit tungkol sa &quot;Lupang
            Tinubuan&quot;. Balik ka ulit dito sa lalong madaling panahon.
          </p>
        </div>
      </div>
    </main>
  );
}
