import express from "express";
import Line from "../../../models/Line.js";
import LineSerializer from "../../../serializers/LineSerializer.js";

const linesRouter = new express.Router();

linesRouter.get("/", async (req, res) => {
  try {
    const lines = await Line.query();
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    const serializedLine = LineSerializer.getDetails(randomLine);
    return res.status(200).json({ line: serializedLine });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

linesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const line = await Line.query().findById(id);
    const serializedLine = LineSerializer.getDetails(line);
    return res.status(200).json({ line: serializedLine });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default linesRouter;
