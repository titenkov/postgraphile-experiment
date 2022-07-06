const { makeExtendSchemaPlugin, gql, embed } = require("graphile-utils");

module.exports = makeExtendSchemaPlugin(build => {
  const { pgSql: sql } = build;
  return {
    typeDefs: gql`
      extend type Notification {
        template(locale: String!): Template! @pgQuery(
          source: ${embed(sql.fragment`templates`)}
          withQueryBuilder: ${embed((queryBuilder, args) => {
            queryBuilder.where(
              sql.fragment`${queryBuilder.getTableAlias()}.type = ${queryBuilder.parentQueryBuilder.getTableAlias()}.type
              and ${queryBuilder.getTableAlias()}.locale = ${sql.value(args.locale)}::text`);
            queryBuilder.limit(1);
          })}
        )
      }
    `,
  };
});
