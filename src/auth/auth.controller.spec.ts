import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";

describe("AuthController", () => {
  let controller: AuthController;
  let service: Partial<Record<keyof AuthService, jest.Mock>>;

  beforeEach(async () => {
    service = {
      validateLogin: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      verify: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: service }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should return token on login", async () => {
    const dto: LoginDto = { email: "test@test.com", password: "1234" };
    const mockResponse = {
      token: "abc",
      tokenExpires: 123,
      user: { id: "1", email: dto.email },
    };

    service.validateLogin!.mockResolvedValue(mockResponse);
    const result = await controller.login(dto);
    expect(result).toEqual(mockResponse);
  });

  it("should call register", async () => {
    const dto: CreateUserDto = {
      email: "test@test.com",
      password: "pass",
      name: "Test",
    };

    await controller.register(dto);
    expect(service.register).toHaveBeenCalledWith(dto);
  });

  it("should call logout", async () => {
    await controller.logout("token");
    expect(service.logout).toHaveBeenCalledWith("token");
  });

  it("should return user on verify", async () => {
    service.verify!.mockResolvedValue({ id: "1" });
    const result = await controller.verify({ id: "1", iat: 0, exp: 0 });
    expect(result).toEqual({ id: "1" });
  });
});
