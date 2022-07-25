const { makeExtendSchemaPlugin, gql, embed } = require("graphile-utils");

module.exports = makeExtendSchemaPlugin(build => {
  const { pgSql: sql } = build;

  return {
    typeDefs: gql`
      extend type Notification {
        template(locale: String!): Template @pgQuery(
          source: ${embed(sql.fragment`templates`)}
          withQueryBuilder: ${embed((queryBuilder, args) => {
            queryBuilder.where(
              sql.fragment`${queryBuilder.getTableAlias()}.type = ${queryBuilder.parentQueryBuilder.getTableAlias()}.type
              and ${queryBuilder.getTableAlias()}.locale = ${sql.value(args.locale)}::text`);
            queryBuilder.limit(1);
          })}
        )
      }

      type MarkAllAsReadPayload {
        updated: Int
        query: Query
      }

      extend type Mutation {
        markAllNotificationsAsRead: MarkAllAsReadPayload
      }
    `,
    resolvers: {
      Mutation: {
        markAllNotificationsAsRead: async (_query, args, context, resolveInfo) => {
          const { pgClient } = context;
          const { rowCount } = await pgClient.query(`update notifications set read = true where read = false`);

          return { updated: rowCount, query: build.$$isQuery };
        },
      },
    },
  };
});
