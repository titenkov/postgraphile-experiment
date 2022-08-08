/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  console.info('running migration 20220808125946_make_payload_nullable');

  await knex.schema.alterTable('notifications', t => {
    t.json('payload').nullable().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.alterTable('notifications', t => {
    t.json('payload').notNullable().alter({alterNullable : false});
  });
};
