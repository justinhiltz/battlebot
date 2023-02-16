import { User, Battle } from "../../models/index.js";

class BattleSeeder {
  static async seed() {
    await Battle.query().delete();

    // const user1 = await User.query().findOne({ username: "Wu-Tang Clandroid" });
    // console.log(user1);

    const Battle1 = await Battle.query().insert({
      userId: 1,
    });
  }
}

export default BattleSeeder;
