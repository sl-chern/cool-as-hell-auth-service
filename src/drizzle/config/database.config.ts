import { registerAs } from "@nestjs/config";
import { databaseEnvironmentVariablesSchema } from "src/drizzle/config/database-config.schema";
import { DatabaseConfig } from "src/drizzle/config/database-config.type";

export default registerAs<DatabaseConfig>("database", () => {
  databaseEnvironmentVariablesSchema.parse(process.env);

  return {
    postgresDb: process.env.POSTGRES_DB || "db",
    postgresPort: parseInt(process.env.POSTGRES_PORT!, 10) || 5432,
    postgresUser: process.env.POSTGRES_USER || "postgres",
    postgresPassword: process.env.POSTGRES_PASSWORD || "password",
    postgresHost: process.env.POSTGRES_HOST || "localhost",
  };
});
