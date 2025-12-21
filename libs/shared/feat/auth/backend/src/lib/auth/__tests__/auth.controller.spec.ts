import 'reflect-metadata'
import { UnauthorizedException, RequestMethod } from '@nestjs/common'
import {
  GUARDS_METADATA,
  PATH_METADATA,
  METHOD_METADATA
} from '@nestjs/common/constants'
import { Request as ExpressRequest } from 'express'

import { AuthController } from '../auth.controller'
import { LocalAuthGuard } from '../../..'

// Minimal User shape for the test
type User = { id: string; username: string }

describe('AuthController', () => {
  let controller: AuthController
  const authService = {
    login: jest.fn(),
    loginWithQrKey: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    controller = new AuthController(authService as any)
  })

  describe('metadata', () => {
    it('has @Controller("auth")', () => {
      const path = Reflect.getMetadata(PATH_METADATA, AuthController)
      expect(path).toBe('auth')
    })

    it('login route has @Post("login") and @UseGuards(LocalAuthGuard)', () => {
      const loginMethod = AuthController.prototype.login
      const path = Reflect.getMetadata(PATH_METADATA, loginMethod)
      const method = Reflect.getMetadata(METHOD_METADATA, loginMethod)
      const guards = Reflect.getMetadata(GUARDS_METADATA, loginMethod) as any[]

      expect(path).toBe('login')
      expect(method).toBe(RequestMethod.POST)
      expect(Array.isArray(guards)).toBe(true)
      // Guard class reference present
      expect(guards.some((g) => g === LocalAuthGuard)).toBe(true)
    })

    it('qr-login route has @Post("qr-login")', () => {
      const m = AuthController.prototype.loginWithQr
      const path = Reflect.getMetadata(PATH_METADATA, m)
      const method = Reflect.getMetadata(METHOD_METADATA, m)
      expect(path).toBe('qr-login')
      expect(method).toBe(RequestMethod.POST)
    })
  })

  describe('login()', () => {
    it('returns token for authenticated user', async () => {
      const user: User = { id: '1', username: 'u' }
      const req = { user } as unknown as ExpressRequest
      authService.login = jest.fn().mockResolvedValue({ accessToken: 'tok' })

      const res = await controller.login(req)

      expect(authService.login).toHaveBeenCalledWith(user as any)
      expect(res).toEqual({ accessToken: 'tok' })
    })

    it('throws UnauthorizedException if no user on req', async () => {
      const req = {} as ExpressRequest
      await expect(controller.login(req)).rejects.toBeInstanceOf(
        UnauthorizedException
      )
      expect(authService.login).not.toHaveBeenCalled()
    })
  })

  describe('loginWithQr()', () => {
    it('delegates to authService.loginWithQrKey', async () => {
      authService.loginWithQrKey = jest
        .fn()
        .mockResolvedValue({ accessToken: 'qr-token' })
      const res = await controller.loginWithQr({ loginKey: 'abc' })
      expect(authService.loginWithQrKey).toHaveBeenCalledWith('abc')
      expect(res).toEqual({ accessToken: 'qr-token' })
    })
  })
})
