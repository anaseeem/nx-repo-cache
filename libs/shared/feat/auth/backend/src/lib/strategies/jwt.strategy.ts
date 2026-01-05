/**
 * @requires NPM:@nestjs/common
 * @requires NPM:@nestjs/passport
 * @requires NPM:passport-jwt
 * @requires local:@jaqua/shared/util/cookie
 * @requires local:../../../../core
 * @requires local:./auth.service.ts
 *
 * @copyright © 2013-2025 by J. Quader
 * @author Dr. J. Quader
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtUser, JWT_ALG } from '../../../../src';
import { cookieExtractor } from '@jaqua/shared/util/cookie';
import { AuthService } from '../auth/auth.service.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly auth: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        cookieExtractor,
      ]),
      ignoreExpiration: true,
      secretOrKey: process.env['SECRET'],
      algorithms: [JWT_ALG],
    });
  }

  async validate(payload: JwtUser) {
    if (!payload) throw new UnauthorizedException('No JWT payload');
    const user = await this.auth.validateUserByPayload(payload);
    if (!user) throw new UnauthorizedException('Invalid Credentials');
    return user;
  }
}
