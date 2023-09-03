import { mkdir, writeFile } from "fs/promises";

const commonSegments = {
  Iron: 1000,
  Bronze: 2000,
  Silver: 3000,
  Gold: 4000,
  Platinum: 5000,
  Sapphire: 6000,
  Ruby: 7000,
  Diamond: 8000,
  Master: 9000,
  Grandmaster: 10000,
};

const scoreSaberV3Curve = [
  [0.0, 0.0],
  [0.6, 0.18223233667439062],
  [0.65, 0.5866010012767576],
  [0.7, 0.6125565959114954],
  [0.75, 0.6451808210101443],
  [0.8, 0.6872268862950283],
  [0.825, 0.7150465663454271],
  [0.85, 0.7462290664143185],
  [0.875, 0.7816934560296046],
  [0.9, 0.825756123560842],
  [0.91, 0.8488375988124467],
  [0.92, 0.8728710341448851],
  [0.93, 0.9039994071865736],
  [0.94, 0.9417362980580238],
  [0.95, 1.0],
  [0.955, 1.0388633331418984],
  [0.96, 1.0871883573850478],
  [0.965, 1.1552120359501035],
  [0.97, 1.2485807759957321],
  [0.9725, 1.3090333065057616],
  [0.975, 1.3807102743105126],
  [0.9775, 1.4664726399289512],
  [0.98, 1.5702410055532239],
  [0.9825, 1.697536248647543],
  [0.985, 1.8563887693647105],
  [0.9875, 2.058947159052738],
  [0.99, 2.324506282149922],
  [0.99125, 2.4902905794106913],
  [0.9925, 2.685667856592722],
  [0.99375, 2.9190155639254955],
  [0.995, 3.2022017597337955],
  [0.99625, 3.5526145337555373],
  [0.9975, 3.996793606763322],
  [0.99825, 4.325027383589547],
  [0.999, 4.715470646416203],
  [0.9995, 5.019543595874787],
  [1.0, 5.367394282890631],
];

const scoreSaberModifiersOverride = {
  DisappearingArrows: 1,
  FasterSong: 1,
  GhostNotes: 1,
  SuperFastSong: 1,
};

function scoreSaberV3Regulation(mapSet: string) {
  return {
    version: 1,
    title: `ScoreSaber No Restriction ${mapSet}`,
    description: `<size=150%><#ffff66>ScoreSaber No Restriction<size=100%><#ffffff>\nA regulation with the exact same rules and map set as ScoreSaber! Try to see how much pp you can earn in the real ScoreSaber within a certain time.\n\nMap set updated at ${mapSet} where most recent ranked maps are excluded`,
    rules: {
      mapSet: `scoresaber/${mapSet}.json`,
      base: 42.113,
      curve: scoreSaberV3Curve,
      weight: 0.965,
      segments: commonSegments,
      modifiersOverride: scoreSaberModifiersOverride,
    },
  };
}

const yearAndMonth = new Date()
  .toLocaleDateString("UTC", { year: "numeric", month: "2-digit" })
  .split("/")
  .join("");

{
  const dest = scoreSaberV3Regulation(yearAndMonth);
  await mkdir("scoresaber", { recursive: true });
  await writeFile(`scoresaber/${yearAndMonth}.json`, JSON.stringify(dest, null, 2));
}

const latestRegulations = {
  regulations: [
    `scoresaber/${yearAndMonth}.json`,
  ]
};
await writeFile(`latest-regulations.json`, JSON.stringify(latestRegulations, null, 2));
