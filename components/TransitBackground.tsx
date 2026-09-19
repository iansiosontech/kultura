export default function TransitBackground() {
  return (
    <>
      <div className="tsbg-sky" />
      <div className="tsbg-wash" />
      <div className="tsbg-clouds">
        <b /><b /><b /><b />
      </div>

      <div className="tsbg-arches">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="tsbg-arch" />
        ))}
      </div>

      <div className="tsbg-roof" />
      <div className="tsbg-vents">
        {Array.from({ length: 5 }).map((_, i) => (
          <s key={i} />
        ))}
      </div>

      <div className="tsbg-lamps">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="tsbg-lamp">
            <i />
          </div>
        ))}
      </div>

      <div className="tsbg-board">
        <u>
          SUSUNOD NA TREN<em>_</em>
        </u>
        <u>
          <span className="tsbg-cg">AUTHOR</span>
          <span className="tsbg-dot"> &middot; </span>
          <span className="tsbg-cm">MAIKLING KWENTO</span>
          <span className="tsbg-dot"> &middot; </span>
          <span className="tsbg-cs">ACTIVITIES</span>
        </u>
      </div>

      <div className="tsbg-pillar tsbg-pillar--l" />
      <div className="tsbg-pillar tsbg-pillar--r" />

      <div className="tsbg-track tsbg-track--a" />
      <div className="tsbg-sleepers tsbg-sleepers--a" />
      <div className="tsbg-track tsbg-track--b" />
      <div className="tsbg-sleepers tsbg-sleepers--b" />
      <div className="tsbg-track tsbg-track--c" />
      <div className="tsbg-sleepers tsbg-sleepers--c" />

      <div className="tsbg-signal tsbg-signal--a"><s /><s /></div>
      <div className="tsbg-signal tsbg-signal--b"><s /><s /></div>
      <div className="tsbg-signal tsbg-signal--c"><s /><s /></div>

      <div className="tsbg-train tsbg-train--a">
        <span className="tsbg-car tsbg-car--engine"><i /></span>
        <span className="tsbg-car" />
        <span className="tsbg-car" />
        <span className="tsbg-car" />
      </div>
      <div className="tsbg-train tsbg-train--b">
        <span className="tsbg-car" />
        <span className="tsbg-car" />
        <span className="tsbg-car" />
        <span className="tsbg-car tsbg-car--engine"><i /></span>
      </div>
      <div className="tsbg-train tsbg-train--c">
        <span className="tsbg-car tsbg-car--engine"><i /></span>
        <span className="tsbg-car" />
        <span className="tsbg-car" />
      </div>

      <div className="tsbg-bench tsbg-bench--a" />
      <div className="tsbg-bench tsbg-bench--b" />
      <div className="tsbg-platform" />

      <div className="tsbg-steam"><b /><b /><b /></div>
      <div className="tsbg-motes">
        {Array.from({ length: 6 }).map((_, i) => (
          <i key={i} />
        ))}
      </div>
      <div className="tsbg-vig" />
    </>
  );
}