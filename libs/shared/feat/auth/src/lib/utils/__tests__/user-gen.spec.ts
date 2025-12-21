import cases from 'jest-in-case'

import { BCRYPT, NANO_ID } from '@jaqua/regex'

import { generateUser } from '../user-gen.util'

/** Mocks */
const mockDate = new Date(2020, 1, 1)

beforeAll(() => {
  jest.useFakeTimers()
  jest.setSystemTime(mockDate)
})
beforeEach(() => {
  jest.clearAllMocks()
})
afterAll(() => jest.useRealTimers())

/** Tests */
describe('generateUser', () => {
  cases(
    'generateUser()',
    (opts) => {
      const user = generateUser(opts.username)

      expect(user.userId).toMatch(NANO_ID)
      expect(user.username).toBe(opts.username)
      expect(user.password).toMatch(BCRYPT)
      expect(user.speciality).toStrictEqual(['paediatrics'])
      expect(user.language).toBe('de')
      expect(user.createdAt).toStrictEqual(mockDate)
      expect(user.roles).toStrictEqual(opts.expectedRoles)
    },
    {
      'should return user dataset': {
        username: 'username',
        expectedRoles: []
      },
      'should return editor dataset': {
        username: 'editor',
        expectedRoles: ['editor']
      }
    }
  )
})
