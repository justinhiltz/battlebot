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
      { word: "cigar" },
      { word: "rebar" },
      { word: "glory" },
      { word: "respiratory" },
      { word: "river" },
      { word: "caregiver" },
      { word: "rage" },
      { word: "cage" },
      { word: "circus" },
      { word: "work us" },
      { word: "cry" },
      { word: "awry" },
      { word: "dumb" },
      { word: "blue gum" },
      { word: "son" },
      { word: "ton" },
      { word: "goose" },
      { word: "break loose" },
      { word: "buy" },
      { word: "sly" },
      { word: "dust" },
      { word: "bust" },
      { word: "slapped" },
      { word: "chapped" },
      { word: "butt" },
      { word: "queensland nut" },
      { word: "butt" },
      { word: "king tut" },
      { word: "cakes" },
      { word: "outbreaks" },
      { word: "teacher" },
      { word: "hypothetical creature" },
      { word: "cape" },
      { word: "chardonnay grape" },
    ];

    await Word.query().insert(wordsData);

    console.log("Words seeded");
  }
}

export default WordSeeder;
