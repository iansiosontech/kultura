"use client";

import { useRouter } from "next/navigation";

export default function LineChoices() {
  const router = useRouter();

  return (
    <div className="lc-wrap">
      <div className="lc-eyebrow">Pumili ng Linya</div>

      <button
        type="button"
        className="lc-pass"
        onClick={() => router.push("/map/kwento")}
      >
        <div className="lc-pass-punch" />

        <div className="lc-pass-top">
          <span className="lc-pass-line">LINYA 01</span>
          <span className="lc-pass-class">1&#8311; URI</span>
        </div>

        <div className="lc-pass-route">
          <div className="lc-pass-from">
            <span className="lc-pass-label">Mula</span>
            <span className="lc-pass-city">Tutuban</span>
          </div>
          <span className="lc-pass-arrow" aria-hidden="true">
            &#128646;
          </span>
          <div className="lc-pass-to">
            <span className="lc-pass-label">Patutunguhan</span>
            <span className="lc-pass-city">Malawig</span>
          </div>
        </div>

        <div className="lc-pass-perf" />

        <div className="lc-pass-stub">
          <span className="lc-pass-title">Maikling Kwento</span>
          <span className="lc-pass-sub">Basahin at pakinggan ang kwento.</span>
          <span className="lc-pass-cta">Sumakay &rarr;</span>
        </div>
      </button>
    </div>
  );
}
