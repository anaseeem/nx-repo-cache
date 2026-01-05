import { UnauthorizedException } from '@nestjs/common'
import { JwtAuthGuard } from '../jwt-auth.guard'

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard

  beforeEach(() => {
    jest.clearAllMocks()
    guard = new JwtAuthGuard()
  })

  it('returns user when no error and user present', () => {
    const user = { id: 'u1' }
    const res = guard.handleRequest(null, user)
    expect(res).toBe(user)
  })

  it('throws provided error when err is set', () => {
    const err = new Error('boom')
    expect(() => guard.handleRequest(err, null as any)).toThrow(err)
  })

  it('throws UnauthorizedException when user is falsy and no error', () => {
    expect(() => guard.handleRequest(null, null as any)).toThrow(
      UnauthorizedException
    )
  })
})
