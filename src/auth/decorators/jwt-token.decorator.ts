import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const JwtToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const authHeader = request.headers["Authorization"] || "";

    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
      return authHeader.split(" ")[1];
    }

    return null;
  },
);
