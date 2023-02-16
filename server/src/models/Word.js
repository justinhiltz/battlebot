const Model = require("./Model.js");

class Word extends Model {
  static get tableName() {
    return "words";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["word"],
      properties: {
        id: { type: "integer" },
        word: { type: "string", minLength: 1, maxLength: 255 },
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
          from: "words.id",
          to: "sentences.wordId",
        },
      },
    };
  }
}

module.exports = Word;
