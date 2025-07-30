import { Module } from "@nestjs/common";
import { AuthController } from "src/auth/auth.controller";
import { AuthService } from "src/auth/auth.service";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import { AnonymousStrategy } from "src/auth/strategies/anonymous.strategy";
import { CacheModule } from "src/cache/cache.module";

@Module({
  imports: [CacheModule, UserModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AnonymousStrategy],
})
export class AuthModule {}
