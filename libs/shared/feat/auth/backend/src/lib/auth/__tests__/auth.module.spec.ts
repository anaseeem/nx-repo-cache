import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { AuthModule } from '../auth.module'
import { AuthService } from '../auth.service'
import { JwtStrategy, LocalStrategy } from '../../strategies'
import { AuthResolvers } from '../auth.resolvers'
import { GqlAuthGuard, GqlAuthGuardLocal } from '../../guards'

describe('AuthModule (wiring)', () => {
  const cfg = { getOrThrow: jest.fn(() => 'test-secret') }

  /*it('wires module correctly', async () => {
    const modRef = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [{ provide: ConfigService, useValue: cfg }]
    }).compile()

    // Provider existing
    expect(modRef.get(AuthService)).toBeDefined()
    expect(modRef.get(JwtStrategy)).toBeDefined()
    expect(modRef.get(LocalStrategy)).toBeDefined()
    expect(modRef.get(AuthResolvers)).toBeDefined()
    expect(modRef.get(GqlAuthGuard)).toBeDefined()
    expect(modRef.get(GqlAuthGuardLocal)).toBeDefined()

    // JWT-Config: HS256 + 5min
    const jwt = modRef.get(JwtService)
    const tok = await jwt.signAsync({ sub: '1' })
    const [h, p] = tok.split('.')
    const header = JSON.parse(Buffer.from(h, 'base64url').toString())
    const payload = JSON.parse(Buffer.from(p, 'base64url').toString())
    expect(header.alg).toBe('HS256')
    expect(payload.exp - payload.iat).toBe(300)
  })*/

  it('fails without SECRET', async () => {
    const badCfg = {
      getOrThrow: jest.fn(() => {
        throw new Error('missing')
      })
    }
    await expect(
      Test.createTestingModule({
        imports: [AuthModule],
        providers: [{ provide: ConfigService, useValue: badCfg }]
      }).compile()
    ).rejects.toThrow()
  })
})
