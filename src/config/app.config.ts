import { registerAs } from "@nestjs/config";
import { AppConfig } from "src/config/app-config.type";
import { environmentVariablesSchema } from "src/config/app-config.schema";

export default registerAs<AppConfig>("app", () => {
  environmentVariablesSchema.parse(process.env);

  return {
    nodeEnv: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT!, 10) || 3000,
    bodyLimit: process.env.BODY_LIMIT || "10mb",
    globalPrefix: process.env.GLOBAL_PREFIX || "api",
  };
});
