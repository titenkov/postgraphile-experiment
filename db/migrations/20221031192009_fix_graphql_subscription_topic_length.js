/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  console.info('20221031192009_fix_graphql_subscription_topic_length');

  // This migration is fixing the pg_notify issue with the long usernames. Events of pg_notify are
  // sent via a channel, which is limited to 63 characters in length (this is a PostgreSQL limitation).
  // The current structure of the channel topic name is `graphql:notifications:<username>` and it means
  // that whenever username is bigger than 41 characters, postgres will throw an exception.
  // To fix this issue the following migration is made: instead of using usernames in the topic name,
  // we will use the fix length md5 hash of the username. The md5 algorithm guarantees that we will not
  // exceed the postgres limit, because it always produces fixed length output of 32 hex digits (the
  // collision probability is extremely low and can be ignored in our case - 1.47*10-29).

  // Remove existing triggers and function
  await knex.schema.raw('drop trigger if exists notification_created on notifications')
  await knex.schema.raw('drop trigger if exists notification_updated on notifications')
  await knex.schema.raw('drop function if exists graphql_subscription')

  // Create new function (with md5) and triggers
  await knex.raw(`
    create function graphql_subscription() returns trigger as $$
    declare
      v_event text = TG_ARGV[0];
      v_topic text = TG_ARGV[1];
    begin
      perform pg_notify(v_topic || md5(new.user_id), json_build_object(
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

    await knex.raw(`create trigger notification_updated after update on notifications for each row execute procedure graphql_subscription(
    'notification_updated',  -- "event"
    'graphql:notifications:'   -- "topic"
  )`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.raw('drop trigger if exists notification_created on notifications')
  await knex.schema.raw('drop trigger if exists notification_updated on notifications')
  await knex.schema.raw('drop function if exists graphql_subscription')
};
