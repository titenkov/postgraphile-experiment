const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const pgp = require('pg-promise')();

const db = pgp({
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT
});

module.exports = {
  db,
  pgp
}
