const basePath = process.env.NODE_ENV === "production" ? "/kultura" : "";

export default function TrainWindowBackground() {
  return (
    <div className="mapbg" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${basePath}/hero/map-window.png`} alt="" />
      <div className="mapbg-glint" />
      <div className="mapbg-dust">
        {Array.from({ length: 8 }).map((_, i) => (
          <b key={i} className={`mapbg-p mapbg-p--${i + 1}`} />
        ))}
      </div>
      <div className="mapbg-scrim" />
      <div className="mapbg-vignette" />
    </div>
  );
}
