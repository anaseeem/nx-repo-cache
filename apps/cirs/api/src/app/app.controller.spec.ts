/**
 * @fileoverview Test suite for App controller
 * @description Tests for verifying the functionality of the application controller's version endpoint.
 *
 * @author Dr. J. Quader
 * @copyright © 2025 by J. Quader
 */
import { Test } from '@nestjs/testing'

import { AppController } from './app.controller'

describe('AppController', () => {
  let appController: AppController

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController]
    }).compile()

    appController = moduleRef.get<AppController>(AppController)
  })

  test('should return version from environment variable', () => {
    process.env['VERSION'] = '1.2.3'
    const response = appController.version()
    expect(response).toBe('1.2.3')
  })

  test('should return "Version missing" when VERSION env variable is not set', () => {
    delete process.env['VERSION']
    const response = appController.version()
    expect(response).toBe('Version missing')
  })
})
