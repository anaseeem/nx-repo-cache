/**
 * @description This file contains tests for the createLog function. It includes tests for different
 * scenarios such as when NODE_ENV is undefined, when NODE_ENV is set to production or development,
 * and when the log function is explicitly enabled or disabled. It also tests that the log function
 * correctly forwards all arguments.
 *
 * @requires npm:jest
 *
 * @copyright © 2025 by Dr. J. Quader
 * @author Dr. J. Quader
 */

import { createLog } from '../log'

describe('createLog', () => {
  const ORIGINAL_ENV = process.env
  let logSpy: jest.SpyInstance<void, any[]>

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV }
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined)
  })

  afterEach(() => {
    process.env = ORIGINAL_ENV
    jest.restoreAllMocks()
  })

  const setNodeEnv = (value: string) => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value,
      writable: true,
      configurable: true,
      enumerable: true
    })
  }

  const unsetNodeEnv = () => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete (process.env as any)['NODE_ENV']
  }

  it('enabled by default when NODE_ENV is undefined', () => {
    unsetNodeEnv()
    const log = createLog('AUTH')
    log('hello', 123)
    expect(logSpy).toHaveBeenCalledWith('[AUTH]', 'hello', 123)
  })

  it('disabled by default when NODE_ENV is production', () => {
    setNodeEnv('production')
    const log = createLog('AUTH')
    log('ignored')
    expect(logSpy).not.toHaveBeenCalled()
  })

  it('explicit enabled overrides env', () => {
    setNodeEnv('production')
    const log = createLog('AUTH', true)
    log('x')
    expect(logSpy).toHaveBeenCalledWith('[AUTH]', 'x')
  })

  it('explicit disabled overrides env', () => {
    setNodeEnv('development')
    const log = createLog('AUTH', false)
    log('x')
    expect(logSpy).not.toHaveBeenCalled()
  })

  it('forwards all args', () => {
    setNodeEnv('development')
    const args = [0, false, { a: 1 }, [1, 2], 's']
    const log = createLog('TAG')
    log(...args)
    expect(logSpy).toHaveBeenCalledWith('[TAG]', ...args)
  })
})
