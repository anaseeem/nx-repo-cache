/**
 * @fileoverview Middleware for authentication in Next.js applications, verifying user sessions
 * using JWTs.
 * @description Provides middleware function to handle requests requiring authentication by
 * checking and verifying session tokens.
 * @module AuthMiddleware
 *
 * @requires NPM:jose
 * @requires NPM:next/server
 * @requires local:@/core
 * @requires process.env['SECRET']
 *
 * @copyright © 2025 by J. Quader
 * @author Dr. J. Quader
 */
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_NAME, createLog } from '../../../src';

const log = createLog('mw');

/**
 * Options object for configuring the middleware behavior.
 */
type MiddlewareOptions = { loginPath: string };

/**
 * Middleware function to validate the session token from incoming requests.
 * Redirects to login if validation fails or no session is present.
 *
 * @param request The incoming Next.js server request.
 * @param options Configuration for the middleware.
 * @returns A promise resolving to a Next.js server response, with appended headers
 * if authenticated, or a redirection response otherwise.
 */
export async function authMiddleware(
  request: NextRequest,
  options: MiddlewareOptions = { loginPath: '/login' },
) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  log('cookie', { present: !!token, path: request.nextUrl.pathname });
  if (!token) return redirectToLogin(request, options.loginPath);

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env['SECRET']),
    );
    log('payloadPreview', {
      sub: payload.sub,
      username: (payload as any).username,
    });

    const username = (payload as any)?.username;
    if (!username) return redirectToLogin(request, options.loginPath);

    const userHeader = JSON.stringify({
      id: (payload as any).id ?? payload.sub,
      username,
      roles: (payload as any).roles,
      professionalGroup: (payload as any).professionalGroup,
      iat: payload.iat,
      exp: payload.exp,
    });

    const headers = new Headers(request.headers);
    headers.set('x-user', userHeader);
    return NextResponse.next({ request: { headers } });
  } catch (e) {
    console.error('[mw] verify failed', e);
    return redirectToLogin(request, options.loginPath);
  }
}

/**
 * Redirects the request to a login page.
 *
 * @param request The server request object initiating the redirect.
 * @param loginPath The path to which users should be redirected for login.
 * @returns A Next.js server response redirecting to the specified login path.
 */
function redirectToLogin(req: NextRequest, loginPath: string) {
  const url = new URL(loginPath, req.url);
  url.searchParams.set(
    'callbackUrl',
    req.nextUrl.pathname + req.nextUrl.search,
  );
  return NextResponse.redirect(url);
}
