/* eslint-disable @typescript-eslint/no-empty-function */
// gql-auth.guard.spec.ts
import 'reflect-metadata'
import { UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JsonWebTokenError } from 'jsonwebtoken'
import type { ExecutionContext } from '@nestjs/common'
import { GqlAuthGuard } from '../gql-auth.guard'

describe('GqlAuthGuard', () => {
  let reflector: Reflector
  let guard: GqlAuthGuard

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    reflector = { get: jest.fn() } as any
    guard = new GqlAuthGuard(reflector)
  })

  describe('getRequest', () => {
    it('returns request from GraphQL context and injects variables into req.body', () => {
      const req: any = { headers: { a: 1 } }
      const variables = { x: 1, y: 2 }

      const gqlCtxMock = {
        getContext: () => ({ req }),
        getArgs: () => ({ variables })
      }

      const createSpy = jest
        .spyOn(GqlExecutionContext, 'create')
        .mockReturnValue(gqlCtxMock as any)

      // ExecutionContext is unused because GqlExecutionContext.create is mocked
      const ctx = {} as ExecutionContext

      const out = guard.getRequest(ctx)
      expect(createSpy).toHaveBeenCalledWith(ctx)
      expect(out).toBe(req)
      expect(req.body).toEqual(variables)
    })

    it('falls back to HTTP request when GraphQL context has no req', () => {
      const httpReq: any = { method: 'GET' }

      const gqlCtxMock = {
        getContext: () => undefined,
        getArgs: () => ({})
      }
      jest
        .spyOn(GqlExecutionContext, 'create')
        .mockReturnValue(gqlCtxMock as any)

      const switchToHttp = () => ({
        getRequest: () => httpReq
      })
      const ctx = { switchToHttp } as unknown as ExecutionContext

      const out = guard.getRequest(ctx)
      expect(out).toBe(httpReq)
      expect(out.body).toBeUndefined()
    })

    it('does not overwrite body if variables are absent', () => {
      const req: any = { body: { keep: true } }
      const gqlCtxMock = {
        getContext: () => ({ req }),
        getArgs: () => ({}) // no variables
      }
      jest
        .spyOn(GqlExecutionContext, 'create')
        .mockReturnValue(gqlCtxMock as any)

      const out = guard.getRequest({} as ExecutionContext)
      expect(out).toBe(req)
      expect(req.body).toEqual({ keep: true })
    })
  })

  describe('handleRequest', () => {
    const baseArgs = {
      context: { getHandler: () => function handler() {} } as any,
      status: undefined as any
    }

    it('returns user when route is public', () => {
      ;(reflector.get as jest.Mock).mockReturnValue(true) // isPublic
      const user = { id: 'u1' } as any
      const res = guard.handleRequest(
        null,
        user,
        undefined as any,
        baseArgs.context,
        baseArgs.status
      )
      expect(res).toBe(user)
    })

    it('throws UnauthorizedException("Invalid Token!") for JsonWebTokenError', () => {
      ;(reflector.get as jest.Mock).mockReturnValue(false)
      const info = new JsonWebTokenError('bad')
      expect(() =>
        guard.handleRequest(
          null,
          false as any,
          info,
          baseArgs.context,
          baseArgs.status
        )
      ).toThrow(new UnauthorizedException('Invalid Token!'))
    })

    it('rethrows provided error when err is set', () => {
      ;(reflector.get as jest.Mock).mockReturnValue(false)
      const err = new Error('boom')
      expect(() =>
        guard.handleRequest(
          err,
          null as any,
          undefined as any,
          baseArgs.context,
          baseArgs.status
        )
      ).toThrow(err)
    })

    it('throws UnauthorizedException when user is falsy', () => {
      ;(reflector.get as jest.Mock).mockReturnValue(false)
      expect(() =>
        guard.handleRequest(
          null,
          null as any,
          undefined as any,
          baseArgs.context,
          baseArgs.status
        )
      ).toThrow(UnauthorizedException)
    })

    it('delegates to base AuthGuard.handleRequest when all checks pass', () => {
      ;(reflector.get as jest.Mock).mockReturnValue(false)
      const user = { id: 'u1' } as any

      // Spy on the parent class implementation by walking the prototype chain:
      const superProto = Object.getPrototypeOf(Object.getPrototypeOf(guard)) // parent prototype
      const superSpy = jest
        .spyOn(superProto, 'handleRequest')
        .mockReturnValue('delegated' as any)

      const res = guard.handleRequest(
        null,
        user,
        undefined as any,
        baseArgs.context,
        baseArgs.status
      )
      expect(superSpy).toHaveBeenCalledWith(
        null,
        user,
        undefined,
        baseArgs.context,
        baseArgs.status
      )
      expect(res).toBe('delegated')

      superSpy.mockRestore()
    })
  })
})
