import { User, Battle } from "../../models/index.js";

class BattleSeeder {
  static async seed() {
    await Battle.query().delete();

    const user1 = await User.query().findOne({ username: "Wu-Tang Clandroid" });

    const battle1 = await Battle.query().insert({
      userId: user1.id,
    });
  }
}

export default BattleSeeder;
