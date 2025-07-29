import { z } from "zod";

export const databaseEnvironmentVariablesSchema = z.object({
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PORT: z.string().transform(Number),
  POSTGRES_HOST: z.string(),
});
