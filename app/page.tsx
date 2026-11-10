import Link from "next/link";
import TransitBackground from "@/components/TransitBackground";

export default function LandingPage() {
  return (
    <main className="relative h-full overflow-hidden">
      <TransitBackground />
      <div className="kap-hero">
        <span className="kap-eyebrow">Isang Paglalakbay sa Panitikang Filipino</span>
        <h1 className="kap-title">Kuwento-Quest</h1>
        <p className="kap-subtitle">
          Tuklasin ang Kuwento. Unawain ang Bawat Tagpo.
        </p>
        <p className="kap-tagline">
          Samahan si Danding sa kaniyang paglalakbay sa maikling kuwentong
          &ldquo;Lupang Tinubuan&rdquo; ni Narciso G. Reyes. Suriin ang mga
          pangyayari, tuklasin ang mga pahiwatig, at unawain ang mga
          kaisipang nakapaloob sa kuwento sa bawat hamong iyong
          malalampasan.
        </p>
        <Link href="/map" className="kap-start">
          SIMULAN &rarr;
        </Link>
      </div>
    </main>
  );
}