import { Test, TestingModule } from "@nestjs/testing";
import { CacheService } from "./cache.service";
import { REDIS } from "src/redis/redis.module";

describe("CacheService", () => {
  let service: CacheService;

  const mockRedisClient = {
    set: jest.fn(),
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: REDIS,
          useValue: mockRedisClient,
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should set value in redis", async () => {
    await service.set("my-key", "my-value", 60);
    expect(mockRedisClient.set).toHaveBeenCalledWith(
      "my-key",
      "my-value",
      "EX",
      60,
    );
  });

  it("should get value from redis", async () => {
    mockRedisClient.get.mockResolvedValue("some-value");
    const result = await service.get("my-key");
    expect(result).toBe("some-value");
    expect(mockRedisClient.get).toHaveBeenCalledWith("my-key");
  });
});
