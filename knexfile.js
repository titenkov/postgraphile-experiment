require("dotenv").config();

const { CLIENT, DB_DATABASE, DB_POSTGRES_USER, DB_POSTGRES_PASSWORD, DB_HOST, DB_PORT } = process.env;

module.exports = {
  development: {
    client: CLIENT,
    connection: {
      database: DB_DATABASE,
      user: DB_POSTGRES_USER, // Migrations have to be run as "superuser"
      password: DB_POSTGRES_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },

  test: {
    client: CLIENT,
    connection: {
      database: DB_DATABASE,
      user: DB_POSTGRES_USER, // Migrations have to be run as "superuser"
      password: DB_POSTGRES_PASSWORD,
      host: "localhost",
      port: DB_PORT
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },

  production: {
    client: CLIENT,
    connection: {
      database: DB_DATABASE,
      user: DB_POSTGRES_USER, // Migrations have to be run as "superuser"
      password: DB_POSTGRES_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
};
