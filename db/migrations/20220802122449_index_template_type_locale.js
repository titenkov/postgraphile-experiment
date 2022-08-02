/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  console.info('running migration 20220802122449_index_template_type_locale');

  await knex.schema.table('templates', function (t) {
      t.index(['type', 'locale']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.table('templates', function (t) {
      t.dropIndex(['type', 'locale']);
    });
};
