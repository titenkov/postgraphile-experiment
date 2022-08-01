/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('templates').del()
  await knex('templates').insert([
    { type: 'entry-created', locale: 'en-GB', content: 'The entry {{ entry }} in {{ step }} was created in {{ folder }} by {{ user }}.'},
    { type: 'entry-created', locale: 'nb-NO', content: 'Oppføringen {{ entry }} i {{ step }} ble opprettet i {{ folder }} av {{ user }}.'},
    { type: 'entry-created', locale: 'sv-SE', content: 'Posten {{ entry }} i {{ step }} har skapats i {{ folder }} av {{ user }}.'},
    { type: 'entry-moved', locale: 'en-GB', content: 'The entry {{ entry }} in {{ folder }} was moved from step {{ from_step }} to step {{ to_step }} by {{ user }}.'},
    { type: 'entry-moved', locale: 'nb-NO', content: 'Oppføringen {{ entry }} i {{ folder }} ble flyttet fra steg {{ from_step }} til steg {{ to_step }} av {{ user }}.'},
    { type: 'entry-moved', locale: 'sv-SE', content: 'Posten {{ entry }} i {{ folder }} har flyttats från steg {{ from_step }} till steg {{ to_step }} av {{ user }}.'},
  ]);
};
