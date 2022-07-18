/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('notifications').del()
  await knex('notifications').insert([
    {type: 'entry-created', payload: {entryTitle: '001', stepTitle: 'New', folderTitle: 'Reports', user: 'Henry McCoy'}, user_id: 'beast~mailinator.com@marvel-x-men', read: true, project_id: 'default'},
    {type: 'entry-created', payload: {entryTitle: '001', stepTitle: 'New', folderTitle: 'Reports', user: 'Henry McCoy'}, user_id: 'angel~mailinator.com@marvel-x-men', read: false, project_id: 'default'},
    {type: 'entry-created', payload: {entryTitle: '002', stepTitle: 'New', folderTitle: 'Reports', user: 'Henry McCoy'}, user_id: 'beast~mailinator.com@marvel-x-men', read: true, project_id: 'default'},
    {type: 'entry-created', payload: {entryTitle: '002', stepTitle: 'New', folderTitle: 'Reports', user: 'Henry McCoy'}, user_id: 'angel~mailinator.com@marvel-x-men', read: false, project_id: 'default'},
    {type: 'entry-created', payload: {entryTitle: '003', stepTitle: 'New', folderTitle: 'Reports', user: 'Henry McCoy'}, user_id: 'beast~mailinator.com@marvel-x-men', read: true, project_id: 'default'},
    {type: 'entry-created', payload: {entryTitle: '003', stepTitle: 'New', folderTitle: 'Reports', user: 'Henry McCoy'}, user_id: 'angel~mailinator.com@marvel-x-men', read: false, project_id: 'default'},

    {type: 'entry-moved', payload: {entryTitle: '002', fromStepTitle: 'New', toStepTitle: 'Open', folderTitle: 'Reports', user: 'Angel' +
            ' Avening'}, user_id: 'angel~mailinator.com@marvel-x-men', read: false, project_id: 'default'},
    {type: 'entry-moved', payload: {entryTitle: '002', fromStepTitle: 'New', toStepTitle: 'Open', folderTitle: 'Reports', user: 'Angel' +
            ' Avening'}, user_id: 'beast~mailinator.com@marvel-x-men', read: false, project_id: 'default'},
    {type: 'entry-moved', payload: {entryTitle: '003', fromStepTitle: 'New', toStepTitle: 'Open', folderTitle: 'Reports', user: 'Emma' +
            ' Frost'}, user_id: 'angel~mailinator.com@marvel-x-men', read: false, project_id: 'default'},
    {type: 'entry-moved', payload: {entryTitle: '003', fromStepTitle: 'New', toStepTitle: 'Open', folderTitle: 'Reports', user: 'Emma' +
            ' Frost'}, user_id: 'beast~mailinator.com@marvel-x-men', read: false, project_id: 'default'},
  ]);
};
