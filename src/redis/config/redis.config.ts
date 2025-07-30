import { registerAs } from "@nestjs/config";
import { redisEnvironmentVariablesSchema } from "src/redis/config/redis-config.schema";
import { RedisConfig } from "src/redis/config/redis-config.type";

export default registerAs<RedisConfig>("redis", () => {
  redisEnvironmentVariablesSchema.parse(process.env);

  return {
    redisUser: process.env.REDIS_USER || "user",
    redisHost: process.env.REDIS_HOST || "localhost",
    redisPort: parseInt(process.env.REDIS_PORT!, 10) || 6380,
    redisUserPassword: process.env.REDIS_USER_PASSWORD || "password",
  };
});
