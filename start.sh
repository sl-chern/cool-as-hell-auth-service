#!/bin/sh
[ ! -f .env ] || export $(grep -v '^#' .env | xargs)
docker compose -f ./compose.dev.yml up -d
bash ./wait-for-it.sh "$POSTGRES_HOST":"$POSTGRES_PORT"
npm run migrate
npm run start:dev
