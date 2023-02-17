import Word from "../../models/Word.js";

class WordSeeder {
  static async seed() {
    await Word.query().delete();

    const wordsData = [
      { word: "computer" },
      { word: "polluter" },
      { word: "burn" },
      { word: "flowering fern" },
      { word: "twitter" },
      { word: "bitter" },
    ];

    await Word.query().insert(wordsData);

    console.log("Words seeded");
  }
}

export default WordSeeder;
