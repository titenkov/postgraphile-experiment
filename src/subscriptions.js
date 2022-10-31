const { makeExtendSchemaPlugin, gql, embed } = require("graphile-utils");
const crypto = require("crypto");

const userNotificationsTopic = (_args, context, _resolveInfo) => {
  if (_args.userId) {
    // Topic names are limited to 63 characters in length (this is a PostgreSQL limitation),
    // so we need to ensure that topic name will never exceed this limit. Usernames can be quite
    // long and lead to postgres errors, so instead of using them we calculate the fixed-length hash.
    // Note: md5 has the fixed length output of 32 hex digits
    const userHash = crypto
      .createHash('md5')
      .update(_args.userId)
      .digest('hex');

    return `graphql:notifications:${userHash}`
  } else {
    throw new Error("userId is required");
  }
};

module.exports = makeExtendSchemaPlugin(({ pgSql: sql }) => ({
  typeDefs: gql`
    type NotificationPayload {
      # This is populated by our resolver below
      notification: Notification

      # This is returned directly from the PostgreSQL subscription payload (JSON object)
      event: String
    }

    extend type Subscription {
      """
      Triggered when the current user's notification list changes:

      - new notifications
      - when notification status changes
      """
      notificationsUpdated(userId: String): NotificationPayload @pgSubscription(topic: ${embed(userNotificationsTopic)})
    }
  `,

  resolvers: {
    NotificationPayload: {
      // This method finds the user from the database based on the event
      // published by PostgreSQL.
      //
      // In a future release, we hope to enable you to replace this entire
      // method with a small schema directive above, should you so desire. It's
      // mostly boilerplate.
      async notification(
        event,
        _args,
        _context,
        { graphile: { selectGraphQLResultFromTable } }
      ) {
        const rows = await selectGraphQLResultFromTable(
          sql.fragment`notifications`,
          (tableAlias, sqlBuilder) => {
            sqlBuilder.where(
                sql.fragment`${sqlBuilder.getTableAlias()}.id = ${sql.value(event.subject)}`
            );
          }
        );
        return rows[0];
      },
    },
  },
}));
