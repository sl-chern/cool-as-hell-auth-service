import { z } from "zod";

export const authEnvironmentVariablesSchema = z.object({
  SECRET: z.string(),
  EXPIRES: z.string().transform(Number),
});
