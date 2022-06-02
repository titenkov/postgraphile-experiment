const { makeExtendSchemaPlugin, gql, embed } = require("graphile-utils");

const userNotificationsTopic = (_args, context, _resolveInfo) => {
  if (_args.userId) {
    return `graphql:notifications:${_args.userId}`
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
        console.log(`EVENT: ${JSON.stringify(event)}`);

        const rows = await selectGraphQLResultFromTable(
          sql.fragment`notifications`,
          (tableAlias, sqlBuilder) => {
            console.log(`TABLE ALIAS: ${tableAlias}`);
            console.log(`EVENT SUBJECT: ${event.subject}`);
            sql.fragment`${sqlBuilder.getTableAlias()}.id = ${sql.value(
              event.subject
            )}`
          }
        );
        return rows[0];
      },
    },
  },
}));