/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  console.info('running migration 20220825120314_make_template_content_not_nullable');

  await knex.schema.alterTable('templates', t => {
    t.text('content').notNullable().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.alterTable('templates', t => {
    t.text('content').nullable().alter();
  });
};
