// nextAuth.spec.ts
import type { JWT } from 'next-auth/jwt'
import type { Session } from 'next-auth'

beforeEach(() => {
  jest.resetModules()
  jest.clearAllMocks()
})

describe('validatePassword', () => {
  it('returns false for empty input', async () => {
    await jest.isolateModules(async () => {
      const mod = await import('../nextAuth')
      expect(mod.validatePassword('', 'hash')).toBe(false)
      expect(mod.validatePassword('pw', '')).toBe(false)
    })
  })
})

describe('authorize', () => {
  it('returns null for unknown user', async () => {
    jest.doMock('@jaqua/db', () => ({
      mongodb: jest.fn().mockResolvedValue({
        collection: () => ({ findOne: jest.fn().mockResolvedValue(null) })
      })
    }))
    await jest.isolateModules(async () => {
      const { authorize } = await import('../nextAuth')
      const res = await authorize({ username: 'x', password: 'y' })
      expect(res).toBeNull()
    })
  })

  it('returns user without password for valid creds', async () => {
    const findOne = jest.fn().mockResolvedValue({
      id: 'u1',
      username: 'admin',
      roles: ['admin'],
      password: '$2a$10$hash'
    })
    jest.doMock('@jaqua/db', () => ({
      mongodb: jest.fn().mockResolvedValue({
        collection: () => ({ findOne })
      })
    }))
    await jest.isolateModules(async () => {
      const mod = await import('../nextAuth')
      jest.spyOn(mod, 'validatePassword').mockReturnValue(true)
      const res = await mod.authorize({ username: 'admin', password: 'pw' })
      expect(findOne).toHaveBeenCalledWith({ username: 'admin' })
      expect(res).toEqual(
        expect.objectContaining({
          id: 'u1',
          username: 'admin',
          roles: ['admin']
        })
      )
    })
  })
})

describe('jwt callbacks', () => {
  it('jwtCallback flattens user fields', async () => {
    await jest.isolateModules(async () => {
      const { jwtCallback } = await import('../nextAuth')
      const token: JWT = {}
      const user = { id: 'u1', username: 'admin', roles: ['admin'] }
      const out = await jwtCallback({ token, user })
      expect(out).toMatchObject({
        id: 'u1',
        username: 'admin',
        roles: ['admin']
      })
    })
  })

  it('session copies fields from token', async () => {
    await jest.isolateModules(async () => {
      const { session } = await import('../nextAuth')
      const sess = { user: null } as unknown as Session
      const token = { id: 'u1', username: 'admin', roles: ['admin'] } as JWT
      const out = await session({ session: sess, token })
      expect(out.user).toMatchObject({
        id: 'u1',
        username: 'admin',
        roles: ['admin']
      })
    })
  })
})

describe('encode/decode', () => {
  it('encode signs when token present', async () => {
    const sign = jest.fn(() => 'signed.jwt.token')
    jest.doMock('jsonwebtoken', () => ({ sign, verify: jest.fn() }))

    await jest.isolateModules(async () => {
      const { encode } = await import('../nextAuth')
      const s = await encode({
        secret: 'sec',
        token: { username: 'admin' } as JWT
      })
      expect(sign).toHaveBeenCalled()
      expect(s).toBe('signed.jwt.token')
    })
  })

  it('encode returns empty string for falsy token', async () => {
    const sign = jest.fn()
    jest.doMock('jsonwebtoken', () => ({ sign, verify: jest.fn() }))

    await jest.isolateModules(async () => {
      const { encode } = await import('../nextAuth')
      const s = await encode({ secret: 'sec', token: null as unknown as JWT })
      expect(s).toBe('')
      expect(sign).not.toHaveBeenCalled()
    })
  })

  it('decode verifies when token present', async () => {
    const verify = jest.fn(() => ({ username: 'admin' }))
    jest.doMock('jsonwebtoken', () => ({ sign: jest.fn(), verify }))

    await jest.isolateModules(async () => {
      const { decode } = await import('../nextAuth')
      const d = await decode({ secret: 'sec', token: 'abc' })
      expect(verify).toHaveBeenCalled()
      expect(d).toMatchObject({ username: 'admin' })
    })
  })

  it('decode returns null for falsy token', async () => {
    const verify = jest.fn()
    jest.doMock('jsonwebtoken', () => ({ sign: jest.fn(), verify }))

    await jest.isolateModules(async () => {
      const { decode } = await import('../nextAuth')
      const d = await decode({ secret: 'sec', token: '' })
      expect(d).toBeNull()
      expect(verify).not.toHaveBeenCalled()
    })
  })
})
