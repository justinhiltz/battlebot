const Model = require("./Model.js");

class Verse extends Model {
  static get tableName() {
    return "verses";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["sentenceId1", "sentenceId2", "battleId"],
      properties: {
        id: { type: ["integer", "string"] },
        sentenceId1: { type: ["integer", "string"] },
        sentenceId2: { type: ["integer", "string"] },
        battleId: { type: ["integer", "string"] },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Sentence, Battle } = require("./index.js");

    return {
      sentences: {
        relation: Model.HasManyRelation,
        modelClass: Sentence,
        join: {
          from: "verses.id",
          to: "sentences.verseId",
        },
      },
      battle: {
        relation: Model.BelongsToOneRelation,
        modelClass: Battle,
        join: {
          from: "verses.battleId",
          to: "battles.id",
        },
      },
    };
  }
}

module.exports = Verse;
