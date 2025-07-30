#!/bin/sh
[ ! -f .env ] || export $(grep -v '^#' .env | xargs)

if [ "$NODE_ENV" != "production" ]; then
    docker compose -f ./compose.dev.yml up -d
    bash ./wait-for-it.sh "$POSTGRES_HOST":"$POSTGRES_PORT"
fi

npm run migrate

if [ "$NODE_ENV" = "production" ]; then
    node dist/main.js
else
    npm run start:dev
fi
