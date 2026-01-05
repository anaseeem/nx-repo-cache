/**
 * @requires NPM:@nestjs/common
 * @requires NPM:express
 * @requires local:@jaqua/shared-graphql
 * @requires local:./auth.service.ts
 * @requires local:../../
 *
 * @copyright © 2024-2025 by J. Quader
 * @author Dr. J. Quader
 * @author A. Naseem
 */
import {
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

import { User } from '@jaqua/shared-graphql';

import { LocalAuthGuard } from '../..';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ExpressRequest) {
    const user = req.user as unknown as User;
    if (!user) throw new UnauthorizedException();

    return this.authService.login(user);
  }

  @Post('qr-login')
  async loginWithQr(@Body() body: { loginKey: string }) {
    return this.authService.loginWithQrKey(body.loginKey);
  }
}
