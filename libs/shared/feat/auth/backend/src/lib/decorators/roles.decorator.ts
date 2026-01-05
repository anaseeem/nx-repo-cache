/**
 * @requires NPM:@nestjs/common
 *
 * @copyright © 2013-2025 by J. Quader
 * @author Dr. J. Quader
 */
import { SetMetadata } from '@nestjs/common'

export const Roles = (...roles: string[]) => SetMetadata('roles', roles)
