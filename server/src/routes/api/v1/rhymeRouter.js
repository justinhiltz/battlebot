import express from "express";
import Rhyme from "../../../models/Rhyme.js";
import RhymeSerializer from "../../../serializers/RhymeSerializer.js";

const rhymeRouter = new express.Router();

// leave this to test for edge cases in the event of errors or to possibly allow users to choose a word
/* rhymeRouter.get("/:word", async (req, res) => {
  const word = req.params.word;
  try {
    const rhyme = await Rhyme.getRhyme(word);
    return res.status(200).json({ rhyme: rhyme });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
}); */

rhymeRouter.get("/:word", async (req, res) => {
  const word = req.params.word;
  try {
    const rhymes = await Rhyme.getRhyme(word);
    const randomRhyme = rhymes[Math.floor(Math.random() * rhymes.length)];
    const serializedRhyme = RhymeSerializer.getSummary(randomRhyme);
    return res.status(200).json({ rhyme: serializedRhyme });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default rhymeRouter;
