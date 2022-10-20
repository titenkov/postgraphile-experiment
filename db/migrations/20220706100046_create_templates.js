/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  console.info('running migration 20220706100046_create_templates');

  await knex.schema
    .createTable('templates', function (t) {
      t.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v1mc()')).primary();
      t.string('type', 255).notNullable();
      t.string('locale', 5).defaultTo('en-GB');
      t.string('content', 255).notNullable();
    });

  await knex.raw(`grant select on table templates to simple_user, system_user`);
  await knex.raw(`grant insert on table templates to system_user`);
  await knex.raw(`grant update on table templates to system_user`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.raw('drop table if exists templates cascade');

  await knex.schema.raw('drop owned by system_user')
};
