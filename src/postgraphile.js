const { postgraphile, makePluginHook } = require('postgraphile')
const crypto = require('crypto')
const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, AUTH_TYPE, AUTH_USER_CLAIM } = process.env

const SubscriptionPlugin = require("./subscriptions");
const NotificationPlugin = require("./notifications");
const { fetchProjectByKey } = require("./projects");
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
      async pgSettings(req) {
        const settings = {};

        settings['role'] = 'anonymous';

        if ('jwt' === AUTH_TYPE) {
          // Auth0-integration
          if (req.auth) {
            settings['role'] = 'simple_user';
            settings['request.user_id'] = req.auth[AUTH_USER_CLAIM];
          }
        }

        if ('hmac' === AUTH_TYPE) {
          // HMAC-based authentication
          // Read more at https://notifir.github.io/docs/integration/authentication
          if (!req.headers) {
            throw new Error('Missing headers in request');
          }
          if (!req.headers['api-public-key'] || !req.headers['x-user-id'] || !req.headers['x-user-hmac']) {
            throw new Error('Missing one of the required headers in request: [api-public-key, x-user-id or x-user-hmac]');
          }

          // Fetch api-secret-key using public key
          const apiPublicKey = req.headers['api-public-key']
          const project = await fetchProjectByKey(apiPublicKey);

          if (!project || !project.api_secret_key) {
            throw new Error(`Failed to authenticate '${apiPublicKey}'`);
          }

          const apiSecretKey = project.api_secret_key;
          const projectId = project.id;

          // Verify HMAC
          const userId = req.headers['x-user-id'];
          const userHmac = req.headers['x-user-hmac'];

          const calculatedUserHmac = crypto
            .createHmac('sha256', apiSecretKey)
            .update(userId)
            .digest('base64');

          if (userHmac !== calculatedUserHmac) {
            console.warn(`HMAC verification failed: ${userHmac} !== ${calculatedUserHmac}`);
            throw new Error(`Failed to authenticate '${userId}': HMAC mismatch`);
          }

          // Set DB-level roles and attributes
          settings['role'] = ('system' === userId) ? 'system_user' : 'simple_user';
          settings['request.user_id'] = userId;
          settings['request.project_id'] = projectId;
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
      appendPlugins: [SubscriptionPlugin, NotificationPlugin],
      websocketMiddlewares: [
        (req, res, next) => {
          if (req.connectionParams['authorization-key']) {
            req.headers['authorization-key'] = req.connectionParams['authorization-key'];
          }
          if (req.connectionParams['api-public-key']) {
            req.headers['api-public-key'] = req.connectionParams['api-public-key'];
          }
          if (req.connectionParams['x-user-id']) {
            req.headers['x-user-id'] = req.connectionParams['x-user-id'];
          }
          if (req.connectionParams['x-user-hmac']) {
            req.headers['x-user-hmac'] = req.connectionParams['x-user-hmac'];
          }
          next();
        }
      ]
    }
)
