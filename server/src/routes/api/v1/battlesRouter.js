import got from "got";
import express from "express";
import Battle from "../../../models/Battle.js";
import BattleSerializer from "../../../serializers/BattleSerializer.js";

const battlesRouter = new express.Router();

battlesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const battle = await Battle.query().findById(id);
    battle.verses = await battle.$relatedQuery("verses");
    const user = await got(`http://localhost:3000/api/v1/users/${battle.userId}`);
    const parsedUser = JSON.parse(user.body);
    battle.username = parsedUser.user.username;
    const pulledVerses = [];
    for (const verse of battle.verses) {
      const response = await got(`http://localhost:3000/api/v1/verses/${verse.id}`);
      const parsedVerse = JSON.parse(response.body);
      pulledVerses.push(parsedVerse.verse);
    }
    battle.verses = pulledVerses;
    const serializedBattle = BattleSerializer.getDetails(battle);
    return res.status(200).json({ battle: serializedBattle });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default battlesRouter;
