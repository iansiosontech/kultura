export default function TrainParked({ moving = false }: { moving?: boolean }) {
  return (
    <div className={`trp ${moving ? "trp--moving" : ""}`} aria-hidden="true">
      <div className="trp-cab">
        {moving && (
          <div className="trp-smoke">
            <b />
            <b />
            <b />
          </div>
        )}
        <div className="trp-stack" />
        <div className="trp-band" />
        <div className="trp-light" />
      </div>
      <div className="trp-wheels">
        <span className="trp-wheel" />
        <span className="trp-wheel" />
        <span className="trp-wheel" />
      </div>
    </div>
  );
}
