import { Module } from "@nestjs/common";
import Redis from "ioredis";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "src/config/config.type";

export const REDIS = Symbol("redis-connection");

@Module({
  providers: [
    {
      provide: REDIS,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfigType>): Redis => {
        const redisHost = configService.get("redis.redisHost", { infer: true });
        const redisPort = configService.get("redis.redisPort", { infer: true });
        const redisUser = configService.get("redis.redisUser", {
          infer: true,
        });
        const redisUserPassword = configService.get("redis.redisUserPassword", {
          infer: true,
        });

        return new Redis({
          host: redisHost,
          port: redisPort,
          username: redisUser,
          password: redisUserPassword,
        });
      },
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
