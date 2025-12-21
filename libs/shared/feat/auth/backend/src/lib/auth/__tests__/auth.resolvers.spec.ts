import 'reflect-metadata'
import { GUARDS_METADATA } from '@nestjs/common/constants'
import { AuthResolvers } from '../auth.resolvers'
import { GqlAuthGuard, GqlAuthGuardLocal } from '../../guards'

describe('AuthResolvers', () => {
  const authService = { login: jest.fn() }

  beforeEach(() => jest.clearAllMocks())

  it('login() has @UseGuards(GqlAuthGuardLocal)', () => {
    const guards = Reflect.getMetadata(
      GUARDS_METADATA,
      AuthResolvers.prototype.login
    )
    expect(guards).toEqual(expect.arrayContaining([GqlAuthGuardLocal]))
  })

  it('getAuthenticatedUser() has @UseGuards(GqlAuthGuard)', () => {
    const guards = Reflect.getMetadata(
      GUARDS_METADATA,
      AuthResolvers.prototype.getAuthenticatedUser
    )
    expect(guards).toEqual(expect.arrayContaining([GqlAuthGuard]))
  })

  it('login() delegates to AuthService with ctx.req.user', async () => {
    const resolver = new AuthResolvers(authService as any)
    authService.login.mockResolvedValue({ access_token: 'token' })

    const ctx = { req: { user: { id: '1', username: 'alice' } } }
    const res = await resolver.login(ctx as any)

    expect(authService.login).toHaveBeenCalledWith({
      id: '1',
      username: 'alice'
    })
    expect(res).toEqual({ access_token: 'token' })
  })

  it('getAuthenticatedUser() returns the user directly', async () => {
    const resolver = new AuthResolvers(authService as any)
    const user = { id: '1', username: 'alice' } as any

    const result = await resolver.getAuthenticatedUser(user)
    expect(result).toBe(user)
  })
})
