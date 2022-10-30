/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  console.info('running migration 20221030094251_grant_role_permissions');

  // The `grant` gives permission to use SET ROLE to switch to that role from the current `DB_USER`
  // That is required, since transactions are executed in the context of the role, not the `DB_USER`
  // Note: it works fine without this fix, when `postgres` is run in the docker image, but not
  // when service is using cloud postgres solutions (RDS, Azure, etc.)
  await knex.raw(`grant anonymous to ${process.env.DB_USER}`);
  await knex.raw(`grant simple_user to ${process.env.DB_USER}`);
  await knex.raw(`grant system_user to ${process.env.DB_USER}`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  
};
