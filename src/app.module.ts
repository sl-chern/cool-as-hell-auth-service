import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import appConfig from "src/config/app.config";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";
import { RedisModule } from "src/redis/redis.module";
import { CacheModule } from "src/cache/cache.module";
import databaseConfig from "src/drizzle/config/database.config";
import authConfig from "src/auth/config/auth.config";
import redisConfig from "src/redis/config/redis.config";

@Module({
  imports: [
    DrizzleModule,
    RedisModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig, redisConfig],
      envFilePath: [".env"],
    }),
    AuthModule,
    UserModule,
    RedisModule,
    CacheModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
