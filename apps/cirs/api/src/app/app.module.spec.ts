/* eslint-disable @nx/enforce-module-boundaries */

/**
 * @fileoverview Unit tests for the main CIRS application module.
 * @description Comprehensive test suite to ensure all components and features function correctly.
 *
 * @author Dr. J. Quader
 * @copyright © 2025 by J. Quader
 */
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { JwtStrategy } from '@jaqua/auth/backend'

import { AppModule } from './app.module'

let moduleRef: TestingModule

beforeAll(async () => {
  // Mock ConfigService to provide necessary configuration
  const mockConfigService = {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'JWT_SECRET':
          return 'test-secret'
        default:
          return null
      }
    })
  }

  moduleRef = await Test.createTestingModule({
    imports: [
      AppModule,
      JwtModule.register({
        secret: mockConfigService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' }
      })
    ],
    providers: [
      JwtStrategy,
      { provide: ConfigService, useValue: mockConfigService }
    ]
  }).compile()
})

test('AppModule should be defined', () => {
  expect(AppModule).toBeDefined()
})
test('should have ConfigModule configured correctly', () => {
  const configService = moduleRef.get<ConfigService>(ConfigService)
  expect(configService).toBeDefined()
  expect(configService.get('JWT_SECRET')).toBe('test-secret')
})

test('AppModule imports ConfigModule globally', async () => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule]
  }).compile()

  const configModule = moduleRef.get(ConfigModule)
  expect(configModule).toBeDefined()
  expect(moduleRef.select(ConfigModule).get(ConfigModule)).toBeDefined()
})

// test('AppModule includes GraphQLModule setup', () => {
//   const moduleMetadata = Reflect.getMetadata('imports', AppModule)
//   const graphqlModule = moduleMetadata.find(
//     (mod: any) => mod.driver === ApolloDriver
//   )
//   expect(graphqlModule).toBeDefined()
//   expect(graphqlModule.playground).toBe(!process.env.NODE_ENV === 'production')
// })

// test('Proper environment config file paths are set', () => {
//   const correctEnvPath =
//     process.env.NODE_ENV === 'production'
//       ? './.env.production'
//       : './apps/cirs/api/.env.development'

//   expect(envFilePath[0]).toBe(correctEnvPath)
// })
