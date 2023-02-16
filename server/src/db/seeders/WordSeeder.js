import Word from "../../models/Word.js";

class WordSeeder {
  static async seed() {
    await Word.query().delete();

    const wordsData = [
      { word: "computer" },
      { word: "polluter" },
      { word: "all" },
      { word: "ball" },
      { word: "truck" },
      { word: "awestruck" },
    ];

    await Word.query().insert(wordsData);

    console.log("Words seeded");
  }
}

export default WordSeeder;
