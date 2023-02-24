import { Verse, Battle } from "../../models/index.js";

class VerseSeeder {
  static async seed() {
    await Verse.query().delete();

    const versesData = [
      { sentenceId1: 1, sentenceId2: 2, battleId: 1 },
      { sentenceId1: 3, sentenceId2: 4, battleId: 1 },
      { sentenceId1: 5, sentenceId2: 6, battleId: 1 },
      { sentenceId1: 7, sentenceId2: 8, battleId: 2 },
      { sentenceId1: 9, sentenceId2: 10, battleId: 2 },
      { sentenceId1: 11, sentenceId2: 12, battleId: 2 },
      { sentenceId1: 13, sentenceId2: 14, battleId: 3 },
      { sentenceId1: 15, sentenceId2: 16, battleId: 3 },
      { sentenceId1: 17, sentenceId2: 18, battleId: 3 },
      { sentenceId1: 19, sentenceId2: 20, battleId: 3 },
      { sentenceId1: 21, sentenceId2: 22, battleId: 4 },
      { sentenceId1: 23, sentenceId2: 24, battleId: 4 },
      { sentenceId1: 25, sentenceId2: 26, battleId: 4 },
      { sentenceId1: 27, sentenceId2: 28, battleId: 5 },
      { sentenceId1: 29, sentenceId2: 30, battleId: 5 },
      { sentenceId1: 31, sentenceId2: 32, battleId: 5 },
      { sentenceId1: 33, sentenceId2: 34, battleId: 6 },
      { sentenceId1: 35, sentenceId2: 36, battleId: 6 },
      { sentenceId1: 37, sentenceId2: 38, battleId: 6 },
      { sentenceId1: 39, sentenceId2: 40, battleId: 6 },
    ];

    await Verse.query().insert(versesData);

    console.log("Verses seeded");
  }
}

export default VerseSeeder;
