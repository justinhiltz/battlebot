const tableName = "verses";

/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  const tableExists = await knex.schema.hasTable(tableName);

  if (!tableExists) {
    console.log(`Creating ${tableName}`);
    return knex.schema.createTable(tableName, (table) => {
      table.bigIncrements("id");
      table
        .bigInteger("sentenceId1")
        .unsigned()
        .notNullable()
        .index()
        .references("id")
        .inTable("sentences");
      table
        .bigInteger("sentenceId2")
        .unsigned()
        .notNullable()
        .index()
        .references("id")
        .inTable("sentences");
      table
        .bigInteger("battleId")
        .unsigned()
        .notNullable()
        .index()
        .references("id")
        .inTable("battles");
      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    });
  }

  console.log(`${tableName} already exists; skipping`);
  return 5;
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  console.log(`Rolling back ${tableName}`);
  return knex.schema.dropTableIfExists(tableName);
};
