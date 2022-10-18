/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = async (knex) => {
  console.info('running migration 20220717183449_create_projects');

  await knex.schema
    .createTable('projects', function (t) {
      t.string('id').unique().notNullable().primary();
      t.string('api_public_key', 255).unique().index().notNullable().defaultTo(knex.raw('gen_random_uuid()'));
      t.string('api_secret_key', 255).unique().notNullable().defaultTo(knex.raw('gen_random_uuid()'));
      t.boolean('enabled').defaultTo(true);
      t.timestamp('created_at').defaultTo(knex.fn.now());
    });

  await knex.raw(`grant select on table projects to system_user`);
  await knex.raw(`grant insert on table projects to system_user`);

  await knex.schema
    .alterTable('notifications', function (t) {
      t.string('project_id', 255).notNullable().defaultTo('default').index().references('id').inTable('projects');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.raw('drop table if exists projects cascade');

  await knex.schema.raw('drop owned by system_user')
};
