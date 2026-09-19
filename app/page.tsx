import Link from "next/link";
import TransitBackground from "@/components/TransitBackground";

export default function LandingPage() {
  return (
    <main className="relative h-full overflow-hidden">
      <TransitBackground />
      <div className="kap-hero">
        <span className="kap-eyebrow">Isang Laro ng Kultura</span>
        <h1 className="kap-title">KulturApp</h1>
        <p className="kap-tagline">
          Alamin ang mga kwento, may-akda, at diwa ng ating panitikan — isang
          estasyon sa bawat pagkakataon.
        </p>
        <Link href="/map" className="kap-start">
          SIMULAN &rarr;
        </Link>
      </div>
    </main>
  );
}