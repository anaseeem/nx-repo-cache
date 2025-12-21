import { toUndef, flattenPayload } from '../helper'

describe('toUndef', () => {
  it('returns undefined for null and undefined', () => {
    expect(toUndef(null)).toBeUndefined()
    expect(toUndef(undefined)).toBeUndefined()
  })

  it('passes through falsy non-nullish values', () => {
    expect(toUndef(0)).toBe(0)
    expect(toUndef(false)).toBe(false)
    expect(toUndef('')).toBe('')
    const n = Number.NaN
    const r = toUndef(n as number)
    expect(Number.isNaN(r as number)).toBe(true)
  })

  it('keeps object identity', () => {
    const obj = { a: 1 }
    expect(toUndef(obj)).toBe(obj)
  })
})

describe('flattenPayload', () => {
  it('returns user when user is truthy', () => {
    const user = { id: 1, roles: ['x'] }
    const payload = { user, meta: 'm' }
    const res = flattenPayload(payload)
    expect(res).toBe(user)
    expect(res).toEqual({ id: 1, roles: ['x'] })
  })

  it('returns payload when user is missing', () => {
    const payload = { meta: 1 }
    const res = flattenPayload(payload as { user?: any; meta: number })
    expect(res).toBe(payload)
  })

  it('returns payload when user is nullish or falsy', () => {
    const cases: any[] = [null, undefined, 0, false, '']
    for (const u of cases) {
      const p = { user: u, meta: 'x' } as { user?: any; meta: string }
      const res = flattenPayload(p)
      expect(res).toBe(p)
    }
  })

  it('treats empty object user as truthy', () => {
    const user = {}
    const p = { user, meta: 1 }
    const res = flattenPayload(p)
    expect(res).toBe(user)
  })
})
