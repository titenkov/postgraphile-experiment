const secrets = {
  system_user: {
    password: process.env.SYSTEM_PASSWORD || 'secret',
  },
  simple_user: {
    password: process.env.USER_PASSWORD || 'secret',
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 module.exports.up = async (knex, Promise) => {
  console.info('running migration 20220526103422_init');

  await knex.raw('create extension if not exists "uuid-ossp"');
  await knex.raw('create extension if not exists "pgcrypto"');

  await knex.schema
    .createTable('notifications', function (t) {
      t.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v1mc()')).primary();
      t.string('type', 255).notNullable();
      t.boolean('read').defaultTo(false);
      t.json('payload').notNullable();
      t.string('user_id').notNullable().index();
      t.timestamp('created_at').defaultTo(knex.fn.now());
      t.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    // Roles and grants
    await knex.raw(`create role anonymous`);
    await knex.raw(`create role simple_user login password '${secrets.simple_user.password}'`);
    await knex.raw(`create role system_user login password '${secrets.system_user.password}'`);

    await knex.raw(`grant usage on schema public to anonymous, simple_user, system_user`);
    await knex.raw(`grant update on table notifications to simple_user, system_user`);
    await knex.raw(`grant select on table notifications to simple_user, system_user`);
    await knex.raw(`grant insert on table notifications to system_user`);

    // Ensure that users can read only their own notifications
    await knex.raw(`alter table notifications enable row level security`);
    await knex.raw(`create policy select_notifications on notifications for select to simple_user, system_user using (user_id = current_setting('request.user_id', true)::text or 'system_user' = current_setting('role', true)::text)`);
    await knex.raw(`create policy update_notifications on notifications for update to simple_user, system_user using (user_id = current_setting('request.user_id', true)::text or 'system_user' = current_setting('role', true)::text)`);
    await knex.raw(`create policy insert_notifications_system on notifications for insert to system_user with check ('system_user' = current_setting('role', true)::text)`);

    await knex.raw(`
    create function graphql_subscription() returns trigger as $$
    declare
      v_event text = TG_ARGV[0];
      v_topic text = TG_ARGV[1];
    begin
      perform pg_notify(v_topic || new.user_id, json_build_object(
        'event', v_event,
        'subject', new.id,
        'user_id', new.user_id
      )::text);
      return new;
    end;
    $$ language plpgsql volatile set search_path from current;
    `);

    await knex.raw(`create trigger notification_created after insert on notifications for each row execute procedure graphql_subscription(
      'notification_created',  -- "event"
      'graphql:notifications:'   -- "topic"
    )`);

    await knex.raw(`
      create or replace function mark_all_as_read() returns setof notifications as $$
        update notifications set read = true where read = false RETURNING *;
      $$ language sql
    `);

    // await knex.raw(`create trigger _500_gql_update after update on notifications for each row execute procedure graphql_subscription('notificationsUpdated', 'graphql:notifications:$1', 'user_id')`)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.down = async (knex, Promise) => {
  await knex.raw('drop table if exists notifications cascade');

  await knex.schema.raw('drop owned by anonymous')
  await knex.schema.raw('drop owned by simple_user')
  await knex.schema.raw('drop owned by system_user')

  await knex.schema.raw('drop role if exists anonymous')
  await knex.schema.raw('drop role if exists simple_user')
  await knex.schema.raw('drop role if exists system_user')

  await knex.schema.raw('drop function graphql_subscription')
};
