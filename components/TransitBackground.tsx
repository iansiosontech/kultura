export default function TransitBackground() {
  return (
    <>
      <div className="bg-wash" />
      <div className="bg-grid" />
      <div className="bg-rails" />

      {/* Upper rail — train travels left to right */}
      <div className="bg-train-track bg-train-track--upper" />
      <div className="bg-train bg-train--upper">
        <span className="bg-train__car bg-train__car--engine" />
        <span className="bg-train__car" />
        <span className="bg-train__car" />
        <span className="bg-train__car" />
      </div>

      {/* Lower rail — train travels right to left */}
      <div className="bg-train-track bg-train-track--lower" />
      <div className="bg-train bg-train--lower">
        <span className="bg-train__car" />
        <span className="bg-train__car" />
        <span className="bg-train__car" />
        <span className="bg-train__car bg-train__car--engine" />
      </div>
    </>
  );
}