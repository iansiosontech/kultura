const basePath = process.env.NODE_ENV === "production" ? "/kultura" : "";

export default function StationPlatformBackground() {
  return (
    <div className="stnbg" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${basePath}/hero/station-platform.png`} alt="" />
      <div className="stnbg-rays" />
      <div className="stnbg-particles">
        {Array.from({ length: 6 }).map((_, i) => (
          <b key={i} className={`stnbg-p stnbg-p--${i + 1}`} />
        ))}
      </div>
      <div className="stnbg-scrim" />
    </div>
  );
}
