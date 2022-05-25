/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('notifications').del()
  await knex('notifications').insert([
    {id: 1, title: 'Sample notification', body: 'This is a sample notification', user_id: 1}
  ]);
};
