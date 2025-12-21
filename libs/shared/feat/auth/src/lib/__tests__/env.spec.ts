/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @fileoverview Test file for environment variables and constants
 * @description This file contains tests for the behavior of environment variables and constants
 * in different scenarios. It includes tests for the COOKIE_NAME and JWT_SECRET constants.
 *
 * @requires NPM:jest
 *
 * @copyright © 2025 by Dr. J. Quader
 */

const ORIGINAL_ENV = process.env

beforeEach(() => {
  jest.resetModules()
  process.env = { ...ORIGINAL_ENV }
})

afterEach(() => {
  process.env = ORIGINAL_ENV
})

const setNodeEnv = (value: string) => {
  Object.defineProperty(process.env, 'NODE_ENV', {
    value,
    writable: true,
    configurable: true,
    enumerable: true
  })
}

test('COOKIE_NAME: secure in prod when not local', () => {
  setNodeEnv('production')
  delete process.env['ISLOCAL']
  const { COOKIE_NAME } = require('../constants')
  expect(COOKIE_NAME).toBe('__Secure-next-auth.session-token')
})

test('COOKIE_NAME: non-secure when local flag set', () => {
  setNodeEnv('production')
  process.env['ISLOCAL'] = '1'
  const { COOKIE_NAME } = require('../constants')
  expect(COOKIE_NAME).toBe('next-auth.session-token')
})

test('COOKIE_NAME: non-prod', () => {
  setNodeEnv('development')
  const { COOKIE_NAME } = require('../constants')
  expect(COOKIE_NAME).toBe('next-auth.session-token')
})

test('JWT_SECRET returns env value', () => {
  process.env['SECRET'] = 's'
  const { JWT_SECRET } = require('../constants')
  expect(JWT_SECRET()).toBe('s')
})
