import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayloadType } from "src/auth/strategies/types/jwt-payload";
import { Request } from "express";

export const JwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayloadType => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as JwtPayloadType;
  },
);
