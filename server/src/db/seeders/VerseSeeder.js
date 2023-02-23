import { Verse, Battle } from "../../models/index.js";

class VerseSeeder {
  static async seed() {
    await Verse.query().delete();

    const versesData = [
      { sentenceId1: 1, sentenceId2: 2, battleId: 1 },
      { sentenceId1: 3, sentenceId2: 4, battleId: 1 },
      { sentenceId1: 5, sentenceId2: 6, battleId: 1 },
    ];

    await Verse.query().insert(versesData);

    console.log("Verses seeded");
  }
}

export default VerseSeeder;
