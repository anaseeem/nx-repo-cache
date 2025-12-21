import type { Session } from 'next-auth'
import { getRoles } from '../session.util'
import '../types/next-auth'

const makeSession = (roles?: string[] | null): Session =>
  ({ user: roles == null ? {} : { roles } }) as unknown as Session

describe('getRoles', () => {
  test.each([
    {
      name: 'null session',
      data: null,
      expected: { isAdmin: false, isEditor: false, isEditorOnly: false }
    },
    {
      name: 'no user object',
      data: {} as Session,
      expected: { isAdmin: false, isEditor: false, isEditorOnly: false }
    },
    {
      name: 'roles undefined',
      data: makeSession(undefined),
      expected: { isAdmin: false, isEditor: false, isEditorOnly: false }
    },
    {
      name: 'roles empty',
      data: makeSession([]),
      expected: { isAdmin: false, isEditor: false, isEditorOnly: false }
    },
    {
      name: 'viewer only',
      data: makeSession(['viewer']),
      expected: { isAdmin: false, isEditor: false, isEditorOnly: false }
    },
    {
      name: 'admin only',
      data: makeSession(['admin']),
      expected: { isAdmin: true, isEditor: false, isEditorOnly: false }
    },
    {
      name: 'editor only',
      data: makeSession(['editor']),
      expected: { isAdmin: false, isEditor: true, isEditorOnly: true }
    },
    {
      name: 'admin + editor',
      data: makeSession(['admin', 'editor']),
      expected: { isAdmin: true, isEditor: true, isEditorOnly: false }
    }
  ])('$name', ({ data, expected }) => {
    const result = getRoles({ data })
    expect(result).toEqual(expected)
  })
})
