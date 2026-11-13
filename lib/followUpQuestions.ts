"use client";

import { useEffect, useState } from "react";

// Comprehension questions shown right after each scene's SALITA puzzle —
// 2 multiple-choice questions per scene, from the client's
// "TALATANUNGAN KUWENTO-QUEST" document. These count toward the final
// score alongside the 10 SALITA puzzles.
export type FollowUpQuestion = {
  scene: number;
  question: string;
  choices: string[];
  correctIndex: number;
};

export const followUpQuestions: FollowUpQuestion[] = [
  {
    scene: 1,
    question:
      'Ano ang ipinahihiwatig ng paglipat nina Danding mula sa magulong istasyon tungo sa "malayang hangin at liwanag ng umaga"?',
    choices: [
      "Nagsimula ang isang bagong karanasan para kay Danding.",
      "Nagkaroon siya ng pagkakataong pansamantalang makalayo sa gulo ng Maynila.",
      "Naging mas interesado siya sa mga tanawing makikita sa kanilang paglalakbay.",
      "Naramdaman niyang magiging payapa ang kanilang pagpunta sa Malawig.",
    ],
    correctIndex: 0,
  },
  {
    scene: 1,
    question: "Ano ang ipinagbibili ng mga batang nagtitinda sa istasyon?",
    choices: ["Mga pasalubong", "Mga babasahin", "Mga pagkain", "Mga laruan"],
    correctIndex: 1,
  },
  {
    scene: 2,
    question:
      "Bakit nakaramdam ng lungkot si Danding para kay Tata Inong kahit hindi niya ito nakilala?",
    choices: [
      "Dahil naantig siya sa pagkakalarawan dito bilang isang mabuting tao.",
      "Dahil iniugnay niya si Tata Inong sa kaniyang ama at pamilya.",
      "Dahil naisip niyang bahagi rin siya ng pagdadalamhati ng kanilang angkan.",
      "Dahil naging interesado siya sa mga kamag-anak na hindi pa niya nakikilala.",
    ],
    correctIndex: 1,
  },
  {
    scene: 2,
    question: "Ano ang naisip itanong ni Danding tungkol sa Malawig?",
    choices: [
      "Kung tahimik o matao at kung malawak ang mga bukirin doon.",
      "Kung maraming kamag-anak ang naninirahan at kung gaano ito kalayo.",
      "Kung mayaman o dukha at liblib o malapit sa bayan.",
      "Kung maunlad ang pamumuhay at kung madalas puntahan ng mga taga-Maynila.",
    ],
    correctIndex: 2,
  },
  {
    scene: 3,
    question:
      'Sa iyong palagay, alin ang pinakamakatuwirang pagsusuri sa pananaw ni Danding matapos sabihin ng kutsero na, "Walang maganda rito kundi ang langit"?',
    choices: [
      "Hindi lubos na sang-ayon si Danding dahil nakita niyang may halaga ang Malawig.",
      "Sang-ayon si Danding dahil payak lamang ang Malawig.",
      "Hindi pinansin ni Danding ang sinabi ng kutsero.",
      "Nagbago ang pananaw ni Danding dahil sa sinabi ng kutsero.",
    ],
    correctIndex: 0,
  },
  {
    scene: 3,
    question: "Ano ang kalagayan ng langit sa Malawig nang umaga?",
    choices: [
      "Makulimlim, madilim, at walang ulap",
      "Bughaw, maulap, at madilim",
      "Bughaw, maaliwalas, at walang ulap",
      "Madilim, maulap, at maaliwalas",
    ],
    correctIndex: 2,
  },
  {
    scene: 4,
    question:
      "Ano ang pinakamainam na paliwanag kung bakit naging mas palagay ang loob ni Danding sa piling ng kaniyang mga kamag-anak?",
    choices: [
      "Dahil naging abala siya sa pagsagot sa mga tanong tungkol sa kaniyang pamilya.",
      "Dahil unti-unti niyang naramdaman na kabilang siya sa kanilang pamilya.",
      "Dahil marami siyang bagong kamag-anak na ipinakilala ng kaniyang Tiya Juana.",
      "Dahil tinulungan siya ng kaniyang Tiya Juana sa pakikiharap sa mga taong naroon.",
    ],
    correctIndex: 1,
  },
  {
    scene: 4,
    question:
      "Sa iyong palagay, mabuti ba para kay Danding ang pakikisalamuha niya sa kaniyang mga kamag-anak? Bakit?",
    choices: [
      "Oo, dahil nakatulong ito upang maging mas magaan ang kaniyang pakiramdam at makilala ang kaniyang pinagmulan.",
      "Oo, dahil nais niyang makilala ang lahat ng taong nakatira sa Malawig.",
      "Hindi, dahil mas gusto niyang mapag-isa kaysa makipag-usap sa kaniyang mga kamag-anak.",
      "Hindi, dahil lalo lamang siyang naalala sa mga suliraning kinakaharap ng kaniyang ama.",
    ],
    correctIndex: 0,
  },
  {
    scene: 5,
    question:
      'Ano ang ipinahihiwatig ng linyang "napawi sa kanyang pandinig ang alingawngaw sa labas"?',
    choices: [
      "Nais ni Danding na umalis agad sa bahay ng namatayan.",
      "Nawala sa kaniyang pansin ang mga ingay sa paligid dahil sa bigat ng kaniyang nararamdaman.",
      "Hindi nakilala ni Danding ang mga taong nasa paligid ng kabaong.",
      "Nahirapan si Danding na marinig ang sinasabi at bilin ng kaniyang Tiya Juana.",
    ],
    correctIndex: 1,
  },
  {
    scene: 5,
    question:
      "Ano ang naging pagbabago sa pakiramdam ni Danding nang pumasok siya sa pinakaloob ng bahay?",
    choices: [
      "Mula sa pagiging tahimik tungo sa pagiging madaldal.",
      "Mula sa pagiging malungkot tungo sa pagiging masigla.",
      "Mula sa pagiging maingay tungo sa pagiging masayahin.",
      "Mula sa pakikinig sa ingay tungo sa pagdama ng katahimikan.",
    ],
    correctIndex: 3,
  },
  {
    scene: 6,
    question:
      "Ano ang kahalagahan ng sinabi ni Lolo Tasyo na kaparis ni Danding ang kaniyang ama?",
    choices: [
      "Nakatulong itong makita ni Danding ang pagkakatulad nila ng kaniyang ama sa ugali at pagkatao.",
      "Nakatulong itong makilala ni Danding kung paano namuhay ang kaniyang ama noong kabataan nito.",
      "Naging daan ito upang higit niyang maunawaan ang ugnayan ng kaniyang ama sa Malawig.",
      "Nagbigay ito sa kaniya ng pagkakataong malaman kung paano siya tinitingnan ng ibang kamag-anak.",
    ],
    correctIndex: 0,
  },
  {
    scene: 6,
    question:
      "Sa iyong palagay, angkop ba kay Danding ang sinabi ni Lolo Tasyo na siya ay balisa sa gitna ng karamihan at ibig lamang mapag-isa? Bakit?",
    choices: [
      "Hindi, dahil naging madaldal at masayahin siya sa buong panahon ng kaniyang paglalakbay.",
      "Oo, dahil ayaw niyang makisalamuha sa kaniyang mga kamag-anak sa Malawig.",
      "Hindi, dahil mas gusto niyang manatili sa gitna ng maraming tao kaysa pumunta sa bukid.",
      "Oo, dahil makikita kay Danding na mas nagiging komportable siya kapag tahimik at nag-iisa.",
    ],
    correctIndex: 3,
  },
  {
    scene: 7,
    question:
      "Ano ang ipinahihiwatig ng mga kuwentong sinabi ni Lolo Tasyo tungkol sa kabataan ng ama ni Danding?",
    choices: [
      "Malaki ang naging bahagi ni Lolo Tasyo sa mga karanasan ng ama ni Danding.",
      "Marami ang naging kaibigan ng ama ni Danding noong siya ay bata.",
      "Madalas na nag-iisa ang ama ni Danding habang siya ay lumalaki.",
      "Maraming lugar ang napuntahan ng ama ni Danding noong siya ay bata.",
    ],
    correctIndex: 0,
  },
  {
    scene: 7,
    question:
      "Ano ang nangyari sa ama ni Danding nang minsang sumama siya kay Lolo Tasyo sa pag-aararo?",
    choices: [
      "Nagtago siya sa kabilang pitak.",
      "Nagpalipad siya ng saranggola.",
      "Umakyat siya sa punong mangga.",
      "Nahulog siya sa kalabaw.",
    ],
    correctIndex: 3,
  },
  {
    scene: 8,
    question:
      'Nang sabihin ni Danding na "Ang araw" ang pinanood niya sa bukid, ano ang pinakamalalim na kahulugan nito?',
    choices: [
      "Hindi niya tuwirang sinabi ang kaniyang iniisip.",
      "Pinagnilayan niya ang nalaman tungkol sa ama at pinagmulan.",
      "Pinahalagahan niya ang katahimikan ng bukid.",
      "Itinago niya ang damdaming nabuo sa usapan.",
    ],
    correctIndex: 1,
  },
  {
    scene: 8,
    question: "Ano ang itinanong ng pinsan ni Danding tungkol sa kaniyang ginawa sa bukid?",
    choices: [
      "Ano ang pinanood niya sa bukid?",
      "Ano ang isinulat niya sa bukid?",
      "Sino ang nakilala niya sa bukid?",
      "Saan siya nagpunta pagkatapos ng bukid?",
    ],
    correctIndex: 0,
  },
  {
    scene: 9,
    question: "Bakit kaya dahan-dahang lumayo si Danding sa libingan?",
    choices: [
      "Dahil sa matinding dalamhati.",
      "Dahil sa matinding takot.",
      "Dahil sa matinding pag-aalala.",
      "Dahil sa matinding pagkalito.",
    ],
    correctIndex: 0,
  },
  {
    scene: 9,
    question:
      "Sa iyong palagay, naging angkop ba ang naging kilos ni Danding matapos maramdaman ang matinding dalamhati? Bakit?",
    choices: [
      "Hindi, dahil hindi nararapat na ipakita niya ang kaniyang kalungkutan sa harap ng kaniyang mga kamag-anak.",
      "Oo, dahil nais niyang iwasan ang kaniyang mga kamag-anak hanggang matapos ang paglilibing.",
      "Hindi, dahil dapat ay nanatili siya sa libingan upang hindi siya mapag-isa.",
      "Oo, dahil pinili niyang mapag-isa upang maproseso ang kaniyang nararamdaman at makahanap ng kapanatagan.",
    ],
    correctIndex: 3,
  },
  {
    scene: 10,
    question: "Ano ang kalagayan ng paligid nang nagtungo si Danding sa bukid?",
    choices: [
      "Papalubog na ang araw ngunit nananatiling mainit ang paligid.",
      "Takipsilim na at nagsisimula nang dumilim ang kalangitan.",
      "Lumulubog na ang araw at lumalamig ang hangin.",
      "Humihina na ang liwanag habang lumalakas ang hangin sa bukid.",
    ],
    correctIndex: 2,
  },
  {
    scene: 10,
    question: 'Bakit angkop ang pamagat na "Lupang Tinubuan" sa kabuoang kuwento?',
    choices: [
      "Dahil naging mahalaga ang Malawig sa pagkilala ni Danding sa nakaraan ng kaniyang ama.",
      "Dahil naging daan ang paglalakbay upang makilala ni Danding ang kaniyang mga kamag-anak at pinagmulan.",
      "Dahil ipinakita ang kahalagahan ng pagbabalik sa lugar na pinagmulan ng isang pamilya.",
      "Dahil ipinakita nito kung paano nauugnay ang lugar sa pamilya, alaala, pinagmulan, at pagkakakilanlan ni Danding.",
    ],
    correctIndex: 3,
  },
];

export function followUpsFor(scene: number): FollowUpQuestion[] {
  return followUpQuestions.filter((q) => q.scene === scene);
}

export const FOLLOWUP_POINTS_PER_CORRECT = 1;
export const FOLLOWUP_MAX_SCORE =
  followUpQuestions.length * FOLLOWUP_POINTS_PER_CORRECT;

export type FollowUpAnswer = {
  scene: number;
  questionIndex: number;
  choiceIndex: number;
  correct: boolean;
};

export const FOLLOWUP_STORAGE_KEY = "kultura-kwento-followup-v1";

export function readFollowUpAnswers(): FollowUpAnswer[] {
  try {
    const raw = window.localStorage.getItem(FOLLOWUP_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function recordFollowUpAnswer(
  scene: number,
  questionIndex: number,
  choiceIndex: number,
  correct: boolean
): FollowUpAnswer[] {
  const next = [
    ...readFollowUpAnswers().filter(
      (a) => !(a.scene === scene && a.questionIndex === questionIndex)
    ),
    { scene, questionIndex, choiceIndex, correct },
  ];
  try {
    window.localStorage.setItem(FOLLOWUP_STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  return next;
}

export function useFollowUpScore(): number {
  const [score, setScore] = useState(0);
  useEffect(() => {
    setScore(
      readFollowUpAnswers().filter((a) => a.correct).length *
        FOLLOWUP_POINTS_PER_CORRECT
    );
  }, []);
  return score;
}
