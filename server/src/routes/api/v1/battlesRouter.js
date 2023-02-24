import express from "express";
import objection from "objection";
import { Battle, User, Sentence } from "../../../models/index.js";
import BattleSerializer from "../../../serializers/BattleSerializer.js";
const { ValidationError } = objection;

const battlesRouter = new express.Router();

function replaceWordInLine(line, word) {
  return line.replace(/<\|REPLACE\|>/g, word);
}

battlesRouter.get("/", async (req, res) => {
  try {
    const battles = await Battle.query();
    const serializedBattles = battles.map((battle) => {
      return BattleSerializer.getDetails(battle);
    });
    return res.status(200).json({ battles: serializedBattles });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

battlesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const battle = await Battle.query().findById(id);
    battle.verses = await battle.$relatedQuery("verses");
    const user = await User.query().findById(battle.userId);
    battle.username = user.username;

    const Verses = await battle.$relatedQuery("verses");
    for (const verse of Verses) {
      const sentence1 = await Sentence.query().findById(verse.sentenceId1);
      sentence1.lineId = await sentence1.$relatedQuery("line");
      sentence1.wordId = await sentence1.$relatedQuery("word");
      const updatedSentence1 = replaceWordInLine(sentence1.lineId.line, sentence1.wordId.word);
      sentence1.completeSentence = updatedSentence1;
      const sentence2 = await Sentence.query().findById(verse.sentenceId2);
      sentence2.lineId = await sentence2.$relatedQuery("line");
      sentence2.wordId = await sentence2.$relatedQuery("word");
      const updatedSentence2 = replaceWordInLine(sentence2.lineId.line, sentence2.wordId.word);
      sentence2.completeSentence = updatedSentence2;
      verse.sentence1 = sentence1.completeSentence;
      verse.sentence2 = sentence2.completeSentence;
    }
    battle.verses = Verses;
    const serializedBattle = BattleSerializer.getDetails(battle);
    return res.status(200).json({ battle: serializedBattle });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

battlesRouter.post("/", async (req, res) => {
  const { title, userId } = req.body;
  console.log(req.body);
  try {
    const newBattle = await Battle.query().insertAndFetch({ title, userId });
    return res.status(201).json({ battle: newBattle });
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(error.data);
      return res.status(422).json({ errors: error.data });
    }
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

export default battlesRouter;
