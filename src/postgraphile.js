const { postgraphile, makePluginHook } = require('postgraphile')

const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, AUTH_TYPE, AUTH_USER_CLAIM } = process.env

const SubscriptionPlugin = require("./subscriptions");
const { default: PgPubsub } = require("@graphile/pg-pubsub");

const pluginHook = makePluginHook([PgPubsub]);

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
            settings['request.user_id'] = req.auth[AUTH_USER_CLAIM];
          }
        }

        if ('plain' === AUTH_TYPE) {
          // Plain header-based auth.
          // Do not use in production!
          if (req.headers && req.headers['authorization-key']) {
            settings['role'] = ('system' === req.headers['authorization-key']) ? 'system_user' : 'simple_user';
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
      // Subscriptions
      pluginHook,
      subscriptions: true,
      appendPlugins: [SubscriptionPlugin],
      websocketMiddlewares: [
        (req, res, next) => {
          if (req.connectionParams['authorization-key']) {
            req.headers['authorization-key'] = req.connectionParams['authorization-key'];
          }
          next();
        }
      ]
    }
)
