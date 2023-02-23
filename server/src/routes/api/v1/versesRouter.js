import express from "express";
import { Word, Verse, Sentence, Line, Rhyme, Battle } from "../../../models/index.js";
import VerseSerializer from "../../../serializers/VerseSerializer.js";

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
    // console.log("Body:", body);
    // create the battle here
    const newBattle = await Battle.query().insertAndFetch({ userId: currentUserId });
    // console.log("Original body:", body);
    const newWord = await Word.query().insertAndFetch({ word });
    // console.log("newWord:", newWord);
    const line1 = await Line.query().findById(lineId);
    // console.log("line1 id:", line1.id);
    const sentence1 = await Sentence.query().insertAndFetch({
      lineId: line1.id,
      wordId: newWord.id,
    });
    // console.log("sentence1:", sentence1);

    const rhymedWord = await Rhyme.getRhyme(word);
    // console.log("rhymedWord:", rhymedWord);
    const saveRhymedWord = await Word.query().insertAndFetch({ word: rhymedWord.word });
    const line2 = await Line.query().orderByRaw("RANDOM()").first();
    // console.log("line2:", line2);
    const sentence2 = await Sentence.query().insertAndFetch({
      lineId: line2.id,
      wordId: saveRhymedWord.id,
    });
    // console.log("sentence2:", sentence2);

    const newVerse = await Verse.query().insertAndFetch({
      sentenceId1: sentence1.id,
      sentenceId2: sentence2.id,
      battleId: newBattle.id,
    });
    // console.log("newVerse:", newVerse);
    // console.log("Battle:", newBattle);

    // return res.status(201).json({ word: newWord, line: line, sentence: sentence });
    console.log("New verse:", newVerse);
    return res.status(201).json({ verse: newVerse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

export default versesRouter;
