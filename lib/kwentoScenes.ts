export type Beat = {
  n: number; // image number — resolves to /images/{n}.jpg
  text: string; // narration line shown while this beat is current
};

export type Scene = {
  scene: number; // 1-10 — resolves to the "VO. SCENE {scene}.mp4" audio file
  beats: Beat[]; // images/captions that advance while that one audio plays
};

// Script: "Lupang Tinubuan" ni Narciso G. Reyes.
// The PDF script numbers 36 narration beats (1)-(36) inside 10 SCENE blocks.
// Each SCENE has exactly one voice-over audio file, and its beats are the
// images/captions that should appear in order while that audio plays —
// e.g. SCENE 1's audio covers beats (1)-(4), so images 1-4 advance across
// that single track instead of each beat having its own audio file.
export const scenes: Scene[] = [
  {
    scene: 1,
    beats: [
      { n: 1, text: "Ang tren ay tumulak sa gitna ng sali-salimuot na mga ingay." },
      { n: 2, text: "Nagsisigawan ang mga batang nagtitinda ng mga babasahin — Tibune, mama, Tribune, Taliba. Ubos na po. Liwayway, bagong labas." },
      { n: 3, text: "Maligayang paglalakbay, Gng. Enriquez. Ngumiti ka naman, Ben, hindi naman ako magtatagal doon at susulat ako araw-araw. Kamusta na lamang. Paalam. Paalam. Hanggang sa muli." },
      { n: 4, text: "Naiwan sa likuran nina Danding ang takipsilim ng Tutuban, at sila'y napagitna sa malayang hangin at sa liwanag ng umaga." },
    ],
  },
  {
    scene: 2,
    beats: [
      { n: 5, text: "Huminga nang maluwag ang kanyang Tiya Juana at ang sabi, \"Salamat at tayo'y nakatulak na rin. Kay init doon sa istasyon.\"" },
      { n: 6, text: "Ang galaw ng makina ngayon ay mabilis na't tugma-tugma, tila pintig ng isang pusong wala nang alinlangan." },
      { n: 7, text: "\"Ang namatay ay ang Tata Inong mo, pamangkin ng iyong Lola Asyang at pinsan namin ng iyong ama. Mabait siyang tao noong siya'y nabubuhay pa.\"" },
      { n: 8, text: "Ang pagkabanggit sa kanyang ama ang tumimo sa ilang bahagi ng kanyang puso, at naglapit sa kanyang damdamin ang hindi kilalang patay." },
    ],
  },
  {
    scene: 3,
    beats: [
      { n: 9, text: "Isang daang makitid, paliko-liko, natatalukapan ng makapal at manilaw-nilaw na alikabok." },
      { n: 10, text: "Mga puno ng kawayan, mangga, niyog at akasya. Mga bahay na pawid, luma na ang karamihan at sunog sa araw ang mga dingding at bubong." },
      { n: 11, text: "Nakangiti at puno ng ningning ng umaga, ang bughaw, maaliwalas at walang ulap na langit." },
    ],
  },
  {
    scene: 4,
    beats: [
      { n: 12, text: "Hindi mapatid-patid ang pagpapakilala ng kanyang Tiya Juana." },
      { n: 13, text: "Sila ang iyong Lolo Tasyo, at sila ang iyong Lola Ines. Ang mga pinsan mong Juan, Seling, Marya at Asyas. Ang iyong Nana Bito. Ang iyong Tata Enteng. Yukod at ngiti rito, halik ng kamay roon." },
      { n: 14, text: "Balana ang nagtanong kay Danding ng kung ano ang lagay ng kanyang amang may sakit at ng kanyang inang siya na lamang ngayong bumubuhay sa kanilang maganak." },
      { n: 15, text: "Ngunit hindi niya maunahan ng pagtugon kay Danding, na tila magaan ngayon ang bibig at palagay na ang loob sa piling ng mga kamag-anak na ngayon lamang nakilala." },
    ],
  },
  {
    scene: 5,
    beats: [
      { n: 16, text: "Isang manipis na dingding ng sawali ang tanging nakapagitan sa bulwagan at sa pinakaloob ng bahay, na siyang kinabuburulan ng patay." },
      { n: 17, text: "Napawi sa kanyang pandinig ang alingawngaw sa labas, at dumampi sa kanyang puso ang katahimikan ng kamatayan." },
      { n: 18, text: "Dahan-dahan siyang lumapit sa kabaong, at pinagmasdan ang mukha ng bangkay." },
      { n: 19, text: "\"Hindi mo nababati ang Nana Marya mo,\" ang marahang paalala ng kanyang Tiya Juana. \"At ang pinsan mong si Bining,\"" },
    ],
  },
  {
    scene: 6,
    beats: [
      { n: 20, text: "Umabot siya ng isang album sa mesang kalapit, binuksan iyon, at pinagmuni-muni ang mahiwaga at makapangyarihang kaugnayan ng dugo na nagbubuklod ng mga tao." },
      { n: 21, text: "Pagkakain ng tanghalian ay nanaog si Danding at nagtungo sa bukid sa may likuran ng bahay." },
      { n: 22, text: "Naupo si Danding sa ilalim ng isang pulutong ng mga punong kawayan, at nagmasid sa paligid-ligid." },
      { n: 23, text: "Ang talim ng matanda ay tila hiyas na kumikislap sa araw. Tumindig si Danding at lumapit sa matanda. Si Lolo Tasyo ang unang nagsalita." },
      { n: 24, text: "\"Kaparis ka ng iyong ama,\" ang wika niya." },
    ],
  },
  {
    scene: 7,
    beats: [
      { n: 25, text: "\"May mga sandali pong kailangan ng tao ang mapag-isa.\"" },
      { n: 26, text: "Tumayo bigla si Lolo Tasyo at itinuro ng itak ang hangganan ng bukid. Doon siya malimit magpalipad ng saranggola noong bata pa siyang munti." },
      { n: 27, text: "Sa kabilang pitak siya nahulog sa kalabaw, nang minsang sumama siya sa akin sa pag-araro." },
      { n: 28, text: "Lumingon ang matanda at tiningala ang punong mangga sa kanilang likuran. \"Sa itaas ng punong ito pinaakyat ko at pinagtago ang ama mo isang hapon, noong kainitan ng himagsikan, nang mabalitaang may mga huramentadong Kastila na paparito.\"" },
    ],
  },
  {
    scene: 8,
    beats: [
      { n: 29, text: "\"At doon, sa kinauupuan mo kanina, doon niya isinulat ang kauna-unahan niyang tula — isang maikling papuri sa kagandahan ng isa sa mga dalagang nakilala niya sa bayan. May tagong kapilyohan ang ama mo.\"" },
      { n: 30, text: "\"Ano ang pinanood mo sa bukid?\" ang usisang biro ng isa sa mga bagong tuklas niyang pinsan. \"Ang araw,\" ang tugon ni Danding, sabay pikit ng mga mata niyang naninibago at hindi halos makakita sa agaw-dilim na tila nakalambong sa bahay." },
    ],
  },
  {
    scene: 9,
    beats: [
      { n: 31, text: "Ang libingan ay nasa gilid ng simbahan, bagay na nagpapagunita kay Danding ng sumpa ng Diyos kay Adan sa mga anak nito, at ng malungkot at batbat-sakit na pagkakawalay nila, na kamatayan lamang ang lubusang magwawakas." },
      { n: 32, text: "Handa na ang hukay. Wala na ang nalalabi kundi ang paghulog at pagtatabon sa kabaong. Ngunit sa huling sandali ay binuksang muli ang takip sa tapat ng mukha ng bangkay, upang ito'y minsan pang masulyapan ng mga naulila." },
      { n: 33, text: "Sandaling nag-ulap ang lahat ng kanyang paningin. Nilunod ang kanyang puso ng matinding dalamhati at ng malabong pakiramdam na siya man ay dumaranas ng isang uri ng kamatayan." },
    ],
  },
  {
    scene: 10,
    beats: [
      { n: 34, text: "Lumulubog na ang araw, at nagsisimula nang lumamig ang hangin. Ang abuhing kamay ng takipsilim ay nakaamba na sa himpapawid. Umupo si Danding sa tabi ng pulutong ng mga kawayan at pinahid ang pawis sa kanyang mukha at leeg." },
      { n: 35, text: "Sa kapirasong lupang ito, na siyang sinilangan ng ama niya, ay napanatag ang kanyang puso." },
      { n: 36, text: "Sa dako ng baybay ay nakarinig siya ng mga tinig, at nauulinigan niyang tinatawag ang kanyang pangalan. Dahan-dahan siyang tumayo. Gabi na, kagat na ang dilim sa lahat ng dako. Walang buwan at may kadiliman ang langit. Ngunit nababanaagan pa niya ang dulo ng mga kawayang nakapanood ng paglikha ng unang tula ng kanyang ama, at ang ilang aandap-andap na bituing saksi ng unang pag-ibig nito." },
    ],
  },
];

export const pad = (n: number) => String(n).padStart(2, "0");

// Matches the basePath GitHub Pages serves the site under (see next.config.mjs).
const basePath = process.env.NODE_ENV === "production" ? "/kultura" : "";

export const imageSrc = (n: number) => `${basePath}/images/${n}.jpg`;
// Files are named like "VO. SCENE 1.mp4" — spaces must be URL-encoded,
// so encode the filename only (not the folder slashes).
export const audioSrc = (scene: number) =>
  `${basePath}/audio/${encodeURIComponent(`VO. SCENE ${scene}.mp4`)}`;

// Rough narration pace used to time when each beat's image/caption should
// appear. There are no real per-word timestamps in the source material, so
// this estimates each beat's on-screen window from its word count instead
// of a fraction of audio.duration — some of the voice-over files report
// duration as Infinity until they've finished playing once, which made the
// old duration-based split silently never advance past the first beat.
const WORDS_PER_SECOND = 2.2;

export function beatBoundaries(beats: Beat[]): number[] {
  let acc = 0;
  return beats.map((b) => {
    const start = acc;
    const words = b.text.split(/\s+/).filter(Boolean).length;
    acc += words / WORDS_PER_SECOND;
    return start;
  });
}
