/**
 * @copyright © 2020-2025 by J. Quader
 * @author Dr. J. Quader
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';
import type { ExecutionContext } from '@nestjs/common';
import type { User } from '@jaqua/shared-graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  override getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext()?.req ?? context.switchToHttp().getRequest();
    const { variables } = ctx.getArgs?.() ?? {};
    if (variables) req.body = variables;
    return req;
  }

  override handleRequest(
    err: any,
    user: User | boolean,
    info: Error,
    context: ExecutionContext,
    status: any,
  ) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) return user;

    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Invalid Token!');
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return super.handleRequest(err, user, info, context, status);
  }
}
