import type { Metadata } from "next";
import SyncTool from "@/components/SyncTool";

export const metadata: Metadata = {
  title: "Pag-sync · Kuwento-Quest",
  robots: { index: false, follow: false },
};

export default function SyncPage() {
  return (
    <main className="sync-page">
      <SyncTool />
    </main>
  );
}
