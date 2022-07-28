/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('notifications').del()
  await knex('notifications').insert([
    {type: 'entry-created', payload: {entry: '001', step: 'New', folder: 'Reports', user: 'Henry McCoy'},
      user_id: 'beast~mailinator.com@marvel-x-men', read: true, project_id: 'default'},
    {type: 'entry-created', payload: {entry: '001', step: 'New', folder: 'Reports', user: 'Henry McCoy'},
      user_id: 'angel~mailinator.com@marvel-x-men', read: false, project_id: 'default'},
    {type: 'entry-created', payload: {entry: '002', step: 'New', folder: 'Reports', user: 'Henry McCoy'},
      user_id: 'beast~mailinator.com@marvel-x-men', read: true, project_id: 'default'},
    {type: 'entry-created', payload: {entry: '002', step: 'New', folder: 'Reports', user: 'Henry McCoy'},
      user_id: 'angel~mailinator.com@marvel-x-men', read: false, project_id: 'default'},
    {type: 'entry-created', payload: {entry: '003', step: 'New', folder: 'Reports', user: 'Henry McCoy'},
      user_id: 'beast~mailinator.com@marvel-x-men', read: true, project_id: 'default'},
    {type: 'entry-created', payload: {entry: '003', step: 'New', folder: 'Reports', user: 'Henry McCoy'},
      user_id: 'angel~mailinator.com@marvel-x-men', read: false, project_id: 'default'},

    {type: 'entry-moved', payload: {entry: '002', from_step: 'New', to_step: 'Open', folder: 'Reports', user: 'Angel Avening'},
      user_id: 'angel~mailinator.com@marvel-x-men', read: false, project_id: 'default'},
    {type: 'entry-moved', payload: {entry: '002', from_step: 'New', to_step: 'Open', folder: 'Reports', user: 'Angel Avening'},
      user_id: 'beast~mailinator.com@marvel-x-men', read: false, project_id: 'default'},
    {type: 'entry-moved', payload: {entry: '003', from_step: 'New', to_step: 'Open', folder: 'Reports', user: 'Emma Frost'},
      user_id: 'angel~mailinator.com@marvel-x-men', read: false, project_id: 'default'},
    {type: 'entry-moved', payload: {entry: '003', from_step: 'New', to_step: 'Open', folder: 'Reports', user: 'Emma Frost'},
      user_id: 'beast~mailinator.com@marvel-x-men', read: false, project_id: 'default'},
  ]);
};
