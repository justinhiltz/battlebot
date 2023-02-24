import express from "express";
import { Word, Verse, Sentence, Line, Rhyme, Battle } from "../../../models/index.js";
import VerseSerializer from "../../../serializers/VerseSerializer.js";
import LineSerializer from "../../../serializers/LineSerializer.js";

const versesRouter = new express.Router();

function replaceWordInLine(line, word) {
  return line.replace(/<\|REPLACE\|>/g, word);
}

versesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const verse = await Verse.query().findById(id);
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
    const serializedVerse = VerseSerializer.getDetails(verse);
    return res.status(200).json({ verse: serializedVerse });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

versesRouter.post("/", async (req, res) => {
  const { body } = req;
  const { word, lineId, currentUserId } = body;

  try {
    let battle;
    console.log(req.query);
    if (req.query?.battleId) {
      console.log("GETTING EXISTING BATTLE");

      battle = await Battle.query().findById(req.query?.battleId);
    } else {
      console.log("ADDING NEW BATTLE");
      battle = await Battle.query().insertAndFetch({ userId: currentUserId });
    }

    const newWord = await Word.query().insertAndFetch({ word });
    const line1 = await Line.query().findById(lineId);
    const sentence1 = await Sentence.query().insertAndFetch({
      lineId: line1.id,
      wordId: newWord.id,
    });
    const rhymedWord = await Rhyme.getRhyme(word);
    const saveRhymedWord = await Word.query().insertAndFetch({ word: rhymedWord.word });
    const line2 = await Line.query().orderByRaw("RANDOM()").first();
    const sentence2 = await Sentence.query().insertAndFetch({
      lineId: line2.id,
      wordId: saveRhymedWord.id,
    });
    const newVerse = await Verse.query().insertAndFetch({
      sentenceId1: sentence1.id,
      sentenceId2: sentence2.id,
      battleId: battle.id,
    });

    const completedSentence1 = replaceWordInLine(line1.line, newWord.word);
    const completedSentence2 = replaceWordInLine(line2.line, rhymedWord.word);
    newVerse.sentence1 = completedSentence1;
    newVerse.sentence2 = completedSentence2;

    // next verse creation
    const lines = await Line.query();
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    const serializedLine = LineSerializer.getDetails(randomLine);

    return res.status(201).json({ verse: newVerse, line: serializedLine, battleId: battle.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

export default versesRouter;
