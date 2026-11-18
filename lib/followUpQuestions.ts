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
      "Ano ang ipinahihiwatig ng paglipat nina Danding mula sa magulong istasyon tungo sa “malayang hangin at liwanag ng umaga”?",
    choices: [
      "Nagsimula ang isang bagong karanasan para kay Danding.",
      "Naramdaman niyang magiging payapa ang kanilang pagpunta sa Malawig.",
      "Naging mas interesado siya sa mga tanawing makikita sa kanilang paglalakbay.",
      "Nagkaroon siya ng pagkakataong pansamantalang makalayo sa gulo ng Maynila.",
    ],
    correctIndex: 0,
  },
  {
    scene: 1,
    question:
      "Ano ang ipinagbibili ng mga batang nagtitinda sa istasyon?",
    choices: [
      "Mga pasalubong",
      "Mga babasahin",
      "Mga pagkain",
      "Mga laruan",
    ],
    correctIndex: 1,
  },
  {
    scene: 2,
    question:
      "Bakit nakaramdam ng lungkot si Danding para kay Tata Inong kahit hindi niya ito nakilala?",
    choices: [
      "Dahil iniugnay niya si Tata Inong sa kaniyang ama at pamilya.",
      "Dahil naantig siya sa pagkakalarawan dito bilang isang mabuting tao.",
      "Dahil naisip niyang bahagi rin siya ng pagdadalamhati ng kanilang angkan.",
      "Dahil naging interesado siya sa mga kamag-anak na hindi pa niya nakikilala.",
    ],
    correctIndex: 0,
  },
  {
    scene: 2,
    question:
      "Ano ang naisip itanong ni Danding tungkol sa Malawig?",
    choices: [
      "Kung maunlad ang pamumuhay at kung madalas puntahan ng mga taga-Maynila.",
      "Kung maraming kamag-anak ang naninirahan at kung gaano ito kalayo.",
      "Kung tahimik o matao at kung malawak ang mga bukirin doon.",
      "Kung mayaman o dukha at liblib o malapit sa bayan.",
    ],
    correctIndex: 3,
  },
  {
    scene: 3,
    question:
      "Sa iyong palagay, alin ang pinakamakatuwirang pagsusuri sa pananaw ni Danding matapos sabihin ng kutsero na, “Walang maganda rito kundi ang langit”?",
    choices: [
      "Hindi lubos na sang-ayon si Danding dahil nakita niyang may halaga ito.",
      "Nagbago ang pananaw ni Danding dahil sa sinabi ng kutsero.",
      "Sang-ayon si Danding dahil payak lamang ang Malawig.",
      "Hindi pinansin ni Danding ang sinabi ng kutsero.",
    ],
    correctIndex: 0,
  },
  {
    scene: 3,
    question:
      "Ano ang kalagayan ng langit sa Malawig nang umaga?",
    choices: [
      "Makulimlim, madilim, at walang ulap",
      "Bughaw, maaliwalas, at walang ulap",
      "Madilim, maulap, at maaliwalas",
      "Bughaw, maulap, at madilim",
    ],
    correctIndex: 1,
  },
  {
    scene: 4,
    question:
      "Ano ang pinakamainam na paliwanag kung bakit naging mas palagay ang loob ni Danding sa piling ng kaniyang mga kamag-anak?",
    choices: [
      "Dahil marami siyang kamag-anak na nakilala.",
      "Dahil tinulungan siya ng kaniyang Tiya Juana sa pakikiharap.",
      "Dahil unti-unti niyang naramdaman na kabilang siya sa pamilya.",
      "Dahil nabawasan ang kaniyang pag-aalala sa kalagayan ng kaniyang ama at ina habang nasa pagtitipon.",
    ],
    correctIndex: 2,
  },
  {
    scene: 4,
    question:
      "Sa iyong palagay, mabuti ba para kay Danding ang pakikisalamuha niya sa kaniyang mga kamag-anak? Bakit?",
    choices: [
      "Hindi, dahil naalala niya ang suliranin ng kaniyang ama.",
      "Oo, dahil nakatulong ito upang gumaan ang kaniyang pakiramdam.",
      "Hindi, dahil mas gusto niyang mapag-isa kaysa makihalubilo sa ibang tao.",
      "Oo, dahil naging pagkakataon ito upang malaman niya ang mga tunay nilang kaugalian.",
    ],
    correctIndex: 1,
  },
  {
    scene: 5,
    question:
      "Ano ang ipinahihiwatig ng linyang “napawi sa kaniyang pandinig ang alingawngaw sa labas”?",
    choices: [
      "Nais ni Danding na umalis agad sa bahay ng namatayan.",
      "Hindi niya marinig nang maayos ang paalala ng kaniyang Tiya Juana.",
      "Nawala sa kaniyang pansin ang mga ingay sa paligid dahil sa bigat ng nararamdaman.",
      "Hindi napansin ang pag-uusap ng mga taong nakikiramay sa loob ng bahay dahil sa ingay.",
    ],
    correctIndex: 2,
  },
  {
    scene: 5,
    question:
      "Ano ang naging pagbabago sa pakiramdam ni Danding nang pumasok siya sa pinakaloob ng bahay?",
    choices: [
      "Mula sa pagiging tahimik tungo sa pagiging madaldal.",
      "Mula sa pagiging malungkot tungo sa pagiging masigla.",
      "Mula sa pakikinig sa ingay tungo sa pagdama ng katahimikan.",
      "Mula sa pagiging maingay at tahimik tungo sa pagiging masayahin.",
    ],
    correctIndex: 2,
  },
  {
    scene: 6,
    question:
      "Ano ang kahalagahan ng sinabi ni Lolo Tasyo na kaparis ni Danding ang kaniyang ama?",
    choices: [
      "Nalaman ni Danding ang ilang karanasan ng kaniyang ama noong matanda na ito.",
      "Naunawaan ni Danding ang pagkakatulad nila ng kaniyang ama sa ugali.",
      "Nalaman niya ang dahilan ng pagkahilig ng kaniyang ama sa pag-iisa.",
      "Nagkaroon siya ng ideya kung paano siya lumaki.",
    ],
    correctIndex: 1,
  },
  {
    scene: 6,
    question:
      "Sa iyong palagay, angkop ba kay Danding ang sinabi ni Lolo Tasyo na siya ay balisa sa gitna ng karamihan at ibig lamang mapag-isa? Bakit?",
    choices: [
      "Oo, dahil pinili niyang mapag-isa sa bukid.",
      "Hindi, dahil nakipagkuwentuhan siya sa ibang tao.",
      "Hindi, dahil hinanap niya ang kaniyang mga kamag-anak.",
      "Oo, dahil lumapit siya kay Lolo Tasyo upang makipag-usap.",
    ],
    correctIndex: 0,
  },
  {
    scene: 7,
    question:
      "Ano ang ipinahihiwatig ng mga kuwentong sinabi ni Lolo Tasyo tungkol sa kabataan ng ama ni Danding?",
    choices: [
      "Madalas na nag-iisa ang ama ni Danding habang siya ay lumalaki.",
      "Marami ang naging kaibigan ng ama ni Danding noong siya ay bata.",
      "Maraming lugar ang napuntahan ng ama ni Danding noong siya ay bata.",
      "Malaki ang naging bahagi ni Lolo Tasyo sa mga karanasan ng ama ni Danding.",
    ],
    correctIndex: 3,
  },
  {
    scene: 7,
    question:
      "Ano ang nangyari sa ama ni Danding nang minsang sumama siya kay Lolo Tasyo sa pag-aararo?",
    choices: [
      "Umakyat siya sa puno.",
      "Nahulog siya sa kalabaw.",
      "Nagtago siya sa kabilang pitak.",
      "Nagpalipad siya ng saranggola sa bukid.",
    ],
    correctIndex: 1,
  },
  {
    scene: 8,
    question:
      "Nang sabihin ni Danding na “Ang araw” habang pinanood niya ang bukid, ano ang pinakamalalim na kahulugan nito?",
    choices: [
      "Itinago niya ang damdaming nabuo sa usapan.",
      "Pinahalagahan niya ang katahimikan ng kapaligiran.",
      "Hindi niya tuwirang sinabi ang kaniyang iniisip at saloobin.",
      "Pinagnilayan niya ang nalaman tungkol sa ama at pinagmulan.",
    ],
    correctIndex: 3,
  },
  {
    scene: 8,
    question:
      "Ano ang itinanong ng pinsan ni Danding tungkol sa kaniyang ginawa sa bukid?",
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
    question:
      "Bakit kaya dahan-dahang lumayo si Danding sa libingan?",
    choices: [
      "Dahil sa matinding dalamhati.",
      "Dahil sa matinding pangamba.",
      "Dahil sa pagkalito at kawalan ng katiyakan.",
      "Dahil sa matinding pag-aalala at pagkabahala.",
    ],
    correctIndex: 0,
  },
  {
    scene: 9,
    question:
      "Sa iyong palagay, naging angkop ba ang naging kilos ni Danding matapos maramdaman ang matinding dalamhati? Bakit?",
    choices: [
      "Oo, dahil ayaw niya ng kausap at nais mapag-isa muna.",
      "Hindi, dahil dapat siyang manatili sa libingan at pigilan ang nararamdaman.",
      "Hindi, dahil hindi niya dapat iwasan ang kaniyang mga kamag-anak sa oras ng pagluluksa.",
      "Oo, dahil kailangan niya ng panahon upang mapanatag ang sarili at maunawaan ang kaniyang nararamdaman.",
    ],
    correctIndex: 3,
  },
  {
    scene: 10,
    question:
      "Ano ang kalagayan ng paligid nang nagtungo si Danding sa bukid?",
    choices: [
      "Papalubog na ang araw ngunit nananatiling mainit ang paligid.",
      "Takipsilim na at nagsisimula nang dumilim ang kalangitan.",
      "Lumulubog na ang araw at lumalamig na ang hangin.",
      "Humihina na ang liwanag at lumalakas ang hangin.",
    ],
    correctIndex: 2,
  },
  {
    scene: 10,
    question:
      "Bakit angkop ang pamagat na “Lupang Tinubuan” sa kabuoang kuwento?",
    choices: [
      "Dahil mahalaga ang Malawig sa pamilya ni Danding.",
      "Dahil nakilala ni Danding ang mga kamag-anak ng kaniyang ama.",
      "Dahil natuklasan ni Danding ang kahalagahan ng lugar na pinagmulan ng kaniyang ama.",
      "Dahil naramdaman ni Danding ang malalim na ugnayan niya sa lupang sinilangan ng kaniyang ama at sa mga alaalang iniwan nito.",
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
