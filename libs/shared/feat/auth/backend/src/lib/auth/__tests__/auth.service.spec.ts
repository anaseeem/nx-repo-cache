import { UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'

// Mock the default export object from bcryptjs
jest.mock('bcryptjs', () => ({
  __esModule: true,
  default: { compare: jest.fn() }
}))

import bcrypt from 'bcryptjs'

describe('AuthService', () => {
  const users = {
    getUser: jest.fn(),
    findByLoginKey: jest.fn()
  }
  const jwt = { sign: jest.fn() }

  let service: AuthService

  beforeEach(() => {
    jest.clearAllMocks()
    service = new AuthService(users as any, jwt as any)
  })

  describe('validateUser', () => {
    it('throws when username or password missing', async () => {
      await expect(service.validateUser('', 'x')).rejects.toBeInstanceOf(
        UnauthorizedException
      )
      await expect(service.validateUser('u', '')).rejects.toBeInstanceOf(
        UnauthorizedException
      )
    })

    it('throws when user not found', async () => {
      users.getUser.mockResolvedValue(null)
      await expect(service.validateUser('u', 'p')).rejects.toBeInstanceOf(
        UnauthorizedException
      )
      expect(users.getUser).toHaveBeenCalledWith({ username: 'u' })
    })

    it('throws when password is wrong', async () => {
      users.getUser.mockResolvedValue({
        id: '1',
        username: 'u',
        password: 'hash'
      })
      ;(bcrypt.compare as jest.Mock).mockReturnValue(false)
      await expect(service.validateUser('u', 'p')).rejects.toBeInstanceOf(
        UnauthorizedException
      )
    })

    it('returns user without password on success', async () => {
      users.getUser.mockResolvedValue({
        id: '1',
        username: 'u',
        password: 'hash',
        roles: ['a']
      })
      ;(bcrypt.compare as jest.Mock).mockReturnValue(true)
      const res = await service.validateUser('u', 'p')
      expect(res).toEqual({ id: '1', username: 'u', roles: ['a'] })
    })
  })

  describe('validateUserByPayload', () => {
    it('throws when payload.username missing', async () => {
      await expect(
        service.validateUserByPayload({} as any)
      ).rejects.toBeInstanceOf(UnauthorizedException)
    })

    it('throws when user not found', async () => {
      users.getUser.mockResolvedValue(null)
      await expect(
        service.validateUserByPayload({ username: 'u' } as any)
      ).rejects.toBeInstanceOf(UnauthorizedException)
    })

    it('returns user without password', async () => {
      users.getUser.mockResolvedValue({
        id: '1',
        username: 'u',
        password: 'x',
        extra: 1
      })
      const res = await service.validateUserByPayload({ username: 'u' } as any)
      expect(res).toEqual({ id: '1', username: 'u', extra: 1 })
      expect(users.getUser).toHaveBeenCalledWith({ username: 'u' })
    })
  })

  describe('validatePassword', () => {
    it('delegates to bcrypt.compare', async () => {
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)
      const inputPass = 'u'
      const dbPass = 'p'
      const res = await service.validatePassword(inputPass, dbPass)
      expect(res).toBe(true)
      expect(bcrypt.compare).toHaveBeenCalledWith(inputPass, dbPass)
    })
  })

  describe('login', () => {
    it('signs payload and filters roles', async () => {
      jwt.sign.mockReturnValue('jwt-token')
      const user = { id: '1', username: 'u', roles: ['x', null, 'y'] } as any
      const res = await service.login(user)
      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          sub: '1',
          id: '1',
          username: 'u',
          roles: ['x', 'y']
        })
      )
      expect(res).toEqual({ access_token: 'jwt-token' })
    })

    it('sets undefined for missing fields', async () => {
      jwt.sign.mockReturnValue('t')
      const user = { id: null, username: undefined, roles: undefined } as any
      await service.login(user)
      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          sub: undefined,
          id: undefined,
          username: undefined
        })
      )
    })
  })

  describe('loginWithQrKey', () => {
    it('returns {success:false} when key not found', async () => {
      users.findByLoginKey.mockResolvedValue(null)
      await expect(service.loginWithQrKey('k')).resolves.toEqual({
        success: false
      })
      expect(jwt.sign).not.toHaveBeenCalled()
    })

    it('returns {success:true, token} when key valid', async () => {
      users.findByLoginKey.mockResolvedValue({ id: '2', username: 'qr' })
      jwt.sign.mockReturnValue('qr-token')
      const res = await service.loginWithQrKey('k')
      expect(users.findByLoginKey).toHaveBeenCalledWith('k')
      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({ sub: '2', username: 'qr' })
      )
      expect(res).toEqual({ success: true, token: 'qr-token' })
    })
  })
})
