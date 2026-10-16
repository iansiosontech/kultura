const basePath = process.env.NODE_ENV === "production" ? "/kultura" : "";

export default function TrainParked({ moving = false }: { moving?: boolean }) {
  return (
    <div className={`trp ${moving ? "trp--moving" : ""}`} aria-hidden="true">
      <span className="trp-body">&#128642;</span>
      <div className="trp-wheels">
        <span className="trp-wheel" />
        <span className="trp-wheel" />
        <span className="trp-wheel" />
      </div>
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
