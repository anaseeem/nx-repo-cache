export const COOKIE_NAME =
  process.env['NODE_ENV'] === 'production' && !process.env['ISLOCAL']
    ? '__Secure-next-auth.session-token'
    : 'next-auth.session-token'

export const JWT_ALG = 'HS256'
export const JWT_SECRET = () => process.env['SECRET'] as string
