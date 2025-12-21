/**
 * @requires NPM:@nestjs/common
 * @requires NPM:@nestjs/jwt
 * @requires NPM:bcryptjs
 * @requires local:@jaqua/shared-graphql
 * @requires local:@jaqua/user
 * @requires local:../../core
 * @requires local:./ports/user-reader.port.ts
 *
 * @copyright © 2024-2025 by J. Quader
 * @author A. Naseem
 * @author Dr. J. Quader
 */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { User } from '@jaqua/shared-graphql';
import { JwtUser, toUndef } from '../../../../src';
import { USER_READER, type UserReader } from '../ports/user-reader.port.js';

export type TAccessToken = { access_token: string };

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_READER) private readonly users: UserReader,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    try {
      const invalidCredentialsError = new UnauthorizedException(
        'Invalid Credentials',
      );
      if (!username || !password) throw invalidCredentialsError;
      const data = await this.users.getUser({ username });
      if (!data) throw invalidCredentialsError;
      const { password: dbPassword, ...user } = data;
      const ok =
        dbPassword && (await this.validatePassword(password, dbPassword));
      if (!ok) throw invalidCredentialsError;
      return user as User;
    } catch (error) {
      console.error('[validateUser]: ', error);
      throw error;
    }
  }

  async validateUserByPayload(payload: JwtUser) {
    if (!payload?.username)
      throw new UnauthorizedException('Invalid Credentials');
    const data = await this.users.getUser({ username: payload.username });
    if (!data) throw new UnauthorizedException('Invalid Credentials');
    const { password: _pw, ...user } = data as any;
    return user as User;
  }

  async validatePassword(inputPassword: string, dbPassword: string) {
    return await bcrypt.compare(inputPassword, dbPassword);
  }

  async login(user: User): Promise<TAccessToken> {
    const payload: JwtUser = {
      sub: toUndef(user.id),
      id: toUndef(user.id),
      username: toUndef(user.username),
      roles: Array.isArray(user.roles)
        ? (user.roles.filter(Boolean) as string[])
        : undefined,
      professionalGroup: toUndef((user as any).professionalGroup),
    };
    return { access_token: this.jwt.sign(payload) };
  }

  async loginWithQrKey(loginKey: string) {
    const user = await this.users.findByLoginKey(loginKey);
    if (!user) return { success: false };

    const payload: JwtUser = {
      sub: toUndef(user.id),
      username: toUndef(user.username),
    };
    const token = this.jwt.sign(payload);

    return { success: true, token };
  }
}
