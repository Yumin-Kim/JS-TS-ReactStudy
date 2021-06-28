import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse();
    return response.locals.jwt;
  },
);

//해당커스텀 데코레이터는 jwt 사용시
