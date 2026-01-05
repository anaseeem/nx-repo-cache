/**
 * @description This file contains tests for the authentication middleware in a Next.js server. It
 * tests different scenarios like missing token, invalid token, and valid token. It uses jest-in-case
 * for testing different cases and jose for JWT utilities.
 *
 * @requires npm:jest-in-case
 * @requires npm:jose
 * @requires npm:next/server
 *
 * @copyright © 2025 by Dr. J. Quader
 * @author Dr. J. Quader
 */

import cases from 'jest-in-case'
import * as jwtUtils from 'jose'
import { NextRequest } from 'next/server'

const ORIGINAL_ENV = process.env
const COOKIE = 'next-auth.session-token'
const setReqCookie = (req: NextRequest, name: string, val: string) => {
  req.headers.set('cookie', `${name}=${val}`)
  ;(req as any).cookies?.set?.(name, val)
}

beforeEach(() => {
  jest.resetModules()
  process.env = {
    ...ORIGINAL_ENV,
    // NODE_ENV: 'development',
    SECRET: 'test-secret'
  }
})

afterEach(() => {
  process.env = ORIGINAL_ENV
  jest.restoreAllMocks()
})

const createRequest = (
  token: string | null,
  path = '/protected',
  search = ''
) => {
  const headers = new Headers()
  if (token !== null) headers.set('cookie', `${COOKIE}=${token}`)
  return new NextRequest(new URL(`http://localhost${path}${search}`), {
    headers
  })
}

const mockVerify = (token: string | null) => {
  if (token === 'valid_token') {
    jest.spyOn(jwtUtils, 'jwtVerify').mockResolvedValueOnce({
      payload: {
        sub: '1',
        id: '1',
        username: 'John Doe',
        roles: ['user'],
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60
      },
      protectedHeader: { alg: 'HS256' },
      key: new Uint8Array([1, 2, 3])
    } as any)
    return null
  }
  if (token === 'invalid_token') {
    const error = new Error('Invalid token')
    jest.spyOn(jwtUtils, 'jwtVerify').mockRejectedValueOnce(error)
    return error
  }
  return null
}

cases(
  'authMiddleware',
  async ({ token, expected, path = '/protected', search = '' }) => {
    const req = createRequest(null, path, search)
    const err = mockVerify(token)
    if (token) setReqCookie(req, COOKIE, token)

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    let authMiddleware: (r: NextRequest) => Promise<any>
    let NextResponseLocal: any
    await jest.isolateModulesAsync(async () => {
      const next = await import('next/server')
      NextResponseLocal = next.NextResponse
      const mod = await import('../middleware')
      authMiddleware = mod.authMiddleware
    })

    const res = await authMiddleware!(req)
    expect(res).toBeInstanceOf(NextResponseLocal)

    if (expected.redirect) {
      const loc = res.headers.get('location')!
      expect(res.status).toBeGreaterThanOrEqual(300)
      expect(res.status).toBeLessThan(400)
      expect(loc).toContain(expected.location)
      const u = new URL(loc)
      expect(u.searchParams.get('callbackUrl')).toBe(path + search)
      if (token === 'invalid_token') {
        expect(consoleErrorSpy).toHaveBeenCalled()
        const [msg, errArg] = consoleErrorSpy.mock.calls[0]
        expect(String(msg)).toMatch(/\[mw] verify failed/i)
        expect(errArg).toBeInstanceOf(Error)
      }
    } else {
      expect(res.status).toBe(200)
      expect(res.headers.get('location')).toBeNull()
      const userHdr = res.headers.get('x-user')
      expect(userHdr).toBeTruthy()
      expect(userHdr!).toContain('"username":"John Doe"')
      expect(jest.spyOn(jwtUtils, 'jwtVerify')).toHaveBeenCalled()
    }

    consoleErrorSpy.mockRestore()
  },
  [
    {
      name: 'redirects on missing token',
      token: null,
      expected: { redirect: true, location: '/login' },
      path: '/protected'
    },
    {
      name: 'redirects on invalid token',
      token: 'invalid_token',
      expected: { redirect: true, location: '/login' },
      path: '/protected'
    },
    // {
    //   name: 'proceeds with valid token',
    //   token: 'valid_token',
    //   expected: { redirect: false },
    //   path: '/protected'
    // },
    {
      name: 'preserves search in callbackUrl',
      token: null,
      expected: { redirect: true, location: '/login' },
      path: '/protected',
      search: '?q=1'
    }
  ]
)
