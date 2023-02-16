const Model = require("./Model.js");

class Battle extends Model {
  static get tableName() {
    return "battles";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        userId: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const { Verse, User } = require("./index.js");

    return {
      verses: {
        relation: Model.HasManyRelation,
        modelClass: Verse,
        join: {
          from: "battles.id",
          to: "verses.battleId",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "battles.userId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Battle;
