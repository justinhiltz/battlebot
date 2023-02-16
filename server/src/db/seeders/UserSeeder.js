import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    await User.query().delete();

    const User1 = await User.query().insert({
      username: "Wu-Tang Clandroid",
      email: "downfrom@the36chambers.com",
      cryptedPassword: "1234",
    });
    const User2 = await User.query().insert({
      username: "De La Program",
      email: "ripTrugoy@thedove.com",
      cryptedPassword: "1234",
    });
    const User3 = await User.query().insert({
      username: "Beastie Bot",
      email: "license@ill.com",
      cryptedPassword: "1234",
    });
    const User4 = await User.query().insert({
      username: "Run DMCPU",
      email: "rev@run.com",
      cryptedPassword: "1234",
    });
    const User5 = await User.query().insert({
      username: "Notorious C.O.D.E.",
      email: "loveitwhenyoucallme@bigpoppa.com",
      cryptedPassword: "1234",
    });
    const User6 = await User.query().insert({
      username: "Missy Electrical",
      email: "garbagebagchic@trashmangrn.com",
      cryptedPassword: "1234",
    });
    const User7 = await User.query().insert({
      username: "Tech N9ne-volt",
      email: "horrorrap@probably.com",
      cryptedPassword: "1234",
    });
    const User8 = await User.query().insert({
      username: "A Tribe Called Tech",
      email: "qtip@foryourears.com",
      cryptedPassword: "1234",
    });

    console.log("Users seeded");
  }
}

export default UserSeeder;
