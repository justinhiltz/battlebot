const Model = require("./Model.js");

class Sentence extends Model {
  static get tableName() {
    return "sentences";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["wordId", "lineId"],
      properties: {
        id: { type: "integer" },
        wordId: { type: "integer" },
        lineId: { type: "integer" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Word, Line } = require("./index.js");

    return {
      word: {
        relation: Model.BelongsToOneRelation,
        modelClass: Word,
        join: {
          from: "sentences.wordId",
          to: "words.id",
        },
      },
      line: {
        relation: Model.BelongsToOneRelation,
        modelClass: Line,
        join: {
          from: "sentences.lineId",
          to: "lines.id",
        },
      },
    };
  }
}

module.exports = Sentence;
