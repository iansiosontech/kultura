export type Scene = {
  n: number;      // 1-36
  text: string;   // narration shown on screen
};

// Narration text per scene — from "Lupang Tinubuan" ni Narciso G. Reyes.
// Files are resolved by number: /images/{n}.jpg + /audio/VO. SCENE {n}.mp4
const narration: string[] = [
  "Ang tren ay tumulak sa gitna ng sali-salimuot na mga ingay.",
  "Nagsisigawan ang mga batang nagtitinda ng mga babasahin — Tibune, mama, Tribune, Taliba. Ubos na po. Liwayway, bagong labas.",
  "Maligayang paglalakbay, Gng. Enriquez. Ngumiti ka naman, Ben, hindi naman ako magtatagal doon at susulat ako araw-araw. Kamusta na lamang. Paalam. Paalam. Hanggang sa muli.",
  "Naiwan sa likuran nina Danding ang takipsilim ng Tutuban, at sila'y napagitna sa malayang hangin at sa liwanag ng umaga.",
  "Huminga nang maluwag ang kanyang Tiya Juana at ang sabi, \"Salamat at tayo'y nakatulak na rin. Kay init doon sa istasyon.\"",
  "Ang galaw ng makina ngayon ay mabilis na't tugma-tugma, tila pintig ng isang pusong wala nang alinlangan.",
  "\"Ang namatay ay ang Tata Inong mo, pamangkin ng iyong Lola Asyang at pinsan namin ng iyong ama. Mabait siyang tao noong siya'y nabubuhay pa.\"",
  "Ang pagkabanggit sa kanyang ama ang tumimo sa ilang bahagi ng kanyang puso, at naglapit sa kanyang damdamin ang hindi kilalang patay.",
  "Isang daang makitid, paliko-liko, natatalukapan ng makapal at manilaw-nilaw na alikabok.",
  "Mga puno ng kawayan, mangga, niyog at akasya. Mga bahay na pawid, luma na ang karamihan at sunog sa araw ang mga dingding at bubong.",
  "Nakangiti at puno ng ningning ng umaga, ang bughaw, maaliwalas at walang ulap na langit.",
  "Hindi mapatid-patid ang pagpapakilala ng kanyang Tiya Juana.",
  "Sila ang iyong Lolo Tasyo, at sila ang iyong Lola Ines. Ang mga pinsan mong Juan, Seling, Marya at Asyas. Ang iyong Nana Bito. Ang iyong Tata Enteng. Yukod at ngiti rito, halik ng kamay roon.",
  "Balana ang nagtanong kay Danding ng kung ano ang lagay ng kanyang amang may sakit at ng kanyang inang siya na lamang ngayong bumubuhay sa kanilang maganak.",
  "Ngunit hindi niya maunahan ng pagtugon kay Danding, na tila magaan ngayon ang bibig at palagay na ang loob sa piling ng mga kamag-anak na ngayon lamang nakilala.",
  "Isang manipis na dingding ng sawali ang tanging nakapagitan sa bulwagan at sa pinakaloob ng bahay, na siyang kinabuburulan ng patay.",
  "Napawi sa kanyang pandinig ang alingawngaw sa labas, at dumampi sa kanyang puso ang katahimikan ng kamatayan.",
  "Dahan-dahan siyang lumapit sa kabaong, at pinagmasdan ang mukha ng bangkay.",
  "\"Hindi mo nababati ang Nana Marya mo,\" ang marahang paalala ng kanyang Tiya Juana. \"At ang pinsan mong si Bining,\"",
  "Umabot siya ng isang album sa mesang kalapit, binuksan iyon, at pinagmuni-muni ang mahiwaga at makapangyarihang kaugnayan ng dugo na nagbubuklod ng mga tao.",
  "Pagkakain ng tanghalian ay nanaog si Danding at nagtungo sa bukid sa may likuran ng bahay.",
  "Naupo si Danding sa ilalim ng isang pulutong ng mga punong kawayan, at nagmasid sa paligid-ligid.",
  "Ang talim ng matanda ay tila hiyas na kumikislap sa araw. Tumindig si Danding at lumapit sa matanda. Si Lolo Tasyo ang unang nagsalita.",
  "\"Kaparis ka ng iyong ama,\" ang wika niya.",
  "\"May mga sandali pong kailangan ng tao ang mapag-isa.\"",
  "Tumayo bigla si Lolo Tasyo at itinuro ng itak ang hangganan ng bukid. Doon siya malimit magpalipad ng saranggola noong bata pa siyang munti.",
  "Sa kabilang pitak siya nahulog sa kalabaw, nang minsang sumama siya sa akin sa pag-araro.",
  "Lumingon ang matanda at tiningala ang punong mangga sa kanilang likuran. \"Sa itaas ng punong ito pinaakyat ko at pinagtago ang ama mo isang hapon, noong kainitan ng himagsikan, nang mabalitaang may mga huramentadong Kastila na paparito.\"",
  "\"At doon, sa kinauupuan mo kanina, doon niya isinulat ang kauna-unahan niyang tula — isang maikling papuri sa kagandahan ng isa sa mga dalagang nakilala niya sa bayan. May tagong kapilyohan ang ama mo.\"",
  "\"Ano ang pinanood mo sa bukid?\" ang usisang biro ng isa sa mga bagong tuklas niyang pinsan. \"Ang araw,\" ang tugon ni Danding, sabay pikit ng mga mata niyang naninibago at hindi halos makakita sa agaw-dilim na tila nakalambong sa bahay.",
  "Ang libingan ay nasa gilid ng simbahan, bagay na nagpapagunita kay Danding ng sumpa ng Diyos kay Adan sa mga anak nito, at ng malungkot at batbat-sakit na pagkakawalay nila, na kamatayan lamang ang lubusang magwawakas.",
  "Handa na ang hukay. Wala na ang nalalabi kundi ang paghulog at pagtatabon sa kabaong. Ngunit sa huling sandali ay binuksang muli ang takip sa tapat ng mukha ng bangkay, upang ito'y minsan pang masulyapan ng mga naulila.",
  "Sandaling nag-ulap ang lahat ng kanyang paningin. Nilunod ang kanyang puso ng matinding dalamhati at ng malabong pakiramdam na siya man ay dumaranas ng isang uri ng kamatayan.",
  "Lumulubog na ang araw, at nagsisimula nang lumamig ang hangin. Ang abuhing kamay ng takipsilim ay nakaamba na sa himpapawid. Umupo si Danding sa tabi ng pulutong ng mga kawayan at pinahid ang pawis sa kanyang mukha at leeg.",
  "Sa kapirasong lupang ito, na siyang sinilangan ng ama niya, ay napanatag ang kanyang puso.",
  "Sa dako ng baybay ay nakarinig siya ng mga tinig, at nauulinigan niyang tinatawag ang kanyang pangalan. Dahan-dahan siyang tumayo. Gabi na, kagat na ang dilim sa lahat ng dako. Walang buwan at may kadiliman ang langit. Ngunit nababanaagan pa niya ang dulo ng mga kawayang nakapanood ng paglikha ng unang tula ng kanyang ama, at ang ilang aandap-andap na bituing saksi ng unang pag-ibig nito.",
];

export const scenes: Scene[] = narration.map((text, i) => ({
  n: i + 1,
  text,
}));

export const pad = (n: number) => String(n).padStart(2, "0");

// Matches the basePath GitHub Pages serves the site under (see next.config.mjs).
const basePath = process.env.NODE_ENV === "production" ? "/kultura" : "";

export const imageSrc = (n: number) => `${basePath}/images/${n}.jpg`;
// Files are named like "VO. SCENE 1.mp4" — spaces must be URL-encoded,
// so encode the filename only (not the folder slashes).
export const audioSrc = (n: number) =>
  `${basePath}/audio/${encodeURIComponent(`VO. SCENE ${n}.mp4`)}`;