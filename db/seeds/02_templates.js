/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('templates').del()
  await knex('templates').insert([
    {type: 'entry-created', locale: 'en-GB', content: 'The entry {entryTitle} in {stepTitle} was created in {folderTitle} by {user}.'},
    {type: 'entry-created', locale: 'nb-NO', content: 'Oppføringen {entryTitle} i {stepTitle} ble opprettet i {folderTitle} av {user}.'},
    {type: 'entry-created', locale: 'sv-SE', content: 'Posten {entryTitle} i {stepTitle} har skapats i {folderTitle} av {user}.'},
    {type: 'entry-moved', locale: 'en-GB', content: 'The entry {entryTitle} in {folderTitle} was moved from step {fromStepTitle} to step {toStepTitle} by {user}.'},
    {type: 'entry-moved', locale: 'nb-NO', content: 'Oppføringen {entryTitle} i {folderTitle} ble flyttet fra steg {fromStepTitle} til steg {toStepTitle} av {user}.'},
    {type: 'entry-moved', locale: 'sv-SE', content: 'Posten {entryTitle} i {folderTitle} har flyttats från steg {fromStepTitle} till steg {toStepTitle} av {user}.'},
  ]);
};
