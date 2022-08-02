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
    { type: 'assignee', locale: 'en-GB', content: 'You have been set as responsible for the entry {{ entry }} in folder {{ folder }}.' +
        ' {%if due_date %}The entry has a due date: {{ due_date|date(\'en-GB\') }}.{% else %}The entry has no due date.{% endif %}'},
    { type: 'assignee', locale: 'nb-NO', content: 'Du har blitt satt som ansvarlig for oppføringen {{ entry }} i mappen {{ folder }}.' +
        ' {%if due_date %}Oppføringen inneholder en tidsfrist: {{ due_date|date(\'nb-NO\') }}.{% else %}Oppføringen inneholder ingen tidsfrist.{% endif %}'},
    { type: 'assignee', locale: 'sv-SE', content: 'Du har tilldelats posten {{ entry }} i mappen {{ folder }}.' +
        ' {%if due_date %}Posten innehåller en tidsfrist: {{ due_date|date(\'sv-SE\') }}.{% else %}Posten innehåller inte en tidsfrist.{% endif %}'},
  ]);
};
