import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/drizzle/schema/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    port: +process.env.POSTGRES_PORT!,
    database: process.env.POSTGRES_DB!,
    user: process.env.POSTGRES_USER!,
    host: process.env.POSTGRES_HOST!,
    password: process.env.POSTGRES_PASSWORD,
  },
});
