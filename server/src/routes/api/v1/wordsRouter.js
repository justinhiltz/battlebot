import express from "express";
import Word from "../../../models/Word.js";
import WordSerializer from "../../../serializers/WordSerializer.js";

const wordsRouter = new express.Router();

wordsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const word = await Word.query().findById(id);
    const serializedWord = WordSerializer.getDetails(word);
    return res.status(200).json({ word: serializedWord });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default wordsRouter;
