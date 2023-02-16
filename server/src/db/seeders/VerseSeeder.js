import { Verse, Battle } from "../../models/index.js";

class VerseSeeder {
  static async seed() {
    await Verse.query().delete();

    const Battle1 = await Battle.query().findOne({ id: 1 });

    const versesData = [
      { sentenceId1: 1, sentenceId2: 2, battleId: Battle1.id },
      { sentenceId1: 3, sentenceId2: 4, battleId: Battle1.id },
      { sentenceId1: 5, sentenceId2: 6, battleId: Battle1.id },
    ];

    await Verse.query().insert(versesData);

    console.log("Verses seeded");
  }
}

export default VerseSeeder;
