export type LineId = "author" | "kwento" | "activities";

export type Station = {
  id: string;
  title: string;
  subtitle?: string; // used for Author line: group member's role/position
  paragraphs: string[];
};

export type TransitLine = {
  id: LineId;
  name: string;
  color: string; // hex, used for the bar/line + station rings
  stations: Station[];
};

// Author Line — placeholder group members + roles. Replace title/subtitle
// with real names once the client/group confirms them.
const authorStations: Station[] = [
  {
    id: "author-1",
    title: "Member 1",
    subtitle: "Project Leader",
    paragraphs: ["Panimulang teksto para kay Member 1 — palitan ng aktwal na impormasyon at larawan kapag available na."],
  },
  {
    id: "author-2",
    title: "Member 2",
    subtitle: "Lead Developer",
    paragraphs: ["Panimulang teksto para kay Member 2 — palitan ng aktwal na impormasyon at larawan kapag available na."],
  },
  {
    id: "author-3",
    title: "Member 3",
    subtitle: "UI/UX Designer",
    paragraphs: ["Panimulang teksto para kay Member 3 — palitan ng aktwal na impormasyon at larawan kapag available na."],
  },
  {
    id: "author-4",
    title: "Member 4",
    subtitle: "Content Researcher",
    paragraphs: ["Panimulang teksto para kay Member 4 — palitan ng aktwal na impormasyon at larawan kapag available na."],
  },
  {
    id: "author-5",
    title: "Member 5",
    subtitle: "Documentation & QA",
    paragraphs: ["Panimulang teksto para kay Member 5 — palitan ng aktwal na impormasyon at larawan kapag available na."],
  },
];

// Maikling Kwento Line — 6 story beats of Ibong Adarna.
const kwentoStations: Station[] = [
  {
    id: "kwento-1",
    title: "Ang Karamdaman ng Hari",
    paragraphs: ["Nagkasakit si Haring Fernando, at walang gamot na nakatulong — sinabi ng isang matanda na tanging ang awit ng Ibong Adarna ang makagagaling sa kanya."],
  },
  {
    id: "kwento-2",
    title: "Ang Unang Paglalakbay",
    paragraphs: ["Si Don Pedro, ang panganay, ang unang sumubok hanapin ang ibon. Natukso siya sa daan at hindi nagtagumpay."],
  },
  {
    id: "kwento-3",
    title: "Ang Ikalawang Paglalakbay",
    paragraphs: ["Sumunod si Don Diego, ang ikalawang anak, ngunit tulad ng kanyang kapatid, siya rin ay nabigo sa mga pagsubok sa daan."],
  },
  {
    id: "kwento-4",
    title: "Ang Pagsubok kay Don Juan",
    paragraphs: ["Ang bunsong anak na si Don Juan ang huling sumubok. Sa tulong ng isang matandang nakilala niya sa daan, natutunan niya kung paano lalampasan ang mga tukso."],
  },
  {
    id: "kwento-5",
    title: "Ang Paghuli sa Ibong Adarna",
    paragraphs: ["Nahuli ni Don Juan ang ibon sa pamamagitan ng pag-iwas sa pitong nakakaantok na awit nito, at nailigtas din niya ang kanyang mga kapatid."],
  },
  {
    id: "kwento-6",
    title: "Ang Pagbabalik at Paghihiganti",
    paragraphs: ["Dahil sa inggit, sinaktan ng magkapatid si Don Juan. Sa huli, nalantad ang katotohanan, at nagtagumpay pa rin siya sa pagpapagaling sa hari."],
  },
];

// Activities Line — 3 activity stations. Content TBD by the client.
const activitiesStations: Station[] = [
  {
    id: "activities-1",
    title: "Gawain 1",
    paragraphs: ["Malapit nang idagdag — ilalagay dito ang unang aktibidad kapag naifinalize na ng client."],
  },
  {
    id: "activities-2",
    title: "Gawain 2",
    paragraphs: ["Malapit nang idagdag — ilalagay dito ang ikalawang aktibidad kapag naifinalize na ng client."],
  },
  {
    id: "activities-3",
    title: "Gawain 3",
    paragraphs: ["Malapit nang idagdag — ilalagay dito ang ikatlong aktibidad kapag naifinalize na ng client."],
  },
];

export const lines: TransitLine[] = [
  { id: "author", name: "Author Line", color: "#F4B400", stations: authorStations },
  { id: "kwento", name: "Maikling Kwento Line", color: "#E6396B", stations: kwentoStations },
  { id: "activities", name: "Activities Line", color: "#38BDF8", stations: activitiesStations },
];

export const allStations: Station[] = lines.flatMap((l) => l.stations);