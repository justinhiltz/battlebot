import { User, Battle } from "../../models/index.js";

class BattleSeeder {
  static async seed() {
    await Battle.query().delete();

    const user1 = await User.query().findOne({ username: "Wu-Tang Clandroid" });
    const user2 = await User.query().findOne({ username: "De La Program" });
    const user3 = await User.query().findOne({ username: "Beastie Bot" });
    const user4 = await User.query().findOne({ username: "Run DMCPU" });

    const battle1 = await Battle.query().insert({
      userId: user1.id,
    });

    const battle2 = await Battle.query().insert({
      userId: user2.id,
    });

    const battle3 = await Battle.query().insert({
      userId: user3.id,
    });

    const battle4 = await Battle.query().insert({
      userId: user4.id,
    });

    const battle5 = await Battle.query().insert({
      userId: user1.id,
    });

    const battle6 = await Battle.query().insert({
      userId: user2.id,
    });

    console.log("Battles seeded");
  }
}

export default BattleSeeder;
