/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * @description This file contains the tests for the GqlAuthGuardLocal class. It tests the getRequest
 * and handleRequest methods under different conditions.
 *
 * @requires npm:reflect-metadata
 * @requires npm:@nestjs/core
 * @requires npm:@nestjs/graphql
 * @requires npm:@nestjs/common
 * @requires local:../gql-auth-local.guard.ts
 *
 * @copyright © 2025 by Dr. J. Quader
 * @author Dr. J. Quader
 */

import 'reflect-metadata'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import type { ExecutionContext } from '@nestjs/common'
import { GqlAuthGuardLocal } from '../gql-auth-local.guard'

describe('GqlAuthGuardLocal', () => {
  let reflector: Reflector
  let guard: GqlAuthGuardLocal

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    reflector = { get: jest.fn() } as any
    guard = new GqlAuthGuardLocal(reflector)
  })

  describe('getRequest', () => {
    it('extracts username/password from GraphQL variables into req.body', () => {
      const req: any = {
        body: {
          variables: { input: { username: 'alice', password: 'secret' } }
        }
      }
      const gqlCtxMock = {
        getContext: () => ({ req }),
        switchToHttp: () => ({ getRequest: () => ({}) }) // not used in this path
      }
      const createSpy = jest
        .spyOn(GqlExecutionContext, 'create')
        .mockReturnValue(gqlCtxMock as any)

      const ctx = {} as ExecutionContext
      const out = guard.getRequest(ctx)

      expect(createSpy).toHaveBeenCalledWith(ctx)
      expect(out).toBe(req)
      expect(req.body.username).toBe('alice')
      expect(req.body.password).toBe('secret')
    })

    it('falls back to HTTP request when GQL context has no req', () => {
      const httpReq: any = { body: {} }
      const gqlCtxMock = {
        getContext: () => ({}),
        switchToHttp: () => ({ getRequest: () => httpReq })
      }
      jest
        .spyOn(GqlExecutionContext, 'create')
        .mockReturnValue(gqlCtxMock as any)

      const out = guard.getRequest({} as ExecutionContext)
      expect(out).toBe(httpReq)
      // no variables -> undefined assignment results
      expect(out.body?.username).toBeFalsy()
      expect(out.body?.password).toBeFalsy()
    })

    it('handles missing nested properties without throwing', () => {
      const req: any = { body: {} }
      const gqlCtxMock = {
        getContext: () => ({ req }),
        switchToHttp: () => ({ getRequest: () => ({}) })
      }
      jest
        .spyOn(GqlExecutionContext, 'create')
        .mockReturnValue(gqlCtxMock as any)

      const out = guard.getRequest({} as ExecutionContext)
      expect(out).toBe(req)
      expect(req.body.username).toBeFalsy()
      expect(req.body.password).toBeFalsy()
    })
  })

  describe('handleRequest', () => {
    const base = {
      context: { getHandler: () => function h() {} } as any,
      status: undefined as any
    }

    it('returns user when route is public', () => {
      ;(reflector.get as jest.Mock).mockReturnValue(true)
      const user = { id: 'u1' } as any
      const res = guard.handleRequest(
        null,
        user,
        undefined as any,
        base.context,
        base.status
      )
      expect(res).toBe(user)
    })

    it('re-throws provided error', () => {
      ;(reflector.get as jest.Mock).mockReturnValue(false)
      const err = new Error('boom')
      expect(() =>
        guard.handleRequest(
          err,
          null as any,
          undefined as any,
          base.context,
          base.status
        )
      ).toThrow(err)
    })

    it('delegates to base AuthGuard.handleRequest when no error', () => {
      ;(reflector.get as jest.Mock).mockReturnValue(false)
      const user = { id: 'u1' } as any

      // spy on parent (AuthGuard) handleRequest
      const superProto = Object.getPrototypeOf(Object.getPrototypeOf(guard))
      const superSpy = jest
        .spyOn(superProto, 'handleRequest')
        .mockReturnValue('ok' as any)

      const res = guard.handleRequest(
        null,
        user,
        undefined as any,
        base.context,
        base.status
      )
      expect(superSpy).toHaveBeenCalledWith(
        null,
        user,
        undefined,
        base.context,
        base.status
      )
      expect(res).toBe('ok')

      superSpy.mockRestore()
    })
  })
})
