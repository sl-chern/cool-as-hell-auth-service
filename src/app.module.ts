import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import appConfig from "src/config/app.config";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import databaseConfig from "./drizzle/config/database.config";
import authConfig from "./auth/config/auth.config";

@Module({
  imports: [
    DrizzleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      envFilePath: [".env"],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
