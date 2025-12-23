import { workspaceRoot } from '@nx/devkit'
import { nxE2EPreset } from '@nx/playwright/preset'
import { PlaywrightTestConfig, devices } from '@playwright/test'

export interface PlaywrightConfigOptions {
  appName: string
  port?: number
  host?: string
}

export function buildPlaywrightConfig(
  filename: string,
  options: PlaywrightConfigOptions
): PlaywrightTestConfig {
  const appName = options.appName
  const port = options.port ?? 3000
  const host = options.host ?? appName
  const baseURL = `http://${host}:${port}`

  return {
    ...nxE2EPreset(filename, { testDir: './src' }),
    use: {
      baseURL,
      trace: 'on-first-retry'
    },
    webServer: process.env['CI']
      ? undefined
      : {
          command: `npx nx run ${appName}:serve`,
          url: `http://localhost:${port}`,
          reuseExistingServer: true,
          cwd: workspaceRoot
        },
    reporter: [
      ['junit', { outputFile: `../../../reports/e2e/${appName}.xml` }]
    ],
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] }
      },
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] }
      },
      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] }
      }
    ]
  }
}
