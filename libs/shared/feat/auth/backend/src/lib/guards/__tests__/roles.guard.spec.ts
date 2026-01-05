/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * @description This file contains the unit tests for the RolesGuard class. The RolesGuard class is used
 * to enforce role-based access control in the application. The tests ensure that the guard behaves as
 * expected under different scenarios.
 *
 * @requires npm:@nestjs/common
 * @requires npm:@nestjs/core
 * @requires npm:@nestjs/graphql
 * @requires local:../roles.guard.ts
 *
 * @copyright © 2025 by Dr. J. Quader
 * @author Dr. J. Quader
 */

import { UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { RolesGuard } from '../roles.guard'

describe('RolesGuard', () => {
  let reflector: Reflector
  let guard: RolesGuard
  let context: any

  beforeEach(() => {
    jest.clearAllMocks()
    reflector = { get: jest.fn() } as any
    guard = new RolesGuard(reflector)
    context = { getHandler: () => function handler() {} }
    jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
      getContext: () => ({ req: { user: { roles: ['user'] } } })
    } as any)
  })

  it('returns true when route is public', () => {
    ;(reflector.get as jest.Mock).mockImplementation(
      (k: string) => k === 'isPublic'
    )
    expect(guard.canActivate(context as any)).toBe(true)
  })

  it('throws UnauthorizedException when no user', () => {
    ;(reflector.get as jest.Mock).mockImplementation((key: string) =>
      key === 'roles' ? ['user'] : false
    )
    jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
      getContext: () => ({ req: {} })
    } as any)

    expect(() => guard.canActivate(context as any)).toThrow(
      UnauthorizedException
    )
  })

  it('throws UnauthorizedException when no roles metadata', () => {
    ;(reflector.get as jest.Mock).mockImplementation(() => false)
    jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
      getContext: () => ({ req: { user: { roles: ['x'] } } })
    } as any)
    expect(() => guard.canActivate(context as any)).toThrow(
      UnauthorizedException
    )
  })
})
