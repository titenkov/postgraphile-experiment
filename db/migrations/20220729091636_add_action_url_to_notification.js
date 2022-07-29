/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  console.info('running migration 20220729091636_add_action_url_to_notification');

  await knex.schema
    .table('notifications', function (t) {
      t.text('action_url');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.table("notifications", (t) => {
    t.dropColumn("action_url");
  });
};
