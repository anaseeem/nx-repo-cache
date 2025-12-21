/**
 * @copyright © 2020-2025 by J. Quader
 * @author Dr. J. Quader
 */
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import type { ExecutionContext } from '@nestjs/common';
import type { User } from '@jaqua/shared-graphql';

type AuthReqBody = {
  variables?: { input?: { username?: string; password?: string } };
  username?: string;
  password?: string;
};

@Injectable()
export class GqlAuthGuardLocal extends AuthGuard('local') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  override getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = (ctx.getContext().req ?? ctx.switchToHttp().getRequest()) as {
      body?: AuthReqBody;
    };
    req.body ??= {};
    if (process.env['NODE_ENV'] !== 'production') {
      console.log('[GqlAuthGuardLocal] req.body: ', req.body);
    }
    req.body.username = req.body.variables?.input?.username ?? '';
    req.body.password = req.body.variables?.input?.password ?? '';
    return req;
  }

  override handleRequest<TUser = User | false>(
    err: unknown,
    user: TUser,
    info: unknown,
    context: ExecutionContext,
    status?: number,
  ): TUser {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) return user;
    if (err) throw err instanceof Error ? err : new Error(String(err));

    const baseHandle = super.handleRequest as <U>(
      e: unknown,
      u: U,
      i: unknown,
      c: ExecutionContext,
      s?: number,
    ) => U;

    return baseHandle(err, user, info, context, status);
  }
}
