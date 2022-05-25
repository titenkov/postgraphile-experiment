const { postgraphile } = require('postgraphile')

const { DATABASE, PG_USER, PG_PASSWORD, PG_HOST, PG_PORT } = process.env

module.exports = postgraphile(
    {
        database: DATABASE,
        user: PG_USER,
        password: PG_PASSWORD,
        host: PG_HOST,
        port: PG_PORT,
    },
    'public',
    {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
    }
)