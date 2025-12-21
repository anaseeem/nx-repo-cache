/**
 * @description This file contains tests for the LocalAuthGuard class. It checks if the class is defined
 * and if it extends the passport AuthGuard("local").
 *
 * @requires local:../gql-auth-local.guard.ts
 * @requires local:../local-auth.guard.ts
 *
 * @copyright © 2025 by Dr. J. Quader
 * @author Dr. J. Quader
 */

import { GqlAuthGuardLocal } from '../gql-auth-local.guard'
import { LocalAuthGuard } from '../local-auth.guard'

describe('LocalAuthGuard', () => {
  it('should be defined', () => {
    const guard = new LocalAuthGuard()
    expect(guard).toBeInstanceOf(LocalAuthGuard)
  })

  it('extends passport AuthGuard("local")', () => {
    const superProto = Object.getPrototypeOf(GqlAuthGuardLocal.prototype)
    expect(typeof superProto.canActivate).toBe('function')
    expect(typeof superProto.handleRequest).toBe('function')
  })
})
