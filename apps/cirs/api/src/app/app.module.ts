/**
 * @fileoverview Entry point for the CIRS application module.
 * @description Configures and initializes the core modules and services required by the
 * application.
 * @module AppModule
 *
 * @requires NPM:nestjs/apollo - Provides ApolloDriver and its configuration options.
 * @requires NPM:@nestjs/common - Essential NestJS common decorators and utilities.
 * @requires NPM:nestjs/config - For managing application configuration settings.
 * @requires NPM:@nestjs/graphql - To integrate GraphQL with NestJS applications.
 * @requires local:@jaqua/auth
 * @requires local:@jaqua/backend
 * @requires local:@jaqua/user
 * @requires local:./app.controller.ts - Main application controller handling API endpoints.
 * @requires local:./cirs/cirs.module.ts - CIRS specific module containing business logic.
 * @requires local:./schedule/schedule.module.ts - Scheduling module to manage task scheduling.
 *
 * @author Dr. J. Quader
 * @copyright © 2021-2025 by J. Quader
 */
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { AuthModule } from '@jaqua/auth/backend'
import { AuthUserBindingModule } from '@jaqua/backend'
import { UserModule } from '@jaqua/user'
import { HealthCheckModule } from '@jaqua/shared/util/health-check'

import { AppController } from './app.controller'
import { CirsModule } from './cirs/cirs.module'
import { ScheduleModule } from './schedule/schedule.module'

// Determines if the app is in production mode based on environment variable.
const isProduction = process.env.NODE_ENV === 'production'

// Defines path configurations based on environment.
const root = isProduction ? './' : 'apps/cirs/api/'
const envFilePath = [
  root + (isProduction ? '.env.production' : '.env.development')
]
const typePaths = [root + '**/*.graphql']

// If not in production, additional files are included.
if (!isProduction) {
  envFilePath.push('.env.local')
  typePaths.push(
    'libs/shared/feat/auth/**/*.graphql',
    'libs/shared/feat/modules/user/**/*.graphql',
    'libs/shared/feat/modules/common/**/*.graphql'
  )
}

export interface CorsOption {
  credentials: boolean
  origin: boolean
}

// Configuration options for CORS.
export const corsOptions = { credentials: true, origin: true }

/**
 * Main application module for CIRS that imports necessary sub-modules,
 * configures GraphQL, and sets environment options.
 */
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths,
      introspection: !isProduction
    }),
    AuthUserBindingModule,
    AuthModule,
    UserModule,
    CirsModule,
    ScheduleModule,
    HealthCheckModule
  ],
  controllers: [AppController]
})
export class AppModule {}
