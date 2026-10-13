export default function AmbientSky({
  variant = "default",
}: {
  variant?: "default" | "map";
}) {
  return (
    <div className={`amb amb--${variant}`} aria-hidden="true">
      <div className="amb-sky" />
      <div className="amb-rays" />
      <div className="amb-hills amb-hills--far" />
      <div className="amb-train-pass">
        <i />
        <i />
      </div>
      <div className="amb-hills amb-hills--near" />
      <div className="amb-particles">
        {Array.from({ length: 10 }).map((_, i) => (
          <b key={i} className={`amb-p amb-p--${i + 1}`} />
        ))}
      </div>
      <div className="amb-vignette" />
    </div>
  );
}
