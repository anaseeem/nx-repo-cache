/**
 * @requires NPM:@nestjs/common
 * @requires NPM:@nestjs/graphql
 * @requires local:@jaqua/shared-graphql
 * @requires local:./auth.service.ts
 * @requires local:../../backend/
 *
 * @copyright © 2024-2025 by J. Quader
 * @author A. Naseem
 * @author Dr. J. Quader
 */
import { UseGuards } from '@nestjs/common';
import {
  Context,
  Mutation,
  Query,
  Resolver,
  ObjectType,
  Field,
} from '@nestjs/graphql';

import { User, UserData } from '@jaqua/shared-graphql';
import { CurrentUser } from '../decorators';
import { GqlAuthGuard, GqlAuthGuardLocal } from '../guards';
import { AuthService } from './auth.service';
import { JwtUser } from '../../../../src';

@ObjectType()
class AccessToken {
  @Field()
  access_token!: string;
}

@Resolver()
export class AuthResolvers {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AccessToken)
  @UseGuards(GqlAuthGuardLocal)
  async login(@Context() ctx: any): Promise<AccessToken> {
    return this.authService.login(ctx?.req?.user as User);
  }

  @Query(() => UserData)
  @UseGuards(GqlAuthGuard)
  async getAuthenticatedUser(@CurrentUser() user: JwtUser): Promise<UserData> {
    return user as UserData;
  }
}
