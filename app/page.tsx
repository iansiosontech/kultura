import Link from "next/link";
import TransitBackground from "@/components/TransitBackground";

export default function LandingPage() {
  return (
    <main className="relative flex h-full items-center justify-center overflow-hidden bg-bg px-5 py-10 text-center">
      <TransitBackground />
      <div className="sun-rays" />
      <div className="relative z-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-chrome">
          Isang Laro ng Kultura
        </p>
        <h1 className="title-stroke mb-2 font-display text-[46px] leading-[0.95] text-gold sm:text-[76px] md:text-[104px]">
          KulturApp
        </h1>
        <p className="mx-auto mb-10 max-w-md font-body text-base italic text-chrome sm:text-lg">
          Alamin ang mga kwento, may-akda, at diwa ng ating panitikan — isang
          estasyon sa bawat pagkakataon.
        </p>
        <Link
          href="/map"
          className="inline-block rounded-full border-[3px] border-charcoal bg-gold px-11 py-4 font-display text-lg tracking-wide text-charcoal shadow-[0_6px_0_theme(colors.charcoal)] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_theme(colors.charcoal)]"
        >
          Simulan
        </Link>
      </div>
    </main>
  );
}