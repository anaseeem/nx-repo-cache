/**
 * NextAuth core setup for credential-based authentication.
 *
 * Responsibilities:
 * - Authorize users against MongoDB and bcrypt.
 * - Flatten selected user fields into JWT (jwtCallback) and expose to session.
 * - Sign and verify JWTs with a fixed algorithm.
 * - Provide a typed `getCurrentUser` helper.
 *
 * Security notes:
 * - Keep JWT secret in process.env.SECRET.
 * - Use `secure` cookies in production.
 *
 * @requires NPM:bcryptjs
 * @requires NPM:jsonwebtoken
 * @requires NPM:next-auth
 * @requires local:@jaqua/auth
 * @requires local:@jaqua/db
 * @requires local:@jaqua/shared/graphql
 * @requires process.env['SECRET']
 *
 * @copyright © 2020-2025 by J. Quader
 * @author A. Naseem
 * @author Dr. J. Quader
 */
import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions, type Session } from 'next-auth'
import type { JWT, JWTEncodeParams, JWTDecodeParams } from 'next-auth/jwt'
import { getServerSession } from 'next-auth/next'

import {
  COOKIE_NAME,
  JWT_ALG,
  createLog,
  type JwtUser
} from '../../../core/src'
import { mongodb } from '@jaqua/db'
import { User } from '@jaqua/shared/graphql'

const log = createLog('auth')

/**
 * Authorize a user via username/password.
 *
 * Flow:
 * 1) Fetch user by `username`.
 * 2) Verify password with bcrypt.
 * 3) Return user object without password if valid, otherwise `null`.
 *
 * @param creds An object with `username` and `password`.
 * @returns The user (without password) or `null` to signal invalid credentials.
 * @throws Error when DB connection fails or input is missing.
 */
export const authorize = async (
  creds?: Record<'username' | 'password', string> | undefined
): Promise<any> => {
  log('authorize:start', { u: creds?.username })
  if (!creds) throw new Error('Missing credentials')

  try {
    const db = await mongodb()
    if (!db) throw Error('DB connection failed')
    const Users = db.collection<User>('users')

    const userData = await Users.findOne({ username: creds.username })
    log(
      'authorize:userFromDb',
      userData
        ? {
            id: userData.id ?? (userData as any)._id,
            roles: userData.roles,
            hasPw: !!userData.password
          }
        : null
    )

    if (!userData?.password) return null
    const isValid = validatePassword(creds.password, userData.password)
    log('authorize:passwordValid', isValid)

    if (!isValid) return null
    const { password: _pw, ...user } = userData
    return user
  } catch (error) {
    console.error('[auth] validateUser:error', error)
  }
}

/**
 * Compare a plaintext password with a bcrypt hash.
 *
 * @param input Plaintext password from the login form.
 * @param db Bcrypt hash stored in the database.
 * @returns `true` when the password matches, else `false`.
 */
export const validatePassword = (input: string, db: string): boolean => {
  if (!(db && input)) return false
  return bcrypt.compareSync(input, db)
}

/**
 * NextAuth JWT callback.
 *
 * First successful sign-in: NextAuth passes `user`. We copy selected fields to `token`.
 * Subsequent requests: Only `token` is available; we keep it unchanged.
 *
 * @param params.token The mutable JWT container managed by NextAuth.
 * @param params.user The authenticated user on first sign-in (optional afterwards).
 * @returns The updated JWT container.
 */
export async function jwtCallback({
  token,
  user
}: {
  token: JWT
  user?: any | null
}): Promise<JWT> {
  if (user) {
    token['id'] = user.id
    token['username'] = user.username
    token['roles'] = user.roles
    token['professionalGroup'] = user.professionalGroup as string | undefined
  }
  log('jwt:callback', { username: token['username'] })
  return token
}

/**
 * NextAuth session callback.
 *
 * Copies selected fields from the JWT into `session.user` for client usage.
 *
 * @param params.session The session object to return to the client.
 * @param params.token The JWT container managed by NextAuth.
 * @returns The enriched session.
 */
export async function session({
  session,
  token
}: {
  session: Session
  token: JWT
}): Promise<Session> {
  const t = token as JwtUser
  session.user = {
    ...session.user,
    id: t.id ?? t.sub,
    username: t.username,
    roles: t.roles,
    professionalGroup: t.professionalGroup
  } as Session['user']
  log('session:result', session)
  return session
}

/**
 * NextAuth JWT encoder.
 *
 * Signs an object payload using `HS256`. Returns empty string when `token` is falsy
 * to follow NextAuth’s expected contract.
 *
 * @param param.secret The signing secret; can be a string or buffer.
 * @param param.token The payload to sign; when falsy, returns ''.
 * @returns A signed JWT string or ''.
 */
export const encode = async ({
  secret,
  token
}: JWTEncodeParams): Promise<string> => {
  log('jwt.encode:input', token)
  if (!token) return ''
  const signed = jwt.sign(token, secret, { algorithm: JWT_ALG })
  log('jwt.encode:signedLength', signed?.length)
  return signed
}

/**
 * NextAuth JWT decoder.
 *
 * Verifies a JWT string using `HS256` and returns the decoded payload
 * cast to NextAuth’s `JWT` shape.
 *
 * @param param.secret The verification secret; can be a string or buffer.
 * @param param.token The JWT string to verify; when falsy, returns `null`.
 * @returns The decoded JWT object or `null`.
 */
export const decode = async ({
  secret,
  token
}: JWTDecodeParams): Promise<JWT | null> => {
  if (!token) return null
  const decoded = jwt.verify(token, secret) as JWT
  log('jwt.decode:output', decoded)
  return decoded
}

/**
 * Get the current authenticated user from a server context.
 *
 * @returns The user object from the active session or `undefined` when not authenticated.
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  log('getCurrentUser:session', session)
  return session?.user
}

/**
 * Credential field configuration for the credentials provider.
 *
 * Note: Names must match form inputs and `authorize` expectations.
 */
export const credentials = {
  username: {
    label: 'Benutzername',
    type: 'text',
    placeholder: 'Benutzername',
    value: ''
  },
  password: {
    label: 'Passwort',
    type: 'password',
    placeholder: 'Passwort'
  }
}

/**
 * NextAuth configuration.
 *
 * - Provider: Credentials with `authorize`.
 * - Session: JWT strategy with 24h max age.
 * - JWT: custom encode/decode using HS256.
 * - Cookies: session token name and settings via `COOKIE_NAME`.
 * - Debug: enabled outside production.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials,
      authorize
    })
  ],
  callbacks: { jwt: jwtCallback, session },
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  secret: process.env['SECRET'] as string,
  debug: process.env.NODE_ENV !== 'production',
  jwt: { encode, decode },
  cookies: {
    sessionToken: {
      name: COOKIE_NAME,
      options: {
        path: '/',
        sameSite: 'lax',
        httpOnly:
          process.env.NODE_ENV === 'production' && !process.env['ISLOCAL'],
        secure:
          process.env.NODE_ENV === 'production' && !process.env['ISLOCAL'],
        domain:
          process.env.NODE_ENV === 'production' && process.env['COOKIE_DOMAIN']
            ? (process.env['ISLOCAL'] ? '' : '.') + process.env['COOKIE_DOMAIN']
            : 'localhost'
      }
    }
  }
}
