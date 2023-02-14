import express from "express";
import Rhyme from "../../models/Rhyme.js";

const rhymeRouter = new express.Router();

rhymeRouter.get("/", async (req, res) => {
  try {
    const rhyme = await Rhyme.getRhyme();
    return res.status(200).json({ rhyme: rhyme });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default rhymeRouter;
