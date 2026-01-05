import cases from 'jest-in-case'

import { hasRole } from '../role.util'

describe('hasRole', () => {
  cases(
    'should correctly determine if user has roles',
    (opts) => {
      const result = hasRole(opts.roles, opts.userRoles)
      expect(result).toBe(opts.expected)
    },
    [
      {
        name: 'user has required role',
        roles: ['user'],
        userRoles: ['user', 'editor'],
        expected: true
      },
      {
        name: 'user does not have required role',
        roles: ['editor'],
        userRoles: ['admin'],
        expected: false
      },
      {
        name: 'no roles required',
        roles: [],
        userRoles: ['admin'],
        expected: true
      },
      {
        name: 'multiple roles present',
        roles: ['admin', 'editor'],
        userRoles: ['admin', 'user'],
        expected: true
      },
      {
        name: 'multiple roles present but without required role',
        roles: ['admin'],
        userRoles: ['user', 'editor'],
        expected: false
      }
    ]
  )
})
