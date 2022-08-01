# Notifications API

---

## Using: 
- [express](https://expressjs.com/)
- [postgraphile](https://www.graphile.org/postgraphile/)
- [postgresql](https://www.postgresql.org/)

## Quickstart

You can run the entire stack using `docker-compose`:

```bash
docker-compose up
```

To explore the GraphQL APIs you can use `graphiql`, which is enabled by default and served at `http://localhost:3001/api/graphiql`. 

It's not secured by default and run with `AUTH_TYPE=plain`, so you can specify the authorization header in `Request Headers` section (like `authorization-key: beast~mailinator.com@marvel-x-men`).

If you're using HMAC-based authentication (recommended), you need to specify `api-public-key`, `x-user-id` and `x-user-hmac` headers. Read more about it [here](https://notifir.github.io/docs/integration/authentication).

## Development

To start Notifir API locally you need to have database running. You can run the Postgres in a [docker container](https://hub.docker.com/_/postgres) using the following commands:

```bash

docker pull postgres
docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

```

Once you have a clean DB started, you can set up the data structure and generate seed data:

```bash

npx knex migrate:latest
npx knex seed:run

```

Try to connect to the Postgres and check what is the data you have there. If you're VS Code user you can try out the following plugins:
- [SQLTools](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools)
- [PostgresSQL Explorer](https://marketplace.visualstudio.com/items?itemName=ckolkman.vscode-postgres)

You should have `notifications` table in the public schema.

Now you should be fine to run the application:

```bash

yarn
yarn watch

```

Make changes in the code and see them live.

Enjoy 🙃
