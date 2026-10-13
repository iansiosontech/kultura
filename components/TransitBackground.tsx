const basePath = process.env.NODE_ENV === "production" ? "/kultura" : "";

export default function TransitBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${basePath}/hero/landing-train.png`} alt="" />
      <div className="hero-rays" />
      <div className="hero-particles">
        <b className="hero-p hero-p--1" />
        <b className="hero-p hero-p--2" />
        <b className="hero-p hero-p--3" />
        <b className="hero-p hero-p--4" />
        <b className="hero-p hero-p--5" />
        <b className="hero-p hero-p--6" />
      </div>
      <div className="hero-scrim" />
      <div className="hero-vignette" />
    </div>
  );
}
