import KwentoPlayer from "@/components/KwentoPlayer";

export default function KwentoPage() {
  return (
    <main className="relative h-full overflow-hidden">
      <div className="tsbg-sky" />
      <div className="tsbg-wash" />
      <div className="tsbg-roof" />
      <div className="tsbg-platform" />
      <KwentoPlayer />
    </main>
  );
}