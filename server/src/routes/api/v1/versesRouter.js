import got from "got";
import express from "express";
import Verse from "../../../models/Verse.js";
import VerseSerializer from "../../../serializers/VerseSerializer.js";

const versesRouter = new express.Router();

versesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const verse = await Verse.query().findById(id);
    const sentence1 = await got(`http://localhost:3000/api/v1/sentences/${verse.sentenceId1}`);
    const parsedSentence1 = JSON.parse(sentence1.body);
    const sentence2 = await got(`http://localhost:3000/api/v1/sentences/${verse.sentenceId2}`);
    const parsedSentence2 = JSON.parse(sentence2.body);
    verse.sentence1 = parsedSentence1.sentence.completeSentence;
    verse.sentence2 = parsedSentence2.sentence.completeSentence;
    const serializedVerse = VerseSerializer.getDetails(verse);
    return res.status(200).json({ verse: serializedVerse });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default versesRouter;
