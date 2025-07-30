import { z } from "zod";

export const redisEnvironmentVariablesSchema = z.object({
  REDIS_USER: z.string(),
  REDIS_USER_PASSWORD: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(Number),
});
