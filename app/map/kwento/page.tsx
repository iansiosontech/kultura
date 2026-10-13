import KwentoPlayer from "@/components/KwentoPlayer";
import AmbientSky from "@/components/AmbientSky";

export default function KwentoPage() {
  return (
    <main className="relative h-full overflow-hidden">
      <AmbientSky />
      <KwentoPlayer />
    </main>
  );
}
