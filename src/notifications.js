const { makeExtendSchemaPlugin, gql } = require("graphile-utils");
const nunjucks  = require("./nunjucks");

module.exports = makeExtendSchemaPlugin(build => {
  return {
    typeDefs: gql`
      extend type Notification {
        template(locale: String!): String,
        content(locale: String!): String @requires(columns: ["payload"])
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
        markAllNotificationsAsRead: async (parent, args, context) => {
          const { pgClient } = context;
          const { rowCount } = await pgClient.query(`update notifications set read = true where read = false`);

          return { updated: rowCount, query: build.$$isQuery };
        },
      },
      Notification: {
        template: async (parent, args, context) => {
          const { pgClient } = context;
          const { rows } = await pgClient.query(`select content from templates where type = $1 and locale = $2 limit 1`, [parent.type, args.locale]);

          if (Array.isArray(rows) && !!rows.length) {
            return rows[0].content
          }

          console.warn(`Template not found. Params: [type: '${parent.type}', locale: '${args.locale}']`)
          return null;
        },
        content: async (parent, args, context) => {
          const { pgClient } = context;
          const { rows } = await pgClient.query(`select content from templates where type = $1 and locale = $2 limit 1`, [parent.type, args.locale]);

          if (Array.isArray(rows) && !!rows.length) {
            return nunjucks.renderString(rows[0].content, parent.payload)
          }

          console.warn(`Template not found. Params: [type: '${parent.type}', locale: '${args.locale}']`)
          return null;
        },
      }
    },
  };
});
