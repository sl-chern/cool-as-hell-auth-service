import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { LoginDto } from "src/auth/dto/login.dto";
import { LoginResponseDto } from "src/auth/dto/login-response.dto";
import { ZodPipe } from "src/pipes/zod.pipe";
import { loginSchema } from "src/auth/schemas/login.schema";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { createUserSchema } from "src/user/schemas/create-user.schema";
import { AuthGuard } from "@nestjs/passport";
import { JwtToken } from "./decorators/jwt-token.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  public login(
    @Body(new ZodPipe(loginSchema)) loginDto: LoginDto,
  ): Promise<LoginResponseDto> {
    return this.service.validateLogin(loginDto);
  }

  @Post("register")
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(
    @Body(new ZodPipe(createUserSchema)) createUserDto: CreateUserDto,
  ): Promise<void> {
    return await this.service.register(createUserDto);
  }

  @Post("logout")
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logout(@JwtToken() token: string): Promise<void> {
    await this.service.logout(token);
  }
}
