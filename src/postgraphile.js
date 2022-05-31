const { postgraphile } = require('postgraphile')

const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, AUTH_TYPE } = process.env

module.exports = postgraphile(
    {
        database: DB_DATABASE,
        user: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: DB_PORT,
    },
    'public',
    {
      pgSettings(req) {
        const settings = {};

        settings['role'] = 'anonymous';

        if ('jwt' === AUTH_TYPE) {
          // Auth0-integration
          if (req.auth) {
            settings['role'] = 'simple_user';
            settings['request.user_id'] = req.auth['https://interaxo.com/uid'];
          }
        }

        if ('plain' === AUTH_TYPE) {
          // Plain header-based auth.
          // Do not use in production!
          if (req.headers && req.headers['authorization-key']) {
            settings['role'] = 'simple_user';
            settings['request.user_id'] = req.headers['authorization-key'];
          }
        }

        return settings;
      },
      graphqlRoute: '/api/graphql',
      graphiqlRoute: '/api/graphiql',
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
    }
)