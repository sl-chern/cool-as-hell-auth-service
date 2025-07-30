import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { UnprocessableEntityException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { AbstractUserRepository } from "./infrastructure/persistance/user.repository";
import { User } from "./domain/user";

describe("UserService", () => {
  let service: UserService;

  const mockUserRepository = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: AbstractUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should throw if email already exists", async () => {
      mockUserRepository.findByEmail.mockResolvedValue({ id: 1 });

      await expect(
        service.create({
          name: "John",
          email: "john@example.com",
          password: "123456",
        }),
      ).rejects.toThrow(UnprocessableEntityException);
    });

    it("should hash password and create user", async () => {
      const dto = {
        name: "Alice",
        email: "alice@example.com",
        password: "password123",
      };

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockImplementation(
        (data) =>
          ({
            id: "uuid",
            ...data,
          }) as User,
      );

      const result = await service.create(dto);

      expect(result).toMatchObject({
        id: "uuid",
        name: dto.name,
        email: dto.email,
      });

      expect(bcrypt.hash).toBeDefined();
      expect(mockUserRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: dto.name,
          email: dto.email,
          hashedPassword: expect.any(String) as string,
        }),
      );
    });
  });

  describe("findById", () => {
    it("should call findById", async () => {
      const user = { id: "uuid", name: "Test" };
      mockUserRepository.findById.mockResolvedValue(user);

      const result = await service.findById("uuid");
      expect(result).toEqual(user);
      expect(mockUserRepository.findById).toHaveBeenCalledWith("uuid");
    });
  });

  describe("findByEmail", () => {
    it("should call findByEmail", async () => {
      const email = "test@example.com";
      const user = { id: "uuid", email };
      mockUserRepository.findByEmail.mockResolvedValue(user);

      const result = await service.findByEmail(email);
      expect(result).toEqual(user);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
    });
  });
});
