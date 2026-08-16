import Link from "next/link";
import MapScreen from "@/components/MapScreen";
import TransitBackground from "@/components/TransitBackground";

export default function MapPage() {
  return (
    <main className="relative flex h-full flex-col overflow-hidden bg-bg-deep px-[3vw] py-4 sm:px-[4vw]">
      <TransitBackground />

      <div className="relative z-10 mb-4 flex shrink-0 items-center justify-between">
        <Link
          href="/"
          className="rounded-full border border-chrome-dim px-4 py-2 font-mono text-[11px] tracking-wider text-chrome hover:border-gold hover:text-gold"
        >
          &larr; Bumalik
        </Link>
        <p className="font-display text-sm text-gold">KulturApp</p>
      </div>
      <div className="relative z-10 min-h-0 flex-1">
        <MapScreen />
      </div>
    </main>
  );
}