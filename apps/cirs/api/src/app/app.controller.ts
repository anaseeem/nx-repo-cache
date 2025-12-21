/**
 * @fileoverview App controller
 * @description The main application controller handling API version retrieval.
 * @module AppController
 *
 * @requires NPM:@nestjs/common
 *
 * @author Dr. J. Quader
 * @copyright © 2021-2025 by J. Quader
 */
import { Controller, Get } from '@nestjs/common'

/**
 * The `AppController` class is responsible for managing the application's HTTP requests.
 * It provides endpoints that are commonly used in the application.
 */
@Controller()
export class AppController {
  /**
   * Retrieves the current version of the application.
   *
   * This handler method is bound to the root path using a GET request. It checks the environment
   * variable for 'VERSION' and returns it. If not set, it responds with a default message indicating
   * that the version is missing.
   *
   * @returns {string} - The version of the application or a missing message if unavailable.
   */
  @Get()
  version(): string {
    return process.env['VERSION'] || 'Version missing'
  }
}
