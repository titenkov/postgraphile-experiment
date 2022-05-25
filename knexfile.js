require('dotenv').config()

const { CLIENT, DATABASE, PG_USER, PG_PASSWORD, PG_HOST, PG_PORT } = process.env

module.exports = {
    development: {
        client: CLIENT,
        connection: {
            database: DATABASE,
            user: PG_USER,
            password: PG_PASSWORD,
            host: PG_HOST,
            port: PG_PORT,
        },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
}