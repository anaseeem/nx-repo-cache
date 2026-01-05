/**
 * @copyright © 2020-2025 by J. Quader
 * @author Dr. J. Quader
 */
import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
