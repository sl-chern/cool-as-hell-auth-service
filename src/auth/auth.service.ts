import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AllConfigType } from "src/config/config.type";
import { UserService } from "src/user/user.service";
import { LoginResponseDto } from "src/auth/dto/login-response.dto";
import { LoginDto } from "src/auth/dto/login.dto";
import * as bcrypt from "bcryptjs";
import { User } from "src/user/domain/user";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { CacheService } from "src/cache/cache.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService<AllConfigType>,
    private cacheService: CacheService,
  ) {}

  async validateLogin(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          email: "notFound",
        },
      });
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.hashedPassword,
    );

    if (!isValidPassword) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: "incorrectPassword",
        },
      });
    }

    const { token, tokenExpires } = await this.getTokensData(user.id);

    return {
      token,
      tokenExpires,
      user,
    };
  }

  async register(dto: CreateUserDto): Promise<void> {
    await this.userService.create({
      ...dto,
    });
  }

  async logout(token: string) {
    const tokenExpiresIn = this.configService.getOrThrow("auth.expires", {
      infer: true,
    });
    await this.cacheService.set(token, "", tokenExpiresIn);
  }

  async verify(id: User["id"]) {
    return this.userService.findById(id);
  }

  private async getTokensData(id: User["id"]) {
    const tokenExpiresIn = this.configService.getOrThrow("auth.expires", {
      infer: true,
    });

    const tokenExpires = Date.now() + tokenExpiresIn;

    const token = await this.jwtService.signAsync(
      {
        id,
      },
      {
        secret: this.configService.getOrThrow("auth.secret", { infer: true }),
        expiresIn: tokenExpiresIn,
      },
    );

    return {
      token,
      tokenExpires,
    };
  }
}
