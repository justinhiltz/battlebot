import { Sentence } from "../../models/index.js";

class SentenceSeeder {
  static async seed() {
    await Sentence.query().delete();

    const sentencesData = [
      { lineId: 1, wordId: 1 },
      { lineId: 101, wordId: 2 },
      { lineId: 2, wordId: 3 },
      { lineId: 202, wordId: 4 },
      { lineId: 3, wordId: 5 },
      { lineId: 303, wordId: 6 },
      { lineId: 4, wordId: 7 },
      { lineId: 404, wordId: 8 },
      { lineId: 5, wordId: 9 },
      { lineId: 505, wordId: 10 },
      { lineId: 6, wordId: 11 },
      { lineId: 606, wordId: 12 },
      { lineId: 7, wordId: 13 },
      { lineId: 707, wordId: 14 },
      { lineId: 102, wordId: 15 },
      { lineId: 112, wordId: 16 },
      { lineId: 202, wordId: 17 },
      { lineId: 212, wordId: 18 },
      { lineId: 301, wordId: 19 },
      { lineId: 313, wordId: 20 },
      { lineId: 404, wordId: 21 },
      { lineId: 414, wordId: 22 },
      { lineId: 505, wordId: 23 },
      { lineId: 515, wordId: 24 },
      { lineId: 606, wordId: 25 },
      { lineId: 616, wordId: 26 },
      { lineId: 707, wordId: 27 },
      { lineId: 717, wordId: 28 },
      { lineId: 110, wordId: 29 },
      { lineId: 120, wordId: 30 },
      { lineId: 210, wordId: 31 },
      { lineId: 220, wordId: 32 },
      { lineId: 310, wordId: 33 },
      { lineId: 320, wordId: 34 },
      { lineId: 410, wordId: 35 },
      { lineId: 420, wordId: 36 },
      { lineId: 510, wordId: 37 },
      { lineId: 520, wordId: 38 },
      { lineId: 610, wordId: 39 },
      { lineId: 620, wordId: 40 },
    ];

    await Sentence.query().insert(sentencesData);

    console.log("Sentences seeded");
  }
}

export default SentenceSeeder;
