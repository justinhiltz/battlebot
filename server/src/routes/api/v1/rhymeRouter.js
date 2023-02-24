import express from "express";
import Rhyme from "../../../models/Rhyme.js";
import RhymeSerializer from "../../../serializers/RhymeSerializer.js";

const rhymeRouter = new express.Router();

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
