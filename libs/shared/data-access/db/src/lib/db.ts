/**
 * @fileoverview This module provides a NestJS database module connecting to MongoDB and
 * includes utility functions for managing database operations such as insertions,
 * collections management and version updates.
 * @module DatabaseModule
 *
 * @requires NPM:@nestjs/common
 * @requires NPM:check-types
 * @requires NPM:mongodb
 * @requires @jaqua/logger
 *
 * @copyright © 2020-2025 by J. Quader
 * @description Provides database services and utilities
 */
import { INestApplication, Inject, Module } from '@nestjs/common'
import { assert } from 'check-types'
import { Db, MongoClient, MongoClientOptions } from 'mongodb'

import { logger } from '@jaqua/logger'

/**
 * Represents a client configuration object containing a MongoClient instance.
 */
export type TClient = {
  client: MongoClient
}

/**
 * Asynchronously retrieves a MongoDB client instance based on current environment variables.
 * @returns {Promise<MongoClient>} A promise that resolves to a MongoClient instance.
 * @throws Will throw an error if the MongoClient cannot be instantiated.
 */
export const getMongoClient = async (): Promise<MongoClient> => {
  const isProduction = process.env['NODE_ENV'] === 'production'
  const database = process.env['DB_DATABASE']
  const user = process.env['DB_USER']
  const pwd = process.env['DB_PASSWORD']

  const host =
    process.env['DB_HOST'] ??
    (database && isProduction ? 'mongodb:27017' : '127.0.0.1:27017')

  const mongo =
    'mongodb://' +
    (isProduction && user && pwd ? user + ':' + pwd + '@' : '') +
    host

  const options: MongoClientOptions = {}

  try {
    const client = new MongoClient(mongo, options)
    return client
  } catch (error) {
    logger.error(error)
    throw error
  }
}

/**
 * Asynchronously establishes and returns a database connection.
 * @returns {Promise<Db | undefined>} A promise resolving to a MongoDB database instance or undefined.
 */
export const mongodb = async (): Promise<Db | undefined> => {
  const isTest = process.env['NODE_ENV'] === 'test'
  const database = process.env['DB_DATABASE']
  const db = isTest ? database + '-e2e' : database

  const client = await getMongoClient()

  try {
    return client.db(db)
  } catch (error) {
    logger.error(error)
    throw error
  }
}

/**
 * A module providing database connectivity using MongoDB within a NestJS application.
 */
@Module({
  providers: [
    {
      provide: 'DATABASE_CLIENT',
      useFactory: () => ({ client: null })
    },
    {
      provide: 'DATABASE_CONNECTION',
      inject: ['DATABASE_CLIENT'],
      useFactory: async (databaseClientProvider: TClient) => {
        databaseClientProvider.client = await getMongoClient()
        return await mongodb()
      }
    }
  ],
  exports: ['DATABASE_CONNECTION', 'DATABASE_CLIENT']
})
export class DatabaseModule {
  constructor(@Inject('DATABASE_CLIENT') private dbClient: TClient) {}

  /**
   * Called when the module is destroyed to close the MongoDB connection gracefully.
   * @returns {Promise<void>} A promise that completes when the client is closed.
   */
  async onModuleDestroy(): Promise<void> {
    try {
      const client: MongoClient = this.dbClient.client
      await client.close()
      logger.info('mongodb connection closed')
    } catch (error) {
      logger.error(error)
      throw error
    }
  }

  /**
   * Handles application shutdown signals to log shutdown events.
   * @param {string} signal The shutdown signal received.
   */
  onApplicationShutdown(signal: string) {
    if (signal) logger.info(signal + ' signal received') // e.g. "SIGINT"
  }
}

/**
 * Represents a collection within a MongoDB database.
 */
interface Collection {
  type: string
  number?: number
}

/**
 * Inserts generated data into the specified MongoDB collections through provided factories.
 * If data is of type 'files', the documents array is flattened.
 * @param {Collection[]} data Fixtures data array.
 * @param {Db} db Instance of MongoDB database.
 * @param {Object} factories Factories to build data.
 * @returns {Array|Object} Inserted documents (as array if multiple).
 */
export const insertData = async (
  data: Collection[],
  db: Db,
  factories: any
) => {
  const result: any[] = []
  const files: any[] = []

  for (let i = 0; i < data.length; i++) {
    const { type, number } = data[i] as Collection
    // Generate documents
    const d = factories[type].buildList(number || 1)
    // Flatten files
    const isFiles = type === 'fs.files'
    if (isFiles) {
      for (let i = 0; i < d.length; i++) {
        const element = d[i].files
        files.push(...element)
      }
    }
    const documents = isFiles ? files : d

    // Add documents to collection
    if (db) {
      await db.collection(type).insertMany(documents)
    }

    // ...and to result array, which gets finally returned by this function
    result.push(documents.length > 1 ? documents : documents[0])
  }
  return result.length > 1 ? result : result[0]
}

/**
 * Drops the given collections from a MongoDB database.
 * @param {string[]} collections Array of collection names to drop.
 * @param {Db} db Instance of MongoDB database.
 */
export const dropCollections = async (collections: Array<string>, db: Db) => {
  for (let index = 0; index < collections.length; index++) {
    const name = collections[index] as string
    const list = await db.listCollections({ name }).toArray()
    if (list.length !== 0) {
      const isDropped = await db.dropCollection(name)
      if (!isDropped) throw Error('Could not drop ' + name + ' collection')
    }
  }
  return null
}

/**
 * Adds fixture data to the database during development mode.
 * @param {INestApplication} app The NestJS application instance.
 * @param {any} data The fixtures data to be added.
 */
export const addFixtures = async (app: INestApplication, data: any) => {
  if (process.env['NODE_ENV'] === 'development') {
    const db = app.get('DATABASE_CONNECTION', { strict: false })
    for (const [collection, documents] of Object.entries(data)) {
      const count = await db.collection(collection).countDocuments()
      if (count === 0) {
        const { insertedCount } = (await db
          .collection(collection)
          .insertMany(documents)) || { insertedCount: 0 }
        logger.info(insertedCount + ' documents inserted in ' + collection)
      }
    }
  }
}

/**
 * Updates the version information in the config collection of the database.
 * @param {Db} db Instance of MongoDB database.
 * @param {string} field Configuration data field ('patch', 'minor', 'major').
 * @returns {Promise<boolean>} A promise that resolves to true upon successful update.
 * @throws Will throw an error if the update fails.
 */
export const updateVersion = async (db: Db, field: string) => {
  assert.in(field, ['patch', 'minor', 'major'])
  assert.not.undefined(db)

  try {
    const version = await db.collection('config').findOne({ name: 'version' })
    if (version)
      await db.collection('config').updateOne(
        { name: 'version' },
        {
          $set: {
            [field]: version[field] + 1,
            lastModified: new Date()
          }
        }
      )
    else
      await db.collection('config').insertOne({
        name: 'version',
        major: 1,
        minor: 0,
        patch: 0,
        lastModified: new Date()
      })

    return true
  } catch (error) {
    logger.error(error)
    throw error
  }
}
