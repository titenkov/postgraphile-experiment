/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('notifications').del()
  await knex('notifications').insert([
    {type: 'share', payload: {test: 'test'}, user_id: 'beast~mailinator.com'},
    {type: 'share', payload: {test: 'test'}, user_id: 'angel~mailinator.com'},
    {type: 'entry-created', payload: {test: 'test'}, user_id: 'beast~mailinator.com'},
    {type: 'entry-updated', payload: {test: 'test'}, user_id: 'angel~mailinator.com'},
    {type: 'entry-created', payload: {test: 'test'}, user_id: 'beast~mailinator.com'},
  ]);
};
