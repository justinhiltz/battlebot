const Model = require("./Model.js");

class Line extends Model {
  static get tableName() {
    return "lines";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["line"],
      properties: {
        id: { type: "integer" },
        line: { type: "string", minLength: 1, maxLength: 255 },
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
          from: "lines.id",
          to: "sentences.lineId",
        },
      },
    };
  }
}

module.exports = Line;
