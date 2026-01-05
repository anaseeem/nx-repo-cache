/**
 * @fileoverview Logger Typescript File
 * @description This file exports a Logger type and a function to create a logger with a specific
 * tag and enablement status. The logger function logs the tag and any arguments passed to it if
 * enabled, otherwise it does nothing.
 *
 * @requires npm:typescript
 *
 * @copyright © 2025 by Dr. J. Quader
 * @author Dr. J. Quader
 */

export type Logger = (...args: any[]) => void

export function createLog(
  tag: string,
  enabled = !['production', 'test'].includes(
    process.env['NODE_ENV'] || 'development'
  )
): Logger {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return enabled ? (...a: any[]) => console.log(`[${tag}]`, ...a) : () => {}
}
