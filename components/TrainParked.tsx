const basePath = process.env.NODE_ENV === "production" ? "/kultura" : "";

export default function TrainParked({ moving = false }: { moving?: boolean }) {
  return (
    <div className={`trp ${moving ? "trp--moving" : ""}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="trp-img" src={`${basePath}/hero/train-head.png`} alt="" />
      {moving && (
        <div className="trp-smoke">
          <b />
          <b />
          <b />
        </div>
      )}
    </div>
  );
}
