import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
import { CacheService } from "src/cache/cache.service";
import { UnprocessableEntityException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

describe("AuthService", () => {
  let service: AuthService;
  let userService: Partial<Record<keyof UserService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;
  let configService: Partial<Record<keyof ConfigService, jest.Mock>>;
  let cacheService: Partial<Record<keyof CacheService, jest.Mock>>;

  beforeEach(async () => {
    userService = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
    };

    jwtService = {
      signAsync: jest.fn(),
    };

    configService = {
      getOrThrow: jest.fn().mockImplementation((key) => {
        if (key === "auth.secret") return "test-secret";
        if (key === "auth.expires") return 3600;
      }),
    };

    cacheService = {
      set: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtService },
        { provide: UserService, useValue: userService },
        { provide: ConfigService, useValue: configService },
        { provide: CacheService, useValue: cacheService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should throw if user not found on login", async () => {
    userService.findByEmail!.mockResolvedValue(null);

    await expect(
      service.validateLogin({ email: "test@test.com", password: "1234" }),
    ).rejects.toThrow(UnprocessableEntityException);
  });

  it("should throw if password is invalid", async () => {
    userService.findByEmail!.mockResolvedValue({
      id: "1",
      email: "test@test.com",
      hashedPassword: await bcrypt.hash("correct", 10),
    });

    await expect(
      service.validateLogin({ email: "test@test.com", password: "wrong" }),
    ).rejects.toThrow(UnprocessableEntityException);
  });

  it("should return token data on valid login", async () => {
    const user = {
      id: "user-id",
      email: "test@test.com",
      hashedPassword: await bcrypt.hash("correct", 10),
    };

    userService.findByEmail!.mockResolvedValue(user);
    jwtService.signAsync!.mockResolvedValue("mock-token");

    const result = await service.validateLogin({
      email: user.email,
      password: "correct",
    });

    expect(result.token).toBe("mock-token");
    expect(result.user).toEqual(user);
  });

  it("should call cacheService.set on logout", async () => {
    await service.logout("some-token");
    expect(cacheService.set).toHaveBeenCalled();
  });

  it("should return user by id on verify", async () => {
    userService.findById!.mockResolvedValue({ id: "user-id" });
    const result = await service.verify("user-id");
    expect(result).toEqual({ id: "user-id" });
  });
});
