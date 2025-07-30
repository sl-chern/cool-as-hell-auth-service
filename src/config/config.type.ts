import { AuthConfig } from "src/auth/config/auth-config.type";
import { AppConfig } from "src/config/app-config.type";
import { DatabaseConfig } from "src/drizzle/config/database-config.type";
import { RedisConfig } from "src/redis/config/redis-config.type";

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
  redis: RedisConfig;
};
