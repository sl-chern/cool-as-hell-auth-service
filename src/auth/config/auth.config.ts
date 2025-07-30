import { registerAs } from "@nestjs/config";
import { AuthConfig } from "src/auth/config/auth-config.type";
import { authEnvironmentVariablesSchema } from "./auth-config.schema";

export default registerAs<AuthConfig>("auth", () => {
  authEnvironmentVariablesSchema.parse(process.env);

  return {
    secret: process.env.SECRET || "secret",
    expires: parseInt(process.env.EXPIRES!, 10) || 1000 * 60 * 60,
  };
});
