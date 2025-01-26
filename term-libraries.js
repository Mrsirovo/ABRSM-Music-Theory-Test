console.log("术语库开始加载...");

const termLibraries = {
  '1': {
    textTerms: [
      // Dynamic terms
      { term: "fortissimo(ff)", definition: "very loud" },
      { term: "forte(f)", definition: "loud" },
      { term: "mezzo forte(mf)", definition: "moderately loud" },
      { term: "pianissimo(pp)", definition: "very quite" },
      { term: "piano(p)", definition: "quiet" },
      { term: "mezzo piano(mp)", definition: "moderately quiet" },
      { term: "crescendo(cresc.)", definition: "gradually getting louder" },
      { term: "decrescendo(decresc.)", definition: "gradually getting quiter" },
      { term: "diminuendo(dim.)", definition: "gradually getting quiter" },
      // Tempo terms
      { term: "allegro", definition: "quick" },
      { term: "allegretto", definition: "fairely quick" },
      { term: "moderato", definition: "at a moderate speed" },
      { term: "andante", definition: "at a medium speed" },
      { term: "adagio", definition: "slow" },
      { term: "accelerando(accel.)", definition: "gradually getting quicker" },
      { term: "rallentando(rall.)", definition: "gradually getting slower" },
      { term: "ritardando(ritard. or rit.)", definition: "gradually getting slower" },
      { term: "a tempo", definition: "in time (resume the original speed)" },
      // More
      { term: "contabile", definition: "in a singing style" },
      { term: "da capo(D.C.)", definition: "repeat from the beginning" },
      { term: "dolce", definition: "sweet" },
      { term: "fine", definition: "the end" },
      { term: "al fine", definition: "up to the end" },
      { term: "legato", definition: "smoothly" },
      { term: "staccato(stacc.)", definition: "detached" },
    ],
    imageTerms: [
      { term: "crescendo", definition: "gradually getting louder", image: "images/crescendo.png" },
      { term: "decrescendo", definition: "gradually getting quiter", image: "images/decrescendo.png" },
      { term: "accent", definition: "accent the note (play with emphasis)", image: "images/accent.png" },
      { term: "高音号", definition: "G谱号", image: "images/clef1.png" },
    ],
  },
  '2': {
    textTerms: [
      { term: "三连音", definition: "𝅘𝅥𝅘𝅥𝅘𝅥" },
      { term: "调号", definition: "♭" },
      { term: "调号", definition: "♭" },
      { term: "调号", definition: "♭" },
    ],
    imageTerms: [
      { term: "降号", definition: "♭", image: "images/flat.png" },
      { term: "升号", definition: "♯", image: "images/sharp.png" },
      { term: "升号", definition: "♯", image: "images/sharp.png" },
      { term: "升号", definition: "♯", image: "images/sharp.png" },
    ],
  },
  // 其他等级...
};

console.log("术语库加载完成，可用等级:", Object.keys(termLibraries));