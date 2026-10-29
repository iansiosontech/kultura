export type Beat = {
  n: number; // image number — resolves to /images/{n}.jpg
  text: string; // narration line shown while this beat is current
  // Optional manual override: seconds into the SCENE's audio when this
  // beat's image/caption should appear. Leave unset to use the automatic
  // word-count estimate (see beatBoundaries below). Listen to the real
  // "VO. SCENE {n}.mp4" file, note the second where that line starts
  // being spoken, and set it here to pin it exactly — it doesn't affect
  // the timing of any other beat.
  at?: number;
};

export type Scene = {
  scene: number; // 1-10 — resolves to the "VO. SCENE {scene}.mp4" audio file
  title: string; // short label for the station map
  beats: Beat[]; // images/captions that advance while that one audio plays
  // Optional per-scene override of the words-per-second pace used for the
  // automatic estimate (see WORDS_PER_SECOND below). Lower = slower assumed
  // speech = later switches. Leave unset to use the global default.
  pace?: number;
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
    title: "Pag-alis sa Tutuban",
    beats: [
      { n: 1, text: "Ang tren ay tumulak sa gitna ng sali-salimuot na mga ingay." },
      { n: 2, at: 4, text: "Nagsisigawan ang mga batang nagtitinda ng mga babasahin — Tibune, mama, Tribune, Taliba. Ubos na po. Liwayway, bagong labas. Alingawngaw ng mga habilinan at pagpapaalam. Huwag mong kalimutan, Sindo, ang baba mo ay sa Sta. Isabel, tingnan mo ang istasyon. Temiong, huwag mong mabitiw-bitiwan ang supot na iyan. Nagkalat ang mga magnanakaw, mag-ingat ka! Kamusta na lang sa Ka Uweng. Sela, sabihin mong sa Mahal Na Araw na kami uuwi. Ang pases mo Kiko, baka mawaglit." },
      { n: 3, text: "Maligayang paglalakbay, Gng. Enriquez. Ngumiti ka naman, Ben, hindi naman ako magtatagal doon at susulat ako araw-araw. Kamusta na lamang. Paalam. Paalam. Hanggang sa muli. Ang tren ay nabuhay at dahan-dahang kumilos. H-s-s-s-Tsug. Tsug." },
      { n: 4, text: "Naiwan sa likuran nina Danding ang takipsilim ng Tutuban, at sila'y napagitna sa malayang hangin at sa liwanag ng umaga." },
    ],
  },
  {
    scene: 2,
    title: "Sa Loob ng Tren",
    beats: [
      { n: 5, text: "Huminga nang maluwag ang kanyang Tiya Juana at ang sabi, \"Salamat at tayo'y nakatulak na rin. Kay init doon sa istasyon.\" Ang kanyang Tiyo Goryo ay nakadungaw at nagmamasid sa mga bahay at halaman sa dinaraanan." },
      { n: 6, text: "Ang galaw ng makina ngayon ay mabilis na't tugma-tugma, tila pintig ng isang pusong wala nang alinlangan. Napawing tila ulap sa isip ni Danding ang gulo at ingay ng pag-alis, at gumitaw ang pakay ng kanilang pag-uwi sa Malawig. Nagsasalita na naman ang kanyang Tiya Juana," },
      { n: 7, text: "\"Ang namatay ay ang Tata Inong mo, pamangkin ng iyong Lola Asyang at pinsan namin ng iyong ama. Mabait siyang tao noong siya'y nabubuhay pa.\" Si Danding ay sinagian ng lungkot, bagama't hindi niya nakita kailanman ang namatay na kamag-anak." },
      { n: 8, text: "Ang pagkabanggit sa kanyang ama ang tumimo sa ilang bahagi ng kanyang puso, at naglapit sa kanyang damdamin ang hindi kilalang patay. Naalala niya na sa Malawig ipinanganak, lumaki at nagkaisip ang kanyang ama. Bumaling siya sa kanyang Tiya Juana at itinanong kung ano ang anyo ng nayong iyon, kung mayaman o dukha, kung liblib o malapit sa bayan. At samantalang nag-aapuhap sa alaala ang kanyang butihing ate ay nabubuo naman sa isip ni Danding ang isang kaaya-ayang larawan, at umusbong sa kanyang puso ang pambihirang pananabik." },
    ],
  },
  {
    scene: 3,
    pace: 1.8,
    title: "Pagdating sa Malawig",
    beats: [
      { n: 9, text: "Sa unang malas, ang Malawig ay walang pagkakaiba sa alinmang nayon sa Kalagitnaang Luzon." },
      { n: 10, at: 8, text: "Isang daang makitid, paliko-liko, natatalukapan ng makapal at manilaw-nilaw na alikabok." },
      { n: 10, text: "Mga puno ng kawayan, mangga, niyog at akasya. Mga bahay na pawid, luma na ang karamihan at sunog sa araw ang mga dingding at bubong. Pasalit-salit, isang tindahang hindi mapagwari kung tititigan sa malapit. Doon at dito, nasisilip sa kabila ang madalang na hanay ng mga bahay. At sa ibabaw ng lahat," },
      { n: 11, text: "Nakangiti at puno ng ningning ng umaga, ang bughaw, maaliwalas at walang ulap na langit. \"Walang maganda rito kundi ang langit,\" ang sabing pabiro ng kutsero ng karitelang sinasakyan nila. Pinaglalabanan ni Danding ang sulak ng pagkabigo sa kanyang dibdib. \"Hindi po naman,\" ang marahan niyang tugon. Naisaloob niyang sa mga nayong tulad nito isinilang at nagsilaki sina del Pilar, at iba pang bayani ng lahi, at sa gayong mga bukid nagtining ang diwa ng kabayanihan ng himagsikan laban sa mga Kastila. Ang alaalang iyon ay nakaaaliw sa kanya, nagbigay ng bagong anyo sa lahat ng bagay sa paligidligid." },
    ],
  },
  {
    scene: 4,
    pace: 1.8,
    title: "Mga Kamag-anak",
    beats: [
      { n: 11, text: "Kay rami pala niyang kamag-anak doon." },
      { n: 12, at: 5, text: "Hindi mapatid-patid ang pagpapakilala ng kanyang Tiya Juana." },
      { n: 13, text: "Sila ang iyong Lolo Tasyo, at sila ang iyong Lola Ines. Ang mga pinsan mong Juan, Seling, Marya at Asyas. Ang iyong Nana Bito. Ang iyong Tata Enteng. Yukod at ngiti rito, halik ng kamay roon. Mga kamaganak na malapit at malayo, tunay at hawa lamang, matatanda at mga bata. Ang lahat yata ng tao sa bahay, buhat sa mga nangasapuno ng hagdan hanggang sa nangasaloob ay pawang kamag-anak ni Danding. \"Mabuti na lamang at likas na sarat ang ilong ko,\" ang naisaloob niya. \"Kung hindi ay pulpol na marahil ngayon.\" Sapagkat sila lamang ang nagsipanggaling sa Maynila, sa pagtitipong iyon ay napako kina Danding ang pansin ng lahat. Umugong ang kamustahan." },
      { n: 14, text: "Balana ang nagtanong kay Danding ng kung ano ang lagay ng kanyang amang may sakit at ng kanyang inang siya na lamang ngayong bumubuhay sa kanilang maganak. Sinulyapan ng kanyang Tiya Juana si Danding at sinikap na saluhin ang mga tanong. Bantad na siya sa pagkamaramdamin ng kanyang pamangkin, at alam niyang ang kasawian ng ama nito ay talusaling na sugat sa puso nito." },
      { n: 15, text: "Ngunit hindi niya maunahan ng pagtugon kay Danding, na tila magaan ngayon ang bibig at palagay na ang loob sa piling ng mga kamag-anak na ngayon lamang nakilala." },
    ],
  },
  {
    scene: 5,
    pace: 1.8,
    title: "Sa Harap ng Bangkay",
    beats: [
      { n: 16, text: "Isang manipis na dingding ng sawali ang tanging nakapagitan sa bulwagan at sa pinakaloob ng bahay, na siyang kinabuburulan ng patay. At sa bukas na lagusan, na napapalamutihan sa magkabilang panig ng mga puting kurtina salo ng pinagbuhol na lasong itim, ay walang tigil ang pagyayaot-yaot dito ng mga taong nakikiramay sa mga namatayan, nagmamasid sa bangkay. Ngunit pagpasok na pagpasok ni Danding ay nag-iba ang kanyang pakiramdam." },
      { n: 17, text: "Napawi sa kanyang pandinig ang alingawngaw sa labas, at dumampi sa kanyang puso ang katahimikan ng kamatayan." },
      { n: 18, text: "Dahan-dahan siyang lumapit sa kabaong, at pinagmasdan ang mukha ng bangkay. Maputi, kaaya-aya ang bukas, isang mukhang nagbabandila sa katapatan at kagitingan. Nabakas ni Danding ang lapad ng noo, sa mga matang hindi ganap ang pagkakapikit, at sa hugis ng ilong, ang bahagyang pagkakahawig sa kanyang ama. Bigla siyang nakaramdam ng awa at lungkot." },
      { n: 19, text: "\"Hindi mo nababati ang Nana Marya mo,\" ang marahang paalala ng kanyang Tiya Juana. \"At ang pinsan mong si Bining,\" ang pabulong pang habol. Humalik ng kamay si Danding sa asawa ng yumao, at naupo sa tabi ni Bining, ngunit wala siyang nasabing anuman. Puno ang kanyang puso." },
    ],
  },
  {
    scene: 6,
    pace: 1.8,
    title: "Mga Alaala",
    beats: [
      { n: 20, text: "Pagkaraan ng ilang sandali ay umabot siya ng isang album sa mesang kalapit, binuksan iyon, at pinagmuni-muni ang mahiwaga at makapangyarihang kaugnayan ng dugo na nagbubuklod ng mga tao." },
      { n: 21, text: "Pagkakain ng tanghalian ay nanaog si Danding at nagtungo sa bukid sa may likuran ng bahay. Nakaraan na ang panahon ng paggapas, at namandala na ang ani. Malinis ang hubad na lupa, na naglalatang sa init ng araw." },
      { n: 22, text: "Naupo si Danding sa ilalim ng isang pulutong ng mga punong kawayan, at nagmasid sa paligid-ligid. Hindi kalayuan, sa gawing kaliwa niya, ay naroon ang kanyang Lolo Tasyo na nagkakayas ng kawayan." },
      { n: 23, text: "Ang talim ng matanda ay tila hiyas na kumikislap sa araw. Tumindig si Danding at lumapit sa matanda. Si Lolo Tasyo ang unang nagsalita." },
      { n: 24, text: "\"Kaparis ka ng iyong ama,\" ang wika niya. \"Bakit po?\" \"Balisa ka sa gitna ng karamihan; ibig mo pa ang nag-iisa.\"" },
    ],
  },
  {
    scene: 7,
    pace: 1.8,
    title: "Kwento ni Lolo Tasyo",
    beats: [
      { n: 25, text: "\"May mga sandali pong kailangan ng tao ang mapag-isa.\" \"Ganyan din siya kung magsalita, bata pa'y magulang na ang isip.\" \"Nasaksihan po ba ninyo ang kanyang kabataan?\" \"Nasaksihan!\" Napahalakhak si Lolo Tasyo. \"Ang batang ito! Ako ang nagbaon ng inunan ng ama mo. Ako ang gumawa ng mga una niyang laruan. Naulila agad siya sa ama.\"" },
      { n: 26, text: "Tumayo bigla si Lolo Tasyo at itinuro ng itak ang hangganan ng bukid. Doon siya malimit magpalipad ng saranggola noong bata pa siyang munti." },
      { n: 27, text: "Sa kabilang pitak siya nahulog sa kalabaw, nang minsang sumama siya sa akin sa pag-araro. Nasaktan siya noon, ang akala ko'y hindi siya titigil sa kaiiyak." },
      { n: 28, text: "Lumingon ang matanda at tiningala ang punong mangga sa kanilang likuran. \"Sa itaas ng punong ito pinaakyat ko at pinagtago ang ama mo isang hapon, noong kainitan ng himagsikan, nang mabalitaang may mga huramentadong Kastila na paparito.\"" },
    ],
  },
  {
    scene: 8,
    pace: 1.8,
    title: "Ang Unang Tula",
    beats: [
      { n: 29, text: "\"At doon, sa kinauupuan mo kanina, doon niya isinulat ang kauna-unahan niyang tula — isang maikling papuri sa kagandahan ng isa sa mga dalagang nakilala niya sa bayan. May tagong kapilyohan ang ama mo.\" Napangiti si Danding. \"Ang dalaga po bang iyan ang naging sanhi ng pagkakaluwas niya sa Maynila?\" \"Oo,\" natigilan si Lolo Tasyo na tila nalalasap sa alaala ang mga nangyari. \"Nahuli sila sa tabi ng isang mandala ng palay.\" \"Nahuli po?\" \"Oo — sa liwanag ng aandap-andap na bituin.\" Marami pang ibig itanong si Danding, ngunit naalala niya ang patay at ang mga tao sa bahay, baka hinahanap na siya. Unti-unting pinutol niya ang pag-uusap nila ni Lolo Tasyo, at iniwan ang matanda sa mga alaala nito." },
      { n: 30, text: "\"Ano ang pinanood mo sa bukid?\" ang usisang biro ng isa sa mga bagong tuklas niyang pinsan. \"Ang araw,\" ang tugon ni Danding, sabay pikit ng mga mata niyang naninibago at hindi halos makakita sa agaw-dilim na tila nakalambong sa bahay." },
    ],
  },
  {
    scene: 9,
    pace: 1.8,
    title: "Sa Libingan",
    beats: [
      { n: 31, text: "Ang libingan ay nasa gilid ng simbahan, bagay na nagpapagunita kay Danding ng sumpa ng Diyos kay Adan sa mga anak nito, at ng malungkot at batbat-sakit na pagkakawalay nila, na kamatayan lamang ang lubusang magwawakas. Nagunita niya na sa maliit na bakurang ito ng mga patay na nakahimlay ang alabok ng kanyang ninuno, ang abang labi ng Katipunan, ng mga pag-asa, pag-ibig, lumbay at ligaya, ng palalong mga pangarap at mga pagkabigo na siyang pumana sa kanya ng kanyang angkan. Magaan ang pagyapak ni Danding sa malambot na lupa, at sinikap niyang huwag madaling maging ang pinakamaliit na halaman." },
      { n: 32, text: "Handa na ang hukay. Wala na ang nalalabi kundi ang paghulog at pagtatabon sa kabaong. Ngunit sa huling sandali ay binuksang muli ang takip sa tapat ng mukha ng bangkay, upang ito'y minsan pang masulyapan ng mga naulila. Nabasag ang katahimikan at naghari ang impit na mga hikbi at ang mga piping pananangis na higit na makadurog-puso kaysa maingay na pag-iyak. Pinagtiim ni Danding ang kaniyang mga bagang, ngunit sa kabila ng kanyang pagtitimpi ay naramdaman niyang nangingilid ang luha sa kanyang mga mata." },
      { n: 33, text: "Sandaling nag-ulap ang lahat ng kanyang paningin. Nilunod ang kanyang puso ng matinding dalamhati at ng malabong pakiramdam na siya man ay dumaranas ng isang uri ng kamatayan. Balisa at nagsisikip ang dibdib ng damdaming ito, si Danding ay dahan-dahang lumayo at nagpaunang bumalik sa bahay." },
    ],
  },
  {
    scene: 10,
    pace: 1.8,
    title: "Pag-uwi sa Puso",
    beats: [
      { n: 33, text: "Ibig niyang mapag-isa kaya't nang makita niyang may taong naiwan sa bahay ay patalilis siyang nagtungo sa bukid." },
      { n: 34, text: "Lumulubog na ang araw, at nagsisimula nang lumamig ang hangin. Ang abuhing kamay ng takipsilim ay nakaamba na sa himpapawid. Umupo si Danding sa tabi ng pulutong ng mga kawayan at pinahid ang pawis sa kanyang mukha at leeg. Ang kapayapaan ng bukid ay tila kamay ng isang inang humahaplos sa nag-iinit na noo ni Danding. Huminga siya nang malalim, umupo sa lupa, at ipinikit ang mga mata. Dahan-dahang inunat niya ang kanyang mga paa, itinukod sa lupa ang mga palad; tumingala at binayaang maglaro sa ligalig niyang mukha ang banayad na hangin. Kay lamig at kay bango ng hanging iyon." },
      { n: 34, text: "Unti-unti siyang pinanawan ng lumbay at agam-agam, at natiwasay ang pagod niyang katawan." },
      { n: 35, text: "Sa kapirasong lupang ito, na siyang sinilangan ng ama niya, ay napanatag ang kanyang puso. Palakas nang palakas ang hangin, na nagtataglay ng amoy ng lupa at kay bango ng nakamandalang palay! Naalala ni Danding ang mga kuwento ni Lolo Tasyo tungkol sa kanyang ama, at siya'y napangiti nang lihim. Ang pagsasaranggola sa bukid, ang pagkahulog sa kalabaw, dalaga sa bunton ng palay, ang lahat ay nananariwa sa kanyang gunita. Tumawa nang marahan si Danding at pinag-igi pang lalo ang pagkakasalampak niya sa lupa. Tila isang punong kababaon doon ang mga ugat, siya'y nakaramdam ng pagkakaugnay sa bukid na minsa'y nadilig na mga luha at umalingawngaw sa mga halakhak ng kanyang ama. Sa sandaling iyon ay tila hawak ni Danding sa palad ang lihim ng tinatawag na pag-ibig sa lupang tinubuan. Nauunawaan niya kung bakit ang pagkakatapon sa ibang bansa ay napakabigat na parusa, at kung bakit ang mga nawawalay na anak ay sumasalunga sa bagyo at baha makauwi lamang sa Inang Bayan. Kung bakit walang atubiling naghain ng dugo sina Rizal at Bonifacio. Sa kabila ng mga magigiting na pangungusap ng pambihirang mga pagmamalasakit, at ng kamatayan ng mga bayani ay nasulyapan ni Danding ang kapirasong lupa, na kinatitirikan ng kanilang mga tahanan, kinabubuhayan ng kanilang mga kamag-anak, kasalo sa kanilang mga lihim at nagtatago na pamana ng kanilang mga angkan. Muli siyang napangiti." },
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
const WORDS_PER_SECOND = 2.5;

export function beatBoundaries(beats: Beat[], pace = WORDS_PER_SECOND): number[] {
  // Rebase the running estimate off each beat's actual `at` (when set)
  // instead of ignoring it — otherwise a manual correction on one beat
  // never propagates, and every later beat in the scene keeps drifting
  // further off from the word-count estimate alone.
  let acc = 0;
  return beats.map((b) => {
    const at = b.at ?? acc;
    const words = b.text.split(/\s+/).filter(Boolean).length;
    acc = at + words / pace;
    return at;
  });
}
