import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AllConfigType } from "src/config/config.type";
import { JwtPayloadType } from "./types/jwt-payload";
import { Request } from "express";
import { CacheService } from "src/cache/cache.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    configService: ConfigService<AllConfigType>,
    private cacheService: CacheService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow("auth.secret", { infer: true }),
      passReqToCallback: true,
    });
  }

  public async validate(
    request: Request,
    payload: JwtPayloadType,
  ): Promise<JwtPayloadType> {
    const authHeader = request.headers["authorization"] || "";
    if (authHeader?.startsWith("Bearer ")) {
      const tokenFromHeader = authHeader.split(" ")[1];
      const cachedValue = await this.cacheService.get(tokenFromHeader);
      if (cachedValue !== null) throw new UnauthorizedException();
    } else {
      throw new UnauthorizedException();
    }

    if (!payload.id) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
