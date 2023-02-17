import { Sentence } from "../../models/index.js";

class SentenceSeeder {
  static async seed() {
    await Sentence.query().delete();

    const sentencesData = [
      { lineId: 1, wordId: 1 },
      { lineId: 2, wordId: 2 },
      { lineId: 3, wordId: 3 },
      { lineId: 4, wordId: 4 },
      { lineId: 5, wordId: 5 },
      { lineId: 6, wordId: 6 },
    ];

    await Sentence.query().insert(sentencesData);

    console.log("Sentences seeded");
  }
}

export default SentenceSeeder;
