import StationList from "@/components/StationList";

export default function ActivitiesPage() {
  return (
    <main className="relative h-full overflow-hidden">
      <div className="tsbg-sky" />
      <div className="tsbg-wash" />
      <div className="tsbg-roof" />
      <div className="tsbg-platform" />
      <StationList lineId="activities" />
    </main>
  );
}
