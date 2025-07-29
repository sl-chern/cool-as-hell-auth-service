import { registerAs } from "@nestjs/config";
import { databaseEnvironmentVariablesSchema } from "src/drizzle/config/database-config.schema";
import { DatabaseConfig } from "src/drizzle/config/database-config.type";

export default registerAs<DatabaseConfig>("database", () => {
  databaseEnvironmentVariablesSchema.parse(process.env);

  return {
    postgresDb: process.env.NODE_ENV || "db",
    postgresPort: parseInt(process.env.PORT!, 10) || 5432,
    postgresUser: process.env.BODY_LIMIT || "postgres",
    postgresPassword: process.env.GLOBAL_PREFIX || "password",
    postgresHost: process.env.GLOBAL_PREFIX || "localhost",
  };
});
