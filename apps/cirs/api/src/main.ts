/**
 * @copyright © 2021-2025 by J. Quader
 * @author Dr. J. Quader
 */
import { fixtures } from '@jaqua/cirs/util/factories'
import { main } from '@jaqua/backend'

import { AppModule, CorsOption, corsOptions } from './app/app.module'

/**
 * Initializes the main application with specified configurations.
 *
 * @function
 * @name initializeApp
 * @param {typeof AppModule} appModule - The main application module for initialization.
 * @param {CorsOption} corsOpts - Configuration options for CORS.
 * @param {Function} fixtureData - Function call to retrieve initial fixture data.
 * @param {boolean} isProduction - Flag indicating if the environment is production.
 */
function initializeApp(
  appModule: typeof AppModule,
  corsOpts: CorsOption,
  fixtureData: any,
  isProduction: boolean
): void {
  main(appModule, corsOpts, fixtureData, isProduction)
}

initializeApp(AppModule, corsOptions, fixtures(), false)

export { AppModule }
