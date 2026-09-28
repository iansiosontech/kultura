import StationList from "@/components/StationList";

export default function AuthorPage() {
  return (
    <main className="relative h-full overflow-hidden">
      <div className="tsbg-sky" />
      <div className="tsbg-wash" />
      <div className="tsbg-roof" />
      <div className="tsbg-platform" />
      <StationList lineId="author" />
    </main>
  );
}
