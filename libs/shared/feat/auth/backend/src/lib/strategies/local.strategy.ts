/**
 * @requires NPM:@nestjs/common
 * @copyright © 2025 by Dr. J. Quader
 * @requires NPM:@nestjs/passport
 * @requires NPM:passport-local
 * @requires local:../auth/auth.service.ts
 *
 * @copyright 2024 by J. Quader
 * @author A. Naseem
 * @author Dr. J. Quader
 */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth/auth.service.js';

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string) {
    return await this.authService.validateUser(username, password);
  }
}

export { LocalStrategy };
