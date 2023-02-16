/* eslint-disable no-console */
import { connection } from "../boot.js";

import UserSeeder from "./seeders/UserSeeder.js";
import BattleSeeder from "./seeders/BattleSeeder.js";
import WordSeeder from "./seeders/WordSeeder.js";
import LineSeeder from "./seeders/LineSeeder.js";
import SentenceSeeder from "./seeders/SentenceSeeder.js";
import VerseSeeder from "./seeders/VerseSeeder.js";

class Seeder {
  static async seed() {
    console.log("Seeding users...");
    await UserSeeder.seed();

    console.log("Seeding battles...");
    await BattleSeeder.seed();

    console.log("Seeding words...");
    await WordSeeder.seed();

    console.log("Seeding lines...");
    await LineSeeder.seed();

    console.log("Seeding sentences...");
    await SentenceSeeder.seed();

    console.log("Seeding verses...");
    await VerseSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
