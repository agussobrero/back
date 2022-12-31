/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("mensajes", table => {
    table.string("email",255).notNullable()
    table.string("mensaje",255).notNullable()
    table.increments("id").primary().notNullable
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("mensajes")
};
