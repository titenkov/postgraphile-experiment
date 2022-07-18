/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('projects').del()
  await knex('projects').insert([
    {id: 'default', api_public_key: '114ee1da-067b-11ed-be0f-6f24634ae754', api_secret_key: '114ee22a-067b-11ed-be0f-079d8f6dbc6b'},
  ]);
};
