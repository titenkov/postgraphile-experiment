const { postgraphile } = require('postgraphile')

const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env

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
        console.log(req);
        console.log(`User: ${JSON.stringify(req.user)}`);
  
        const settings = {};
  
        if (req.auth) {
          settings['role'] = 'simple_user';
          settings['jwt.claims.interaxo_id'] = req.auth['https://interaxo.com/uid'];
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