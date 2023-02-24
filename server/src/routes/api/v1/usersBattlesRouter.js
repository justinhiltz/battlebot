// make a router that gets all the battles for a user
import express from "express";
import { Battle } from "../../../models/index.js";
import BattleSerializer from "../../../serializers/BattleSerializer.js";

const usersBattlesRouter = new express.Router();

usersBattlesRouter.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const battles = await Battle.query().where({ userId: userId });
    const serializedBattles = battles.map((battle) => {
      return BattleSerializer.getDetails(battle);
    });
    return res.status(200).json({ battles: serializedBattles });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default usersBattlesRouter;
