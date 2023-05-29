import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Type = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.query.type;
  }
);