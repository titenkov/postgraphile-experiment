/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  console.info('running migration 20220801090858_change_template_content_type');

  await knex.schema
    .alterTable('templates', function (t) {
      t.text('content').alter();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
    .alterTable('templates', function (t) {
      t.string('content', 255).alter();
    });
};
