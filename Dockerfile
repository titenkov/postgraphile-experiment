FROM node:lts-alpine AS packages-installation

WORKDIR /usr/src/notifir/api

COPY package.json .
COPY ./src src
COPY ./db db
COPY knexfile.js .

RUN yarn install --silent --non-interactive && yarn cache clean

################################################################################

FROM node:lts-alpine AS api-production-stage

WORKDIR /notifir/api

ENV ENV_NAME production
ENV NODE_ENV production
ENV NODE_CONFIG_ENV production
ENV PORT 80

COPY --from=packages-installation /usr/src/notifir/api/package.json .
COPY --from=packages-installation /usr/src/notifir/api/node_modules ./node_modules
COPY --from=packages-installation /usr/src/notifir/api/src ./src
COPY --from=packages-installation /usr/src/notifir/api/db ./db
COPY --from=packages-installation /usr/src/notifir/api/knexfile.js ./knexfile.js

# Start
CMD yarn start

EXPOSE 80