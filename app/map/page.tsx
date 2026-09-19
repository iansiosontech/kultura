import Link from "next/link";
import TransitBackground from "@/components/TransitBackground";
import LineChoices from "@/components/LineChoices";

export default function MapPage() {
  return (
    <main className="relative h-full overflow-hidden">
      <TransitBackground />

      <div className="absolute left-5 top-5 z-30">
        <Link
          href="/"
          className="rounded-full border-2 border-[#3D3222] bg-[#FFFBF0] px-4 py-2 font-mono text-[11px] tracking-wider text-[#3D3222] shadow-[0_3px_0_#3D3222]"
        >
          &larr; Bumalik
        </Link>
      </div>

      <LineChoices />
    </main>
  );
}