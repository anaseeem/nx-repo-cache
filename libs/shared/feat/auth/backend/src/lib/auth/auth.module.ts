/**
 * @requires NPM:@nestjs/common
 * @requires NPM:@nestjs/config
 * @requires NPM:@nestjs/jwt
 * @requires NPM:@nestjs/passport
 * @requires NPM:passport
 * @requires local:./auth.resolvers.ts
 * @requires local:./auth.service.ts
 * @requires local:../strategies
 * @requires local:../guards
 *
 * @copyright © 2013-2025 by J. Quader
 * @author Dr. J. Quader
 * @author A. Naseem
 */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import 'passport';

import { AuthResolvers } from './auth.resolvers.js';
import { AuthService } from './auth.service.js';
import { JwtStrategy, LocalStrategy } from '../strategies';
import { GqlAuthGuard, GqlAuthGuardLocal } from '../guards';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('SECRET'),
        signOptions: { expiresIn: 60 * 5 },
        verifyOptions: {
          algorithms: ['HS256'],
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthResolvers,
    GqlAuthGuard,
    GqlAuthGuardLocal,
  ],
  exports: [JwtStrategy, JwtModule],
})
export class AuthModule {}
