/**
 * @copyright © 2020-2025 by J. Quader
 * @author Dr. J. Quader
 */
import { JwtUser } from '../../../../src';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user as JwtUser;

    if (process.env['NODE_ENV'] !== 'production') {
      console.log('[CurrentUser] user: ', user);
    }
    return {
      ...user,
      userId: user?.id?.toString(),
      username: user?.username,
      roles: user?.roles,
      group: user?.group,
    };
  },
);
