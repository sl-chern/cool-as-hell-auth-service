import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { REDIS } from "src/redis/redis.module";

@Injectable()
export class CacheService {
  constructor(@Inject(REDIS) private readonly client: Redis) {}

  async set(key: string, value: string, expirationSeconds: number) {
    await this.client.set(key, value, "EX", expirationSeconds);
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }
}
