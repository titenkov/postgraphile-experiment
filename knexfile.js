require("dotenv").config();

const { CLIENT, DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

module.exports = {
  development: {
    client: CLIENT,
    connection: {
      database: DB_DATABASE,
      user: DB_USER, // Migrations have to be run as "superuser"
      password: DB_PASSWORD,
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
      user: DB_USER, // Migrations have to be run as "superuser"
      password: DB_PASSWORD,
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
      user: DB_USER, // Migrations have to be run as "superuser"
      password: DB_PASSWORD,
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
