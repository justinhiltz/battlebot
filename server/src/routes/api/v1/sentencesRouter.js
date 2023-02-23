import express from "express";
import Sentence from "../../../models/Sentence.js";
import SentenceSerializer from "../../../serializers/SentenceSerializer.js";
import LineSerializer from "../../../serializers/LineSerializer.js";
import WordSerializer from "../../../serializers/WordSerializer.js";

const sentencesRouter = new express.Router();

function replaceWordInLine(line, word) {
  return line.replace(/<\|REPLACE\|>/g, word);
}

sentencesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const sentence = await Sentence.query().findById(id);
    sentence.lineId = await sentence.$relatedQuery("line");
    sentence.lineId = LineSerializer.getDetails(sentence.lineId);
    sentence.wordId = await sentence.$relatedQuery("word");
    sentence.wordId = WordSerializer.getDetails(sentence.wordId);
    const updatedLine = replaceWordInLine(sentence.lineId.line, sentence.wordId.word);
    sentence.completeSentence = updatedLine;
    const serializedSentence = SentenceSerializer.getDetails(sentence);
    res.status(200).json({ sentence: serializedSentence });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

sentencesRouter.post("/", async (req, res) => {
  const { body } = req;
  try {
    const newSentence = await Sentence.query().insertAndFetch(body);
    return res.status(201).json({ sentence: newSentence });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

export default sentencesRouter;
