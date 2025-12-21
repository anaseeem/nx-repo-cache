/**
 * @copyright © 2020-2025 by J. Quader
 * @author Dr. J. Quader
 */
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  override handleRequest(err: any, user: any) {
    if (err || !user) throw err || new UnauthorizedException()
    return user
  }
}
