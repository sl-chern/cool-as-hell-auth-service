import { nodeEnv } from "src/utils/constants";
import { z } from "zod";

export const environmentVariablesSchema = z.object({
  NODE_ENV: z.enum([nodeEnv.test, nodeEnv.development, nodeEnv.production]),
  PORT: z.string(),
  GLOBAL_PREFIX: z.string(),
  BODY_LIMIT: z.string(),
});
