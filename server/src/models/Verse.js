const Model = require("./Model.js");

class Verse extends Model {
  static get tableName() {
    return "verses";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["sentenceId1", "sentenceId2"],
      properties: {
        id: { type: "integer" },
        sentenceId1: { type: "integer" },
        sentenceId2: { type: "integer" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const Sentence = require("./Sentence.js");

    return {
      sentences: {
        relation: Model.HasManyRelation,
        modelClass: Sentence,
        join: {
          from: "verses.id",
          to: "sentences.verseId",
        },
      },
    };
  }
}

module.exports = Verse;
