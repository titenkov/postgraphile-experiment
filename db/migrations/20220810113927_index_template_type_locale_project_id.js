/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  console.info('running migration 20220810113927_index_template_type_locale_project_id');

  await knex.schema.table('templates', function (t) {
    t.unique(['type', 'locale', 'project_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.table('templates', function (t) {
    t.dropUnique(['type', 'locale', 'project_id']);
  });
};
