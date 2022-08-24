/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  console.info('running migration 20220810095330_add_project_id_reference_to_templates');

  await knex.schema
    .alterTable('templates', function (t) {
      t.string('project_id', 255).notNullable().defaultTo('default').index().references('id').inTable('projects');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
    .alterTable('templates', function (t) {
      t.dropColumn('project_id');
    });
};
