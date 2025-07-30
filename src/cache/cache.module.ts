import { Module } from "@nestjs/common";
import { CacheService } from "src/cache/cache.service";
import { RedisModule } from "src/redis/redis.module";

@Module({
  imports: [RedisModule],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
